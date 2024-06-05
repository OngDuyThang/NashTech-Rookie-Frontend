import { Space } from 'antd'
import { Container, Div, Image, Text } from 'components'
import { useEffect, useRef, useState, type FC } from 'react'
import styles from '../index.module.scss'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { CartItemEntity } from '__generated__/graphql'
import { round } from 'lodash'
import { useDebounce } from 'hooks'

interface CartItemProps {
    item: CartItemEntity;
    handleItemQuantity: (id: string, quantity: number) => void,
    handleRemoveItem: (id: string) => void,
    total: number,
    setTotal: (value: number) => void
}

const CartItem: FC<CartItemProps> = ({
    item,
    handleItemQuantity,
    handleRemoveItem,
    total,
    setTotal
}) => {
    const isFirstRender = useRef(true)
    const [quantity, setQuantity] = useState<number>(item?.quantity)
    const finalQuantity = useDebounce<number>(quantity)
    const price = item?.product?.discount ? round(item?.product.price - (item?.product.price * item?.product?.discount / 100), 2) : item?.product?.price

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        handleItemQuantity(
            item.id,
            finalQuantity
        )
    }, [finalQuantity])

    return (
        <Container flex align='center' className='px-4 py-8' style={{ borderBottom: '1px solid #ccc' }}>
            <Div className={styles.info}>
                <Div className={styles.image}>
                    <Image
                        src={item?.product?.image || ''}
                        alt='product image'
                    />
                </Div>
                <Space size={2} direction='vertical'>
                    <Text tag='span' fontSize='1.25rem' fontWeight={500}>{item?.product?.title}</Text>
                    <Text tag='span' fontSize='1rem'>{item?.product?.author}</Text>
                </Space>
            </Div>

            <Space size={2} direction='vertical' className={styles.price}>
                <Text tag='span' fontSize='1.25rem' fontWeight={500}>
                    {price}$
                </Text>
                <Text tag='span' fontSize='1rem' className={
                    item?.product?.discount ? styles.slash : styles.hide
                }>
                    {item?.product?.discount ? item?.product.price : null}$
                </Text>
            </Space>

            <Div className={styles.quantity}>
                <Space size={16} className={styles.btns}>
                    <FaMinus onClick={() => {
                        setQuantity(quantity > 1 ? quantity - 1 : 1)
                        setTotal(round(total - (price || 0), 2))
                    }} className='cursor-pointer' />
                    <Text tag='span' fontSize='1rem' fontWeight={500}>{quantity}</Text>
                    <FaPlus onClick={() => {
                        setQuantity(quantity + 1)
                        setTotal(round(total + (price || 0), 2))
                    }} className='cursor-pointer' />
                </Space>
                <Text textDecoration='underline' className='cursor-pointer'
                    onClick={() => handleRemoveItem(item.id)}>Remove</Text>
            </Div>

            <Text fontSize='1.25rem' fontWeight={500} className={styles.total}>
                {round(Number(price) * quantity, 2)}$
            </Text>
        </Container>
    )
}

export default CartItem
