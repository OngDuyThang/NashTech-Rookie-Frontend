import { Category, Container, Div, Select, Text, Option, Pagination } from 'components'
import { Product, Products, Title } from 'modules/Components'
import { useContext, useEffect, useState, type FC } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'
import { List, Space } from 'antd'
import { PAGINATION, PRODUCT_SORT } from 'utils/constant'
import { FaCaretDown } from "react-icons/fa";
import { useLazyQuery, useQuery } from '@apollo/client'
import { getCategories, getCategory } from 'graphql/category'
import { CategoryEntity } from '__generated__/graphql'
import { TCategoryTreeNode } from 'types/category'
import { cloneDeep, isEmpty } from 'lodash'
import { createCategoryTree } from 'utils/helper'
import { ToastContext, ToastInstance } from 'layout'
import { TQueryState } from 'types/query'

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
    const toast = useContext(ToastContext) as ToastInstance

    const { data: dataCategories } = useQuery(getCategories)
    const [getCat, { data: dataCategory, error }] = useLazyQuery(getCategory)

    const [categoryTree, setCategoryTree] = useState<TCategoryTreeNode[]>([])
    const [categoryId, setCategoryId] = useState<string>('')
    const [query, setQuery] = useState<TQueryState>({
        page: PAGINATION.DEFAULT_PAGE,
        limit: PAGINATION.DEFAULT_LIMIT,
        sort: PRODUCT_SORT.ON_SALE
    })

    useEffect(() => {
        if (!isEmpty(dataCategories)) {
            const categories = dataCategories?.categories as CategoryEntity[]
            const tree = createCategoryTree(categories)
            setCategoryTree(cloneDeep(tree))
        }
    }, [dataCategories])

    const handleGetCategory = (
        categoryId: string,
        newQuery: TQueryState = query
    ) => {
        setCategoryId(categoryId)
        setQuery(cloneDeep(newQuery))

        // getCat({
        //     variables: {
        //         id: categoryId,
        //         ...newQuery
        //     }
        // })
        // if (error) {
        //     toast.error({
        //         message: error.graphQLErrors[0]?.message
        //     })
        // }
        console.log(categoryId)
        console.log(newQuery)
    }

    const ProductCategory = (
        <Div className={clsx('flex flex-col gap-2', styles.category)}>
            <Text fontSize='1rem' fontWeight={500}>Category</Text>
            <Category
                treeData={categoryTree}
                value={categoryId}
                placeholder='Enter category'
                onChange={(value) => handleGetCategory(value)}
                className='w-full'
            />
        </Div>
    )

    const Author = (
        <Div className={clsx('flex flex-col gap-2', styles.category)}>
            <Text fontSize='1rem' fontWeight={500}>Author</Text>
            <Category
                treeData={[]}
                value
                placeholder='Enter category'
                onChange={() => {}}
                className='w-full'
            />
        </Div>
    )

    const Rating = (
        <Div className={clsx('flex flex-col gap-2', styles.category)}>
            <Text fontSize='1rem' fontWeight={500}>Rating</Text>
            <List
                dataSource={stars}
                renderItem={(item) => (
                    <List.Item>
                        <Text fontSize='1rem' fontWeight={500} className='cursor-pointer'>
                            {item.title}
                        </Text>
                    </List.Item>
                )}
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
                    Showing 1-12 of 126 books
                </Text>
                <Space size={16}>
                    <Select
                        defaultValue={PRODUCT_SORT.ON_SALE}
                        value={query.sort}
                        onChange={(value) => handleGetCategory(categoryId, { ...query, sort: value })}
                        suffixIcon={<FaCaretDown />}
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
                        onChange={(value) => handleGetCategory(categoryId, { ...query, limit: value })}
                        suffixIcon={<FaCaretDown />}
                        className='mt-[-16px]'
                    >
                        <Option value={10}>Show 10</Option>
                        <Option value={20}>Show 20</Option>
                        <Option value={30}>Show 30</Option>
                    </Select>
                </Space>
            </Container>
            <Products
                products={(dataCategory?.category as CategoryEntity)?.products?.data}
                className={styles.products}
            />
            <Pagination
                page={query.page}
                limit={query.limit}
                total={999}
                onChange={(page, limit) => handleGetCategory(categoryId, { ...query, page, limit })}
                className='w-full flex justify-center'
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
