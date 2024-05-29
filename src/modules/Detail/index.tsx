import { Button, Container, Div, Form, Image, Input, Option, Pagination, Select, Text, TextArea } from 'components'
import { Title } from 'modules/Components'
import { useState, type FC } from 'react'
import styles from './index.module.scss'
import { Space } from 'antd'
import { REVIEW_SORT, STAR } from 'utils/constant'
import { FaPlus, FaMinus } from "react-icons/fa";
import { Item } from 'components/Form'

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

const Review = (
    <Container flex direct='column' justify='center' gap={8} className={styles.review}>
        <Space size={8}>
            <Text tag='span' fontSize='1rem' fontWeight={500}>Review Title</Text>
            <Text tag='span'>|</Text>
            <Text tag='span'>5 star</Text>
        </Space>
        <Text tag='p'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text tag='span'>April 12, 2021</Text>
    </Container>
)

const Detail: FC = () => {
    const [star, setStar] = useState<STAR>(STAR.FIVE)

    const ProductDetail = (
        <Container width='70' flex className={styles.detail}>
            <Container flex direct='column' align='end' gap={16} style={{
                minWidth: '250px',
                maxWidth: '250px'
            }}>
                <Div className={styles.image}>
                    <Image
                        src=''
                        alt=''
                    />
                </Div>
                <Text fontSize='0.75rem'>
                    By (author) <strong>Anna Banks</strong>
                </Text>
            </Container>
            <Container flex direct='column' align='start' gap={16} className='p-6'>
                <Text tag='span' fontSize='1.25rem' fontWeight={500}>
                    Book Title
                </Text>
                <Text tag='p'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
            </Container>
        </Container>
    )

    const Price = (
        <Container width='30' flex direct='column' className={styles.price}>
            <Div className={styles.amount}>
                <Text tag='span' fontSize='1.2rem' className={styles.slash}>20$</Text>
                <Text tag='span' fontSize='1.25rem' fontWeight={600}>
                    12.99$
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

    const Reviews = (
        <Container width='70' flex direct='column' justify='center' gap={24} className={styles.reviews}>
            <Container align='center'>
                <Space size={8}>
                    <Text tag='span' fontSize='1.25rem' fontWeight={500}>Customer Reviews</Text>
                    <Text tag='span'>(Filtered by 5 star)</Text>
                </Space>
                <Space size={16} className='float-right'>
                    <Select
                        defaultValue={REVIEW_SORT.DATE_DESC}
                        value={''}
                        onChange={() => {}}
                    >
                        <Option value={REVIEW_SORT.DATE_ASC}>Sort by date newest to oldest</Option>
                        <Option value={REVIEW_SORT.DATE_DESC}>Sort by price oldest to newest</Option>
                    </Select>
                    <Select
                        defaultValue={10}
                        value={''}
                        onChange={() => {}}
                    >
                        <Option value={5}>Show 5</Option>
                        <Option value={10}>Show 10</Option>
                        <Option value={20}>Show 20</Option>
                    </Select>
                </Space>
            </Container>

            <Container flex direct='column' gap={16}>
                <Text fontSize='1.5rem' fontWeight={500}>4.6 Star</Text>
                <Space size={32}>
                    <Text tag='span'>(3.134)</Text>
                    <Space size={8}>
                        <Text tag='span'>5 star (500)</Text>
                        <Text tag='span'>|</Text>
                        <Text tag='span'>4 star (400)</Text>
                        <Text tag='span'>|</Text>
                        <Text tag='span'>3 star (300)</Text>
                        <Text tag='span'>|</Text>
                        <Text tag='span'>2 star (200)</Text>
                        <Text tag='span'>|</Text>
                        <Text tag='span'>1 star (100)</Text>
                    </Space>
                </Space>
                <Text>Showing 1 - 12 of 3000 reviews</Text>
            </Container>

            <Container flex direct='column' gap={16}>
                {Review}
                {Review}
                {Review}
            </Container>

            <Pagination
                page={0}
                limit={0}
                total={999}
                onChange={() => {}}
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
                        value={star}
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
