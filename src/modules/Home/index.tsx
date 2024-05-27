import { Button, Carousel, Container, Div, Text } from 'components'
import { Product } from 'modules/Components'
import { type FC } from 'react'
import styles from './index.module.scss'
import { Space } from 'antd'

const Home: FC = () => {
    const featuredBooks = new Array(8).fill(0).map((book, index) => (
        <Div key={index} className={styles['product-wrapper']}>
            <Product />
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
            <Carousel>
                <Div>
                    <Product />
                </Div>
                <Div>
                    <Product />
                </Div>
                <Div>
                    <Product />
                </Div>
                <Div>
                    <Product />
                </Div>
            </Carousel>
        </Container>
    )

    const Featured = (
        <>
            <Container flex direct='column' justify='center' align='center' gap={16} className='py-8'>
                <Text fontSize='1.25rem'>
                    Featured Books
                </Text>
                <Space size={32}>
                    <Button>Recommend</Button>
                    <Button>Popular</Button>
                </Space>
            </Container>
            <Container flex wrap rowGap={32} className={styles.featured}>
                {featuredBooks}
            </Container>
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
