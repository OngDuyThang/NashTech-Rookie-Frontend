import { Button, Container, Div, Form, Image, Input, Option, Pagination, Select, Text, TextArea } from 'components'
import { Title } from 'modules/Components'
import { useContext, useEffect, useRef, useState, type FC } from 'react'
import styles from './index.module.scss'
import { Space } from 'antd'
import { PAGINATION, REVIEW_SORT, STAR } from 'utils/constant'
import { FaPlus, FaMinus } from "react-icons/fa";
import { Item } from 'components/Form'
import { useLazyQuery } from '@apollo/client'
import { GET_PRODUCT_BY_ID } from 'graphql/review'
import { ProductEntity, ReviewList } from '__generated__/graphql'
import { cloneDeep, round, sum } from 'lodash'
import moment from 'moment'
import { useRouterReviewQuery } from 'hooks'
import { ToastContext, ToastInstance } from 'layout'
import { TReviewQueryState } from 'types/query'

const stars = [
    {
        title: '1 star',
        value: 1,
    },
    {
        title: '2 stars',
        value: 2,
    },
    {
        title: '3 stars',
        value: 3,
    },
    {
        title: '4 stars',
        value: 4,
    },
    {
        title: '5 stars',
        value: 5,
    },
]

const Detail: FC = () => {
    const isFirstRender = useRef(true)
    const toast = useContext(ToastContext) as ToastInstance
    const [router, query] = useRouterReviewQuery()
    const [getProduct] = useLazyQuery(GET_PRODUCT_BY_ID)

    const [star, setStar] = useState<STAR>(STAR.FIVE)
    const [product, setProduct] = useState<ProductEntity>()
    const [reviews, setReviews] = useState<ReviewList>()

    useEffect(() => {
        if (isFirstRender.current) {
            router.push({
                pathname: router.pathname,
                query: {
                    ...router.query,
                    page: PAGINATION.DEFAULT_PAGE,
                    limit: PAGINATION.DEFAULT_LIMIT,
                    sort: REVIEW_SORT.DATE_DESC,
                    star: STAR.FIVE,
                },
            }, undefined, { shallow: true });
        }
    }, [])

    useEffect(() => {
        if (isFirstRender.current) {
            (async () => {
                const { data, error } = await getProduct({ variables: { id: router.query?.slug, ...query } })
                const product = data?.product as ProductEntity
                setProduct(cloneDeep(product))

                const reviews = product?.reviews as ReviewList
                setReviews(cloneDeep(reviews))
                if (error) toast.error({ message: error.graphQLErrors[0]?.message })

                isFirstRender.current = false
            })()
        }
    }, [router])

    const handleRouterQuery = async (
        newQuery: TReviewQueryState
    ) => {
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                ...newQuery,
            },
        }, undefined, { shallow: true });

        const { data, error } = await getProduct({ variables: { id: router.query?.slug, ...newQuery } })
        const product = data?.product as ProductEntity
        setProduct(cloneDeep(product))

        const reviews = product?.reviews as ReviewList
        setReviews(cloneDeep(reviews))
        if (error) toast.error({ message: error.graphQLErrors[0]?.message })
    }

    const ProductDetail = (
        <Container width='70' flex className={styles.detail}>
            <Container flex direct='column' align='end' gap={16} style={{
                minWidth: '250px',
                maxWidth: '250px'
            }}>
                <Div className={styles.image}>
                    <Image
                        src={product?.image || ''}
                        alt='product image'
                    />
                </Div>
                <Text fontSize='0.85rem'>
                    {product?.author ? 'By (author)' : null}{' '}
                    {product?.author ? <strong>{product?.author?.pen_name}</strong> : null}
                </Text>
            </Container>
            <Container flex direct='column' align='start' gap={16} className='p-6'>
                <Text tag='span' fontSize='1.25rem' fontWeight={500}>
                    {product?.title}
                </Text>
                <Text tag='p'>
                    {product?.description}
                </Text>
            </Container>
        </Container>
    )

    const Price = (
        <Container width='30' flex direct='column' className={styles.price}>
            <Div className={styles.amount}>
                <Text tag='span' fontSize='1.2rem' className={
                    product?.promotion ? styles.slash : styles.hide
                }>{product?.price}$</Text>
                <Text tag='span' fontSize='1.25rem' fontWeight={600}>
                    {product?.promotion?.discount_percent ? round(product?.price - (product?.price * product?.promotion?.discount_percent / 100), 2) : product?.price}$
                </Text>
            </Div>
            <Container flex direct='column' justify='center' align='center' gap={32} className='p-8'>
                <Div className={styles.quantity}>
                    <FaMinus />
                    <Text tag='span' fontSize='1rem' fontWeight={500}>1</Text>
                    <FaPlus />
                </Div>
                <Button
                    className='w-full flex justify-center items-center py-5'
                    fontSize='1rem'
                    fontWeight={500}
                >
                    Add to cart
                </Button>
            </Container>
        </Container>
    )

    const Top = (
        <Container flex gap={32} className={styles.top}>
            {ProductDetail}
            {Price}
        </Container>
    )

    const renderRatings = product?.ratings?.map((rating, index) => (
        <>
            <Text
                textDecoration='underline' tag='span' cursor='pointer'
                onClick={() => handleRouterQuery({ ...query, star: index + 1 })}
            >
                {index + 1} star ({rating})
            </Text>
            {index != 4 ? <Text tag='span'>|</Text> : null}
        </>
    ))

    const renderReviews = reviews?.data?.map((review, index) => (
        <Container key={index} flex direct='column' justify='center' gap={8} className={styles.review}>
            <Space size={8}>
                <Text tag='span' fontSize='1rem' fontWeight={500}>{review.title}</Text>
                <Text tag='span'>|</Text>
                <Text tag='span'>{review.rating} star</Text>
            </Space>
            <Text tag='p'>{review.description}</Text>
            <Text tag='span'>{moment(review.created_at).format('MMMM D, YYYY')}</Text>
        </Container>
    ))

    const Reviews = (
        <Container width='70' flex direct='column' justify='start' gap={24} className={styles.reviews}>
            <Container align='center'>
                <Space size={8}>
                    <Text tag='span' fontSize='1.25rem' fontWeight={500}>Customer Reviews</Text>
                    <Text tag='span'>(Filtered by {query.star} star)</Text>
                </Space>
                <Space size={16} className='float-right'>
                    <Select
                        defaultValue={REVIEW_SORT.DATE_DESC}
                        value={query.sort}
                        onChange={(sort) => handleRouterQuery({ ...query, sort })}
                    >
                        <Option value={REVIEW_SORT.DATE_ASC}>Sort by date newest to oldest</Option>
                        <Option value={REVIEW_SORT.DATE_DESC}>Sort by price oldest to newest</Option>
                    </Select>
                    <Select
                        defaultValue={10}
                        value={query.limit}
                        onChange={(limit) => handleRouterQuery({ ...query, limit })}
                    >
                        <Option value={5}>Show 5</Option>
                        <Option value={10}>Show 10</Option>
                        <Option value={20}>Show 20</Option>
                    </Select>
                </Space>
            </Container>

            <Container flex direct='column' gap={16}>
                <Text fontSize='1.5rem' fontWeight={500}>{product?.rating} Star</Text>
                <Space size={32}>
                    <Text textDecoration='underline' tag='span'>({sum(product?.ratings)})</Text>
                    <Space size={8}>
                        {renderRatings}
                    </Space>
                </Space>
                <Text>Showing {query.page + 1} - {(query.page + 1) * query.limit} of {reviews?.total} reviews</Text>
            </Container>

            <Container flex direct='column' gap={16}>
                {renderReviews}
            </Container>

            <Pagination
                page={query.page}
                limit={query.limit}
                total={reviews?.total || 0}
                onChange={(page, _limit) => handleRouterQuery({ ...query, page })}
                className='w-full flex justify-center'
            />
        </Container>
    )

    const renderStars = stars.map((star, index) => (
        <Option key={index} value={star.value}>{star.title}</Option>
    ))

    const WriteReview = (
        <Container width='30' flex direct='column' className={styles['write-review']}>
            <Div className={styles.head}>
                <Text tag='span' fontSize='1.25rem' fontWeight={600}>Write a Review</Text>
            </Div>
            <Form layout='vertical' className='p-8'>
                <Item
                    label='Add a title'
                    name='title'
                    rules={[{ required: true, message: 'Please add a title!' }]}
                    validateTrigger='onBlur'
                >
                    <Input placeholder='' />
                </Item>
                <Item
                    label='Details please! Your review helps other shoppers'
                    name='description'
                    rules={[{ required: true, message: 'Please input your review!' }]}
                    validateTrigger='onBlur'
                >
                    <TextArea placeholder='' autoSize={{ minRows: 6, maxRows: 6 }} />
                </Item>
                <Item
                    label='Select a rating star'
                    name='rating'
                    rules={[{ required: true, message: 'Please select a rating star!' }]}
                    validateTrigger='onBlur'
                >
                    <Select
                        defaultValue={STAR.FIVE}
                        value={''}
                        onChange={(value) => setStar(value)}
                        selectorBg='#fff'
                        className={styles.rating}
                    >
                        {renderStars}
                    </Select>
                </Item>
                <Item>
                    <Button
                        className='w-full flex justify-center items-center py-5'
                        fontSize='1rem'
                        fontWeight={500}
                        htmlType='submit'
                    >
                        Submit Review
                    </Button>
                </Item>
            </Form>
        </Container>
    )

    const Bottom = (
        <Container flex gap={32} className={styles.bottom}>
            {Reviews}
            {WriteReview}
        </Container>
    )

    return (
        <Container className={styles.root}>
            <Title>
                Category Name
            </Title>
            <Container flex direct='column' gap={32} className={styles.body}>
                {Top}
                {Bottom}
            </Container>
        </Container>
    )
}

export default Detail
