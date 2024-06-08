import { Container, Div, Image, Text } from 'components'
import { CSSProperties, useEffect, type FC } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'
import { ProductEntity } from '__generated__/graphql'
import { useRouter } from 'next/router'
import { floor, round } from 'lodash'
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { roundRating } from 'utils/helper'
import { FaRegStar } from "react-icons/fa";

interface ProductProps {
    product: ProductEntity
}

const Product: FC<ProductProps> = ({
    product
}) => {
    const router = useRouter()
    const {
        title,
        author,
        image,
        price,
        promotion,
    } = product

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
            <Div className='w-full px-4 pt-4' >
                <Text fontSize='1.25rem' fontWeight={500}>{title}</Text>
                <Text fontSize='0.85rem'>{author?.pen_name}</Text>
            </Div>
            <Div className={clsx('w-full p-4 flex gap-1', styles.stars)}>
                {new Array(
                    floor(roundRating(product?.rating || 0))
                ).fill(0)
                    .map((_, index) => <FaStar key={index} className={styles.star} />)}
                {roundRating(product?.rating || 0) % 1 !== 0 && <FaRegStarHalfStroke className={styles.star} />}
                {!product?.rating && new Array(5).fill(0).map((_, index) => <FaRegStar key={index} className={styles.star} />)}
            </Div>
            <Div className={clsx('w-full flex gap-2 p-4', styles.price)}>
                <Text className={
                    promotion?.discount_percent ?
                        styles.slash :
                        styles.hide
                }>{price}$</Text>
                <Text className={styles[promotion?.discount_percent ? 'org-discount' : 'org']}>
                    {promotion?.discount_percent ? round(product?.price - (product?.price * promotion?.discount_percent / 100), 2) : product?.price}$
                </Text>
            </Div>
        </Container>
    )
}

export default Product
