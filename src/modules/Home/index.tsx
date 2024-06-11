import { Button, Carousel, Container, Div, Image, Spin, Text } from 'components'
import { Product, Products } from 'modules/Components'
import { useEffect, useState, type FC } from 'react'
import styles from './index.module.scss'
import { Space } from 'antd'
import { useQuery } from '@apollo/client'
import { GET_POPULAR_PRODUCTS, GET_PROMOTION_PRODUCTS, GET_RECOMMEND_PRODUCTS } from 'graphql/product'
import { ProductEntity, PromotionEntity } from '__generated__/graphql'
import Slider, { Settings } from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GET_ALL_PROMOTIONS } from 'graphql/promotion/query'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'

const Loading = (
    <Div className='w-full h-32 flex justify-center items-center'>
        <Spin size='large' />
    </Div>
)

const Home: FC = () => {
    const { data: dataPromotion } = useQuery(GET_PROMOTION_PRODUCTS)
    const { data: dataRecommend } = useQuery(GET_RECOMMEND_PRODUCTS)
    const { data: dataPopular } = useQuery(GET_POPULAR_PRODUCTS)
    const { data: dataPromotions } = useQuery(GET_ALL_PROMOTIONS)
    const [data, setData] = useState<ProductEntity[]>([])
    const [btn, setBtn] = useState<'left' | 'right'>('left')
    const router = useRouter()

    useEffect(() => {
        setData(dataRecommend?.recommendProducts)
    }, [dataRecommend])

    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 3000,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    }

    const PromotionAds = !isEmpty(dataPromotions?.promotions) ? (
        <Container className={styles['promotion-ads-container']}>
            <Slider {...settings} className={styles.slider}>
                {(dataPromotions?.promotions as PromotionEntity[])?.map((promotion, index) => (
                    <Container key={index} color="#fff" className={styles['promotion-ads']}>
                        <Image
                            src={promotion?.image || ''}
                            alt='promotion image'
                            fit='cover'
                        />
                        <Container className={styles.info}>
                            <Text tag="p" className={styles.name} >{promotion.name}</Text>
                            <Text tag="p" className={styles.description} >{promotion.description}</Text>
                        </Container>
                    </Container>
                ))}
            </Slider>
        </Container>
    ) : null

    const renderPromotions = (dataPromotion?.promotionProducts as ProductEntity[])?.map((product, index) => (
        <Div key={index}>
            <Product {...{ product }} />
        </Div>
    ))

    const Head = (
        <Container flex justify='between' align='center' className={styles.head}>
            <Text fontSize='1.75rem' fontWeight={500}>
                On Sale
            </Text>
            <Button onClick={() => {
                router.push({
                    pathname: '/shop'
                })
            }}>
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
                <Text fontSize='1.75rem' fontWeight={500}>
                    Featured Books
                </Text>
                <Space size={32}>
                    <Button
                        fontSize='1rem'
                        onClick={() => {
                            setData(dataRecommend?.recommendProducts)
                            setBtn('left')
                        }}
                        bgColor={btn === 'left' ? '#6d6d6d' : undefined}
                    >
                        Recommend
                    </Button>
                    <Button
                        fontSize='1rem'
                        onClick={() => {
                            setData(dataPopular?.popularProducts)
                            setBtn('right')
                        }}
                        bgColor={btn === 'right' ? '#6d6d6d' : undefined}
                    >
                        Popular
                    </Button>
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
            {PromotionAds}
            {Head}
            {Promotions}
            {Featured}
        </Container>
    )
}

export default Home
