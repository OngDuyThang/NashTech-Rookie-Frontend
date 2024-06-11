import { Category, Container, Div, Select, Text, Option, Pagination, Menu } from 'components'
import { Products, Title } from 'modules/Components'
import { useContext, useEffect, useRef, useState, type FC } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'
import { List, Space } from 'antd'
import { PAGINATION, PRODUCT_SORT, STAR } from 'utils/constant'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_CATEGORIES } from 'graphql/category'
import { AuthorEntity, CategoryEntity, ProductList } from '__generated__/graphql'
import { TCategoryTreeNode } from 'types/category'
import { cloneDeep, isEmpty, map } from 'lodash'
import { ToastContext, ToastInstance } from 'layout'
import { TProductQueryState } from 'types/query'
import { useRouterProductQuery } from 'hooks'
import { GET_AUTHORS } from 'graphql/author'
import { GET_PRODUCT_LIST } from 'graphql/product'
import { Label, createCategoryTree } from './tree'
import { FaStar } from "react-icons/fa";

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

    const [getCategories] = useLazyQuery(GET_CATEGORIES)
    const { data: dataAuthors } = useQuery(GET_AUTHORS)
    const [getProducts] = useLazyQuery(GET_PRODUCT_LIST)

    const [categoryTree, setCategoryTree] = useState<TCategoryTreeNode[]>([])
    const [products, setProducts] = useState<ProductList>()
    const [router, query] = useRouterProductQuery()

    useEffect(() => {
        if (isFirstRender.current) {
            router.push({
                pathname: router.pathname,
                query: {
                    page: PAGINATION.DEFAULT_PAGE,
                    limit: PAGINATION.DEFAULT_LIMIT,
                    sort: PRODUCT_SORT.ALL,
                    categoryIds: [],
                    authorIds: [],
                    ratings: []
                },
            }, undefined, { shallow: true });
        }
    }, [])

    useEffect(() => {
        if (isFirstRender.current) {
            (async () => {
                const { data: dataCategories, error: errorCategories } = await getCategories()

                const categories = dataCategories?.categories as CategoryEntity[]
                const tree = cloneDeep(createCategoryTree(categories))
                setCategoryTree(tree)

                const { data: dataProducts, error: errorProducts } = await getProducts({
                    variables: { ...query },
                    fetchPolicy: 'network-only'
                })
                const products = dataProducts?.products as ProductList
                setProducts(products)

                const error = errorCategories || errorProducts
                if (error) toast.error({ message: error?.graphQLErrors[0]?.message })

                isFirstRender.current = false
            })()
        }
    }, [router])

    const handleRouterQuery = async (
        newQuery: TProductQueryState
    ) => {
        router.push({
            pathname: router.pathname,
            query: cloneDeep(newQuery),
        }, undefined, { shallow: true });

        const { data: dataProducts, error: errorProducts } = await getProducts({
            variables: { ...newQuery, ratings: map(newQuery.ratings, Number) }
        })
        const products = dataProducts?.products as ProductList
        setProducts(products)
        if (errorProducts) toast.error({ message: errorProducts?.graphQLErrors[0]?.message })
    }

    const Category = (
        <Div className={clsx('flex flex-col gap-2', styles.category)}>
            <Text fontSize='1.2rem' fontWeight={500}>Category</Text>
            <Menu
                items={categoryTree}
                setSelectedIds={(categoryIds) => { handleRouterQuery({ ...query, categoryIds }) }}
            />
        </Div>
    )

    const Author = (
        <Div className={clsx('flex flex-col gap-2 max-h-[400px] overflow-auto', styles.category)}>
            <Text fontSize='1.2rem' fontWeight={500}>Author</Text>
            <Menu
                items={
                    (dataAuthors?.authors as AuthorEntity[])
                        ?.map(author => ({ key: author.id, label: <Label title={author.pen_name} value={author.id} /> }))
                }
                setSelectedIds={(authorIds) => { handleRouterQuery({ ...query, authorIds }) }}
            />
        </Div>
    )

    const Rating = (
        <Div className={clsx('flex flex-col gap-2', styles.category)}>
            <Text fontSize='1.2rem' fontWeight={500}>Rating</Text>
            <Menu
                items={stars.map(star => ({ key: star.value, label: <div className='flex gap-1 text-yellow-500'>{new Array(star.value).fill(0).map(() => <FaStar />)}</div> }))}
                setSelectedIds={(keys) => { handleRouterQuery({ ...query, ratings: keys }) }}
            />
        </Div>
    )

    const Left = (
        <Container width='20' flex direct='column' gap={16}>
            <Text fontSize='1.25rem' fontWeight={500}>
                Filter By
            </Text>
            {Category}
            {Author}
            {Rating}
        </Container>
    )

    const Right = (
        <Container width='80' flex direct='column' justify='start' gap={16}>
            <Container flex justify='between' wrap rowGap={16} className='pl-4'>
                <Text tag='span' fontSize='1.25rem' fontWeight={500}>
                    Showing {Math.min(query.page + 1, products?.data?.length || 0)} - {Number(products?.data?.length) < 10 ? products?.data.length : (query.page + 1) * query.limit} of {products?.total} books
                </Text>
                <Space size={16}>
                    <Select
                        defaultValue={PRODUCT_SORT.ALL}
                        value={query.sort}
                        onChange={(sort) => handleRouterQuery({ ...query, sort })}
                        className='mt-[-16px]'
                    >
                        <Option value={PRODUCT_SORT.ALL}>All Books</Option>
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
