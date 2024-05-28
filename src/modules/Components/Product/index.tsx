import { Container, Div, Image, Text } from 'components'
import { type FC } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'
import { ProductEntity } from '__generated__/graphql'

interface ProductProps {
    product: ProductEntity
}

const Product: FC<ProductProps> = ({
    product
}) => {
    const {
        title,
        author,
        image,
        price,
        promotion,
    } = product

    return (
        <Container flex direct='column' justify='center' align='start' className={styles.root}>
            <Div className={styles.image}>
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
                    {price * (promotion?.discount_percent ? promotion.discount_percent / 100 : 1)}$
                </Text>
            </Div>
        </Container>
    )
}

export default Product
