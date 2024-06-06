import { Button, Carousel, Container, Div, Spin, Text } from 'components'
import { Product, Products } from 'modules/Components'
import { useEffect, useState, type FC } from 'react'
import styles from './index.module.scss'
import { Space } from 'antd'
import { useQuery } from '@apollo/client'
import { GET_POPULAR_PRODUCTS, GET_PROMOTION_PRODUCTS, GET_RECOMMEND_PRODUCTS } from 'graphql/product'
import { ProductEntity } from '__generated__/graphql'

const Loading = (
    <Div className='w-full h-32 flex justify-center items-center'>
        <Spin size='large' />
    </Div>
)

const Home: FC = () => {
    const { data: dataPromotion } = useQuery(GET_PROMOTION_PRODUCTS)
    const { data: dataRecommend } = useQuery(GET_RECOMMEND_PRODUCTS)
    const { data: dataPopular } = useQuery(GET_POPULAR_PRODUCTS)
    const [data, setData] = useState<ProductEntity[]>([])

    useEffect(() => {
        setData(dataRecommend?.recommendProducts)
    }, [dataRecommend])

    const renderPromotions = (dataPromotion?.promotionProducts as ProductEntity[])?.map((product, index) => (
        <Div key={index}>
            <Product {...{ product }} />
        </Div>
    ))

    const Head = (
        <Container flex justify='between' align='center' className={styles.head}>
            <Text fontSize='1.25rem'>
                On Sale
            </Text>
            <Button>
                View All
            </Button>
        </Container>
    )

    const Promotions = (
        <Container className={styles['carousel-container']}>
            {dataPromotion ? (
                <Carousel>
                    {renderPromotions}
                </Carousel>
            ) : Loading}
        </Container>
    )

    const Featured = (
        <>
            <Container flex direct='column' justify='center' align='center' gap={16} className='py-8'>
                <Text fontSize='1.25rem'>
                    Featured Books
                </Text>
                <Space size={32}>
                    <Button onClick={() => setData(dataRecommend?.recommendProducts)}>Recommend</Button>
                    <Button onClick={() => setData(dataPopular?.popularProducts)}>Popular</Button>
                </Space>
            </Container>
            <Products
                className={styles.featured}
                products={data}
            />
        </>
    )

    return (
        <Container className={styles.root}>
            {Head}
            {Promotions}
            {Featured}
        </Container>
    )
}

export default Home
