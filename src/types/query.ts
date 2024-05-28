import { PAGINATION, PRODUCT_SORT } from "utils/constant"

export type TQueryState = {
    page: PAGINATION,
    limit: PAGINATION,
    sort: PRODUCT_SORT
}