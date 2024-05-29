import { PAGINATION, PRODUCT_SORT, REVIEW_SORT, STAR } from "utils/constant"

export type TProductQueryState = {
    page: PAGINATION,
    limit: PAGINATION,
    sort: PRODUCT_SORT
}

export type TReviewQueryState = {
    page: PAGINATION,
    limit: PAGINATION,
    sort: REVIEW_SORT,
    star: STAR
}