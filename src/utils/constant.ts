export const API_METHOD = process.env.NEXT_PUBLIC_API_METHOD
export const API_HOST = process.env.NEXT_PUBLIC_API_HOST
export const API_AUTH_PORT = process.env.NEXT_PUBLIC_API_AUTH_PORT
export const API_PRODUCT_PORT = process.env.NEXT_PUBLIC_API_PRODUCT_PORT
export const API_CART_PORT = process.env.NEXT_PUBLIC_API_CART_PORT
export const API_ORDER_PORT = process.env.NEXT_PUBLIC_API_ORDER_PORT
export const API_UPLOAD_PORT = process.env.NEXT_PUBLIC_API_UPLOAD_PORT
export const API_ASSET_PORT = process.env.NEXT_PUBLIC_API_ASSET_PORT

export const MAX_LIMIT_NUMBER = 10000

export enum COLOR {
    DARK_BLUE = '#1E293B',
    LIGHT_BLUE = '#def2f8',
    PRIMARY_BUTTON = '#1E293B',
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

export enum SERVICE {
    PRODUCT = 'PRODUCT',
    CART = 'CART',
    ORDER = 'ORDER'
}

export enum PAYMENT_METHOD {
    COD = 'COD',
    STRIPE = 'STRIPE'
}

export enum PAYMENT_STATUS {
    PAID = 'PAID',
    UNPAID = 'UNPAID'
}