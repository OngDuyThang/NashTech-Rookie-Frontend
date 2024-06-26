import { Button, CheckoutForm, Container, Div, Form, Input, LoadingScreen, Modal, Option, Select, Text, TextArea } from 'components'
import { Title } from 'modules/Components'
import { useContext, useEffect, useRef, useState, type FC } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GET_USER_CART, REMOVE_CART_ITEM, UPDATE_CART_ITEM } from 'graphql/cart'
import { ToastContext, ToastInstance } from 'layout'
import { CartEntity, CartItemEntity } from '__generated__/graphql'
import CartItem from './Item'
import { API_HOST, API_ORDER_PORT, PAYMENT_METHOD, SERVICE } from 'utils/constant'
import { cloneDeep, filter, isEmpty, round, set } from 'lodash'
import { PLACE_ORDER } from 'graphql/order'
import { Item, useForm } from 'components/Form'
import { getAccessToken, getUrlEndpoint, isSession } from 'utils/helper'
import { setUserCartCount } from 'store/cart/slice'
import { useAppDispatch, useAppSelector } from 'hooks'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { Radio } from 'antd'
import { useRouter } from 'next/router'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string, { locale: 'en' });

const Cart: FC = () => {
    const [clientSecret, setClientSecret] = useState<string>('');
    const [orderId, setOrderId] = useState<string>('')
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { count } = useAppSelector(state => state.cart)
    const isFirstRender = useRef(true)
    const toast = useContext(ToastContext) as ToastInstance

    const [items, setItems] = useState<CartItemEntity[]>()
    const [open, setOpen] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)
    const [form] = useForm()

    const [getUserCart] = useLazyQuery(GET_USER_CART)
    const [updateCartItem] = useMutation(UPDATE_CART_ITEM)
    const [removeCartItem] = useMutation(REMOVE_CART_ITEM)
    const [placeOrder, { loading }] = useMutation(PLACE_ORDER)

    useEffect(() => {
        if (isFirstRender.current && isSession() && getAccessToken()) {
            (async () => {
                const { data, error } = await getUserCart({ context: { service: SERVICE.CART } })
                const items = (data?.cart as CartEntity)?.items as CartItemEntity[]

                if (error) {
                    toast.error({ message: error?.graphQLErrors[0]?.toString() })
                    return
                }
                setItems(cloneDeep(items))

                const total = items?.reduce((result, item) => {
                    const price = item?.product?.discount ? round(item?.product.price - (item?.product.price * item?.product?.discount / 100), 2) : item?.product?.price
                    const quantity = item.quantity
                    result += (price || 0) * quantity
                    return round(result, 2)
                }, 0)
                setTotal(total)
            })()
            isFirstRender.current = false
        }
    }, [])

    const handleItemQuantity = async (
        id: string,
        quantity: number
    ) => {
        try {
            await updateCartItem({
                variables: { id, quantity },
                context: { service: SERVICE.CART }
            })
            toast.success({ message: 'Update quantity successfully' })
        } catch (e) {
            toast.error({ message: String(e) })
        }
    }

    const handleRemoveItem = async (id: string) => {
        try {
            await removeCartItem({
                variables: { id },
                context: { service: SERVICE.CART }
            })
            toast.success({ message: 'Remove item successfully' })

            setItems(filter(items || [], item => item.id != id))
            setTotal(0)
            if (count) {
                dispatch(setUserCartCount(count - 1))
            }
        } catch (e) {
            toast.error({ message: String(e) })
        }
    }

    const handleFinish = async (value: any) => {
        if (!isSession()) {
            toast.error({ message: 'You must login first' })
            return
        }

        // const url = getUrlEndpoint(
        //     API_HOST,
        //     API_ORDER_PORT,
        //     '/api/orders/test'
        // )
        // fetch(url, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log(data?.data?.clientSecret)
        //         setClientSecret(data?.data?.clientSecret)
        //     });

        try {
            const { data } = await placeOrder({
                variables: { order: value },
                context: { service: SERVICE.ORDER }
            })

            const clientSecret = data?.placeOrder?.clientSecret as string
            const orderId = data?.placeOrder?.orderId as string
            if (!isEmpty(clientSecret) && !isEmpty(orderId)) {
                setOrderId(orderId)
                setClientSecret(clientSecret)
                return
            }

            setItems([])
            setTotal(0)
            setOpen(false)
            dispatch(setUserCartCount(0))
            form.resetFields()
            router.push({ pathname: '/order-complete' })
        } catch (e) {
            toast.error({ message: String(e) })
        }
    }

    const renderItems = items && items?.length ? items?.map((item, index) => (
        <CartItem
            key={index}
            item={item}
            handleItemQuantity={async (id, quantity) => await handleItemQuantity(id, quantity)}
            handleRemoveItem={async id => await handleRemoveItem(id)}
            total={total}
            setTotal={newTotal => setTotal(newTotal)}
        />
    )) : <Text fontSize='1.5rem' className='w-full flex justify-center items-center h-[50%]'>Your cart is empty</Text>

    const Left = (
        <Container width='70' flex direct='column' className={styles.left}>
            <Div className={styles.head}>
                <Text tag='span' className={clsx(styles['title-product'], styles.large)}>Product</Text>
                <Text tag='span' className={styles['title-price']}>Price</Text>
                <Text tag='span' className={styles['title-quantity']}>Quantity</Text>
                <Text tag='span' className={styles['title-total']}>Total</Text>
            </Div>
            {renderItems}
        </Container>
    )

    const Right = (
        <Container width='30' flex direct='column' className={styles.right}>
            <Div className={styles.head}>
                <Text fontSize='1rem' fontWeight={500}>Cart Totals</Text>
            </Div>
            <Container direct='column' className='p-4'>
                <Text fontSize='1.25rem' fontWeight={500} className='w-full text-center'>{total}$</Text>
                <Button fontSize='1rem' fontWeight={500} className='w-full py-4 mt-4 flex justify-center'
                    onClick={() => {
                        if (!isSession()) {
                            toast.error({ message: 'You must login first' })
                            return
                        }
                        if (!items?.length) {
                            toast.error({ message: 'Your cart is empty' })
                            return
                        }
                        setOpen(true)
                    }}>Place Order</Button>
            </Container>
        </Container>
    )

    const OrderForm = (
        <Form
            layout='vertical' className='p-8'
            form={form}
            onFinish={handleFinish}
            autoComplete="off"
        >
            <Item
                label='Name'
                name='name'
                rules={[{ required: true, message: 'Please add your name!' }]}
                validateTrigger='onBlur'
            >
                <Input placeholder='' />
            </Item>
            <Item
                label='Phone'
                name='phone'
                rules={[{ required: true, message: 'Please input your phone!' }]}
                validateTrigger='onBlur'
            >
                <Input placeholder='' />
            </Item>
            <Item
                label='Email'
                name='email'
                rules={[{ required: true, message: 'Please input your email!' }]}
                validateTrigger='onBlur'
            >
                <Input placeholder='' />
            </Item>
            <Item
                label='Address'
                name='address'
                rules={[{ required: true, message: 'Please input your email!' }]}
                validateTrigger='onBlur'
            >
                <TextArea placeholder='' autoSize={{ minRows: 3, maxRows: 3 }} />
            </Item>
            <Item
                label='Payment Method'
                name='payment_method'
            >
                <Radio.Group defaultValue={PAYMENT_METHOD.COD}>
                    <Radio value={PAYMENT_METHOD.COD}>{PAYMENT_METHOD.COD}</Radio>
                    <Radio value={PAYMENT_METHOD.STRIPE}>{PAYMENT_METHOD.STRIPE}</Radio>
                </Radio.Group>
            </Item>
            <Item>
                <Button
                    className='w-full flex justify-center items-center py-5'
                    fontSize='1rem'
                    fontWeight={500}
                    htmlType='submit'
                >
                    Place Order
                </Button>
            </Item>
        </Form>
    )

    if (loading) return <LoadingScreen />

    return (
        <Container flex direct='column' className={styles.root}>
            <Title>
                Your cart: {items?.length || 0} items
            </Title>
            <Container flex gap={32} className={styles.body}>
                {Left}
                {Right}
            </Container>
            <Modal
                title={<Text fontSize='1.15rem' fontWeight={500}>Place Order</Text>}
                open={open}
                onCancel={() => {
                    setOpen(false)
                    setOrderId('')
                    setClientSecret('')
                }}
            >
                {clientSecret && orderId ? (
                    <Elements options={{
                        clientSecret,
                        appearance: {
                            theme: 'flat'
                        }
                    }} stripe={stripePromise}>
                        <CheckoutForm orderId={orderId} />
                    </Elements>
                ) : OrderForm}
            </Modal>
        </Container>
    )
}

export default Cart
