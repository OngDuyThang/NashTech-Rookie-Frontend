import { Category, Container, Div, Select, Text, Option, Pagination } from 'components'
import { Products, Title } from 'modules/Components'
import { useContext, useEffect, useRef, useState, type FC } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'
import { List, Space } from 'antd'
import { PRODUCT_SORT, STAR } from 'utils/constant'
import { FaCaretDown } from "react-icons/fa";
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_CATEGORIES, GET_CATEGORY } from 'graphql/category'
import { AuthorEntity, CategoryEntity, ProductList } from '__generated__/graphql'
import { TCategoryTreeNode } from 'types/category'
import { cloneDeep, isEmpty } from 'lodash'
import { createCategoryTree } from 'utils/helper'
import { ToastContext, ToastInstance } from 'layout'
import { TQueryState } from 'types/query'
import { useRouterQuery } from 'hooks'
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

    const { data: dataCategories } = useQuery(GET_CATEGORIES)
    const { data: dataAuthors } = useQuery(GET_AUTHORS)
    const [getCat, { error: errorCat }] = useLazyQuery(GET_CATEGORY)
    const [getAuthor, { error: errorAuthor }] = useLazyQuery(GET_AUTHOR)
    const [getByRate, { error: errorRate }] = useLazyQuery(GET_PRODUCTS_BY_RATING)

    const [categoryTree, setCategoryTree] = useState<TCategoryTreeNode[]>([])
    const [categoryId, setCategoryId] = useState<string>('')
    const [authorId, setAuthorId] = useState<string>('')
    const [star, setStar] = useState<number>(0)
    const [products, setProducts] = useState<ProductList>()
    const [router, query] = useRouterQuery()

    useEffect(() => {
        if (!isEmpty(dataCategories) && isFirstRender.current) {
            const categories = dataCategories?.categories as CategoryEntity[]
            const tree = cloneDeep(createCategoryTree(categories))
            setCategoryTree(tree)

            const categoryId = tree[0]?.value
            setCategoryId(categoryId)
            getCat({ variables: { id: categoryId, ...query } }).then(data => {
                const products = (data?.data?.category as CategoryEntity)?.products
                setProducts(products as ProductList)
            })
            if (errorCat) toast.error({ message: errorCat.graphQLErrors[0]?.message })

            isFirstRender.current = false
        }
    }, [dataCategories])

    const handleRouterQuery = (
        newQuery: TQueryState
    ) => {
        router.push({
            pathname: router.pathname,
            query: newQuery,
        }, undefined, { shallow: true });

        switch (true) {
            case !!categoryId:
                console.log(categoryId)
                getCat({ variables: { id: categoryId, ...newQuery } }).then(data => {
                    const products = (data?.data?.category as CategoryEntity)?.products
                    setProducts(products as ProductList)
                });
                break;
            case !!authorId:
                getAuthor({ variables: { id: authorId, ...newQuery } }).then(data => {
                    const products = (data?.data?.author as AuthorEntity)?.products
                    setProducts(products as ProductList)
                });
                break;
            case !!star:
                console.log(star)
                getByRate({ variables: { rating: star, ...query } }).then(data => {
                    const products = (data?.data?.productsByRating as ProductList)
                    setProducts(products)
                });
                break;
        }

        const error = errorCat || errorAuthor || errorRate
        if (error) toast.error({ message: error.graphQLErrors[0]?.message })
    }

    const handleCategory = (id: string) => {
        getCat({ variables: { id, ...query } }).then(data => {
            const products = (data?.data?.category as CategoryEntity)?.products
            setProducts(products as ProductList)
        })
        setCategoryId(id)
        setAuthorId('')
        setStar(0)
        if (errorCat) toast.error({ message: errorCat.graphQLErrors[0]?.message })
    }

    const handleAuthor = (id: string) => {
        getAuthor({ variables: { id, ...query } }).then(data => {
            const products = (data?.data?.author as AuthorEntity)?.products
            setProducts(products as ProductList)
        })
        setCategoryId('')
        setAuthorId(id)
        setStar(0)
        if (errorAuthor) toast.error({ message: errorAuthor.graphQLErrors[0]?.message })
    }

    const handleStar = (star: STAR) => {
        getByRate({ variables: { rating: star, ...query } }).then(data => {
            const products = (data?.data?.productsByRating as ProductList)
            setProducts(products)
        })
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
        <Container width='15' flex direct='column' gap={16}>
            <Text fontSize='1rem' fontWeight={500}>
                Filter By
            </Text>
            {ProductCategory}
            {Author}
            {Rating}
        </Container>
    )

    const Right = (
        <Container width='85' flex direct='column' justify='start' gap={16}>
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
