import { Category, Container, Div, Select, Text, Option, Pagination } from 'components'
import { Products, Title } from 'modules/Components'
import { useContext, useEffect, useRef, useState, type FC } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'
import { List, Space } from 'antd'
import { PAGINATION, PRODUCT_SORT, STAR } from 'utils/constant'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_CATEGORIES, GET_CATEGORY } from 'graphql/category'
import { AuthorEntity, CategoryEntity, ProductList } from '__generated__/graphql'
import { TCategoryTreeNode } from 'types/category'
import { cloneDeep, isEmpty } from 'lodash'
import { createCategoryTree } from 'utils/helper'
import { ToastContext, ToastInstance } from 'layout'
import { TProductQueryState } from 'types/query'
import { useRouterProductQuery } from 'hooks'
import { GET_AUTHOR, GET_AUTHORS } from 'graphql/author'
import { GET_PRODUCTS_BY_RATING } from 'graphql/product'

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

const Shop: FC = () => {
    const isFirstRender = useRef(true)
    const toast = useContext(ToastContext) as ToastInstance

    const [getCats] = useLazyQuery(GET_CATEGORIES)
    const { data: dataAuthors } = useQuery(GET_AUTHORS)
    const [getCat] = useLazyQuery(GET_CATEGORY)
    const [getAuthor] = useLazyQuery(GET_AUTHOR)
    const [getByRate] = useLazyQuery(GET_PRODUCTS_BY_RATING)

    const [categoryTree, setCategoryTree] = useState<TCategoryTreeNode[]>([])
    const [categoryId, setCategoryId] = useState<string>('')
    const [authorId, setAuthorId] = useState<string>('')
    const [star, setStar] = useState<number>(0)
    const [products, setProducts] = useState<ProductList>()
    const [router, query] = useRouterProductQuery()

    useEffect(() => {
        if (isFirstRender.current) {
            router.push({
                pathname: router.pathname,
                query: {
                    page: PAGINATION.DEFAULT_PAGE,
                    limit: PAGINATION.DEFAULT_LIMIT,
                    sort: PRODUCT_SORT.ON_SALE
                },
            }, undefined, { shallow: true });
        }
    }, [])

    useEffect(() => {
        if (isFirstRender.current) {
            (async () => {
                const { data: dataCats, error: errorCats } = await getCats()

                const categories = dataCats?.categories as CategoryEntity[]
                const tree = cloneDeep(createCategoryTree(categories))
                setCategoryTree(tree)

                setCategoryId(tree[0]?.value)
                const { data: dataCat, error: errorCat } = await getCat({ variables: { id: tree[0]?.value, ...query } })

                const products = (dataCat?.category as CategoryEntity)?.products
                setProducts(products as ProductList)

                const error = errorCats || errorCat
                if (error) toast.error({ message: error.graphQLErrors[0]?.message })

                isFirstRender.current = false
            })()
        }
    }, [router])

    const handleRouterQuery = async (
        newQuery: TProductQueryState
    ) => {
        router.push({
            pathname: router.pathname,
            query: newQuery,
        }, undefined, { shallow: true });

        switch (true) {
            case !!categoryId:
                const { data: dataCat, error: errorCat } = await getCat({ variables: { id: categoryId, ...newQuery } })
                setProducts((dataCat?.category as CategoryEntity)?.products as ProductList)
                if (errorCat) toast.error({ message: errorCat.graphQLErrors[0]?.message })
                break;
            case !!authorId:
                const { data: dataAuthor, error: errorAuthor } = await getAuthor({ variables: { id: authorId, ...newQuery } })
                setProducts((dataAuthor?.author as AuthorEntity)?.products as ProductList)
                if (errorAuthor) toast.error({ message: errorAuthor.graphQLErrors[0]?.message })
                break;
            case !!star:
                const { data: dataRate, error: errorRate } = await getByRate({ variables: { rating: star, ...newQuery } })
                setProducts(dataRate?.productsByRating as ProductList)
                if (errorRate) toast.error({ message: errorRate.graphQLErrors[0]?.message })
                break;
        }
    }

    const handleCategory = async (id: string) => {
        const { data: dataCat, error: errorCat } = await getCat({ variables: { id, ...query } })
        setProducts((dataCat?.category as CategoryEntity)?.products as ProductList)

        setCategoryId(id)
        setAuthorId('')
        setStar(0)
        if (errorCat) toast.error({ message: errorCat.graphQLErrors[0]?.message })
    }

    const handleAuthor = async (id: string) => {
        const { data: dataAuthor, error: errorAuthor } = await getAuthor({ variables: { id, ...query } })
        setProducts((dataAuthor?.author as AuthorEntity)?.products as ProductList)

        setCategoryId('')
        setAuthorId(id)
        setStar(0)
        if (errorAuthor) toast.error({ message: errorAuthor.graphQLErrors[0]?.message })
    }

    const handleStar = async (star: STAR) => {
        const { data: dataRate, error: errorRate } = await getByRate({ variables: { rating: star, ...query } })
        setProducts((dataRate?.productsByRating as ProductList))

        setCategoryId('')
        setAuthorId('')
        setStar(star)
        if (errorRate) toast.error({ message: errorRate.graphQLErrors[0]?.message })
    }

    const ProductCategory = (
        <Div className={clsx('flex flex-col gap-2', styles.category)}>
            <Text fontSize='1rem' fontWeight={500}>Category</Text>
            <Category
                treeData={categoryTree}
                value={categoryId}
                placeholder='Enter category'
                onChange={(value) => handleCategory(value)}
                className='w-full'
            />
        </Div>
    )

    const renderAuthors = (dataAuthors?.authors as AuthorEntity[])?.map((author, index) => (
        <Option key={index} value={author.id}>{author.pen_name}</Option>
    ))

    const Author = (
        <Div className={clsx('flex flex-col gap-2', styles.category)}>
            <Text fontSize='1rem' fontWeight={500}>Author</Text>
            <Select
                defaultValue={PRODUCT_SORT.ON_SALE}
                value={authorId}
                onChange={(value) => handleAuthor(value)}
                selectorBg='#fff'
                className={styles.author}
            >
                {renderAuthors}
            </Select>
        </Div>
    )

    const renderRatings = (item: { title: string, value: STAR }) => (
        <List.Item>
            <Text
                style={{ background: item.value == star ? '#f5f5f5' : '#fff' }}
                fontSize='1rem' fontWeight={500} className='w-full cursor-pointer'
                onClick={() => handleStar(item.value)}
            >
                {item.title}
            </Text>
        </List.Item>
    )

    const Rating = (
        <Div className={clsx('flex flex-col gap-2', styles.category)}>
            <Text fontSize='1rem' fontWeight={500}>Rating</Text>
            <List
                dataSource={stars}
                renderItem={(item) => renderRatings(item)}
            />
        </Div>
    )

    const Left = (
        <Container width='20' flex direct='column' gap={16}>
            <Text fontSize='1rem' fontWeight={500}>
                Filter By
            </Text>
            {ProductCategory}
            {Author}
            {Rating}
        </Container>
    )

    const Right = (
        <Container width='80' flex direct='column' justify='start' gap={16}>
            <Container flex justify='between' wrap rowGap={16} className='pl-4'>
                <Text tag='span' fontSize='1rem' fontWeight={500}>
                    Showing {query.page + 1} - {(query.page + 1) * query.limit} of {products?.total} books
                </Text>
                <Space size={16}>
                    <Select
                        defaultValue={PRODUCT_SORT.ON_SALE}
                        value={query.sort}
                        onChange={(sort) => handleRouterQuery({ ...query, sort })}
                        className='mt-[-16px]'
                    >
                        <Option value={PRODUCT_SORT.ON_SALE}>Sort by on sale</Option>
                        {/* <Option value={PRODUCT_SORT.POPULAR}>Sort by popularrity</Option> */}
                        <Option value={PRODUCT_SORT.PRICE_ASC}>Sort by price low to high</Option>
                        <Option value={PRODUCT_SORT.PRICE_DESC}>Sort by price high to low</Option>
                    </Select>
                    <Select
                        defaultValue={10}
                        value={query.limit}
                        onChange={(limit) => handleRouterQuery({ ...query, limit })}
                        className='mt-[-16px]'
                    >
                        <Option value={5}>Show 5</Option>
                        <Option value={10}>Show 10</Option>
                        <Option value={20}>Show 20</Option>
                    </Select>
                </Space>
            </Container>

            <Products
                products={products?.data}
                className={styles.products}
                size='small'
            />

            <Pagination
                page={query.page}
                limit={query.limit}
                total={products?.total || 0}
                onChange={(page, _limit) => handleRouterQuery({ ...query, page: page - 1 })}
                className='w-full flex justify-center absolute bottom-0 left-0 right-0 pb-4'
            />
        </Container>
    )

    return (
        <Container flex direct='column' className={styles.root}>
            <Title>
                Books
            </Title>
            <Container flex className={styles.body}>
                {Left}
                {Right}
            </Container>
        </Container>
    )
}

export default Shop
