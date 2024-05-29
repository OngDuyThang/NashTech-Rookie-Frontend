import { NextRouter, useRouter } from "next/router"
import { TQueryState } from "types/query"
import { PAGINATION, PRODUCT_SORT } from "utils/constant"

export const useRouterQuery = (): [NextRouter, TQueryState] => {
    const router = useRouter()

    const query = {
        page: Number(router.query?.page) || PAGINATION.DEFAULT_PAGE,
        limit: Number(router.query?.limit) || PAGINATION.DEFAULT_LIMIT,
        sort: router.query?.sort as PRODUCT_SORT || PRODUCT_SORT.ON_SALE
    }

    return [
        router,
        query
    ]
}