import { ProductEntity } from '__generated__/graphql'
import { type FC } from 'react'
import styles from './index.module.scss'
import { Container, Div, Spin } from 'components'
import Product from '../Product'
import clsx from 'clsx'

const Loading = (
    <Div className='w-full h-32 flex justify-center items-center'>
        <Spin size='large' />
    </Div>
)

interface ProductsProps {
    products: ProductEntity[] | null | undefined;
    className?: string;
    size?: 'default' | 'small'
}

const Products: FC<ProductsProps> = ({
    products,
    className,
    size = 'default'
}) => {
    const render = products?.map(product => (
        <Div className={styles['product-wrapper']}>
            <Product {...{ product }} />
        </Div>
    ))

    return (
        <Container flex wrap rowGap={32} className={clsx(
            styles.root,
            size == 'small' && styles.small,
            className
        )}>
            {products ? render : Loading}
        </Container>
    )
}

export default Products
