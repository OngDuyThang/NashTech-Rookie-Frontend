import { Container, Div, Image, Text } from 'components'
import { CSSProperties, useContext, useEffect, type FC } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'
import { CreateCartItemDto, ProductEntity } from '__generated__/graphql'
import { useRouter } from 'next/router'
import { floor, round } from 'lodash'
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { isSession, roundRating } from 'utils/helper'
import { FaRegStar } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { Space } from 'antd'
import { ToastContext, ToastInstance } from 'layout'
import { ADD_TO_USER_CART, GET_USER_CART_COUNT } from 'graphql/cart'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useAppDispatch } from 'hooks'
import { SERVICE } from 'utils/constant'
import { setUserCartCount } from 'store/cart/slice'

interface ProductProps {
    product: ProductEntity
}

const Product: FC<ProductProps> = ({
    product
}) => {
    const toast = useContext(ToastContext) as ToastInstance
    const dispatch = useAppDispatch()
    const router = useRouter()
    const {
        title,
        author,
        image,
        price,
        promotion,
    } = product
    const [addToCart] = useMutation(ADD_TO_USER_CART)
    const [getUserCartCount] = useLazyQuery(GET_USER_CART_COUNT)

    const handleAddToCart = async () => {
        if (!isSession()) {
            toast.error({ message: 'You must login first' })
            return
        }

        const createItemDto: CreateCartItemDto = {
            product_id: product?.id || '',
            quantity: 1
        }
        try {
            await addToCart({
                variables: {
                    item: createItemDto
                },
                context: {
                    service: SERVICE.CART
                }
            })
            toast.success({ message: 'Product added to cart successfully' })

            const { data } = await getUserCartCount({
                context: { service: SERVICE.CART },
                fetchPolicy: 'network-only'
            })
            if (data?.getUserCartCount) {
                dispatch(setUserCartCount(data?.getUserCartCount))
            }
        } catch (e) {
            toast.error({ message: String(e) })
        }
    }

    return (
        <Container flex direct='column' justify='center' align='start' className={styles.root}>
            <Div
                className={styles.image}
                onClick={() => {
                    router.push({
                        pathname: '/product/[slug]',
                        query: {
                            slug: product.id
                        }
                    })
                }}
            >
                <Image
                    src={image || ''}
                    alt='product image'
                    fit='cover'
                />
                <Text className={styles.discount}>-{promotion?.discount_percent}%</Text>
            </Div>
            <Div className='w-full px-4 pt-2' >
                <Text fontSize='1rem' fontWeight={500}>{title}</Text>
                <Text fontSize='0.85rem'>{author?.pen_name}</Text>
            </Div>
            <Div className={clsx('w-full px-4 py-2 flex gap-1', styles.stars)}>
                {new Array(
                    floor(roundRating(product?.rating || 0))
                ).fill(0)
                    .map((_, index) => <FaStar key={index} className={styles.star} />)}
                {roundRating(product?.rating || 0) % 1 !== 0 && <FaRegStarHalfStroke className={styles.star} />}
                {!product?.rating && new Array(5).fill(0).map((_, index) => <FaRegStar key={index} className={styles.star} />)}
            </Div>
            <Div className={clsx('w-full flex justify-between items-center px-4 py-2')}>
                <Space size={8}>
                    <Text className={
                        promotion?.discount_percent ?
                            styles.slash :
                            styles.hide
                    }>{price}$</Text>
                    <Text className={styles[promotion?.discount_percent ? 'org-discount' : 'org']}>
                        {promotion?.discount_percent ? round(product?.price - (product?.price * promotion?.discount_percent / 100), 2) : product?.price}$
                    </Text>
                </Space>
                <FaCartPlus className='w-6 h-6 cart-icon cursor-pointer'
                    onClick={handleAddToCart}
                />
            </Div>
        </Container>
    )
}

export default Product
