export const API_METHOD = process.env.NEXT_PUBLIC_API_METHOD
export const API_HOST = process.env.NEXT_PUBLIC_API_HOST

export const MAX_LIMIT_NUMBER = 10000

export enum COLOR {
    PASTEL_GREY = '#cfcfc4',
    PRIMARY_BUTTON = '#6C767E',
    BLACK_TEXT = '#515151'
}

export enum PRODUCT_SORT {
    ON_SALE = 'ON_SALE',
    POPULAR = 'POPULAR',
    PRICE_ASC = 'PRICE_ASC',
    PRICE_DESC = 'PRICE_DESC'
}

export enum PAGINATION {
    DEFAULT_PAGE = 0,
    DEFAULT_LIMIT = 10,
    MIN_LIMIT = 1,
    MAX_LIMIT = 20
}

export enum STAR {
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5
}

export enum REVIEW_SORT {
    DATE_ASC = 'DATE_ASC',
    DATE_DESC = 'DATE_DESC'
}