import { Container, Div, Image, Text } from 'components'
import { type FC } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'
import { ProductEntity } from '__generated__/graphql'
import { useRouter } from 'next/router'
import { round } from 'lodash'

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
                />
            </Div>
            <Div className='w-full p-4' >
                <Text fontSize='1.25rem' fontWeight={500}>{title}</Text>
                <Text fontSize='0.85rem'>{author?.pen_name}</Text>
            </Div>
            <Div className={clsx('w-full flex gap-2 p-4', styles.price)}>
                <Text className={
                    promotion?.discount_percent ?
                        styles.slash :
                        styles.hide
                }>{price}$</Text>
                <Text>
                    {promotion?.discount_percent ? round(product?.price - (product?.price * promotion?.discount_percent / 100), 2) : product?.price}$
                </Text>
            </Div>
        </Container>
    )
}

export default Product
