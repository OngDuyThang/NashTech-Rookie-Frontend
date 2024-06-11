import { NextRouter, useRouter } from "next/router"
import { TProductQueryState, TReviewQueryState } from "types/query"
import { PAGINATION, PRODUCT_SORT, REVIEW_SORT, STAR } from "utils/constant"

export const useRouterProductQuery = (): [NextRouter, TProductQueryState] => {
    const router = useRouter()

    const query = {
        page: Number(router.query?.page) || PAGINATION.DEFAULT_PAGE,
        limit: Number(router.query?.limit) || PAGINATION.DEFAULT_LIMIT,
        sort: router.query?.sort as PRODUCT_SORT || PRODUCT_SORT.ALL,
        categoryIds: router.query?.categoryIds as string[] || [],
        authorIds: router.query?.authorIds as string[] || [],
        ratings: router.query?.ratings as string[] || []
    }

    return [
        router,
        query
    ]
}

export const useRouterReviewQuery = (): [NextRouter, TReviewQueryState] => {
    const router = useRouter()

    const query = {
        page: Number(router.query?.page) || PAGINATION.DEFAULT_PAGE,
        limit: Number(router.query?.limit) || PAGINATION.DEFAULT_LIMIT,
        sort: router.query?.sort as REVIEW_SORT || REVIEW_SORT.DATE_DESC,
        star: Number(router.query?.star) as STAR || STAR.FIVE
    }

    return [
        router,
        query
    ]
}