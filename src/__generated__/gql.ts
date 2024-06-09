/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nquery Authors {\n    authors {\n        id\n        pen_name\n    }\n}\n": types.AuthorsDocument,
    "\nmutation CreateCartItem($item: CreateCartItemDto!) {\n    createCartItem(item: $item) {\n        cart_id\n        created_at\n        id\n        quantity\n        updated_at\n        product {\n            author\n            created_at\n            discount\n            id\n            image\n            price\n            title\n            updated_at\n        }\n    }\n}\n": types.CreateCartItemDocument,
    "\nmutation UpdateCartItem($id: String!, $quantity: Float!) {\n    updateCartItem(id: $id, quantity: $quantity)\n}\n": types.UpdateCartItemDocument,
    "\nmutation DeleteCartItem($id: String!) {\n    deleteCartItem(id: $id)\n}\n": types.DeleteCartItemDocument,
    "\nquery GetUserCartCount {\n    getUserCartCount\n}\n": types.GetUserCartCountDocument,
    "\nquery Cart {\n    cart {\n        created_at\n        id\n        updated_at\n        user_id\n        items {\n            cart_id\n            created_at\n            id\n            quantity\n            updated_at\n            product {\n                author\n                created_at\n                discount\n                id\n                image\n                price\n                title\n                updated_at\n            }\n        }\n    }\n}\n": types.CartDocument,
    "\nquery Categories {\n    categories {\n        id\n        name\n        parent_id\n        parent {\n            id\n            name\n            parent_id\n        }\n    }\n}\n": types.CategoriesDocument,
    "\nmutation CreateOrder($order: CreateOrderDto!) {\n    placeOrder(order: $order) {\n        clientSecret\n        orderId\n    }\n}\n": types.CreateOrderDocument,
    "\nmutation UpdatePaymentStatus($orderId: String!, $payment_status: String!) {\n    updatePaymentStatus(orderId: $orderId, payment_status: $payment_status)\n}\n": types.UpdatePaymentStatusDocument,
    "\nquery PromotionProducts {\n    promotionProducts {\n        author_id\n        category_id\n        description\n        id\n        image\n        price\n        promotion_id\n        rating\n        ratings\n        title\n        author {\n            id\n            pen_name\n        }\n        promotion {\n            description\n            discount_percent\n            id\n            name\n        }\n    }\n}\n": types.PromotionProductsDocument,
    "\nquery RecommendProducts {\n    recommendProducts {\n        author_id\n        category_id\n        description\n        id\n        image\n        price\n        promotion_id\n        rating\n        ratings\n        title\n        author {\n            id\n            pen_name\n        }\n        promotion {\n            description\n            discount_percent\n            id\n            name\n        }\n    }\n}\n": types.RecommendProductsDocument,
    "\nquery PopularProducts {\n    popularProducts {\n        author_id\n        category_id\n        created_at\n        description\n        id\n        image\n        price\n        promotion_id\n        rating\n        ratings\n        title\n        updated_at\n        author {\n            created_at\n            id\n            pen_name\n            updated_at\n        }\n        promotion {\n            created_at\n            description\n            discount_percent\n            id\n            name\n            updated_at\n        }\n    }\n}\n\n": types.PopularProductsDocument,
    "\n    query Products($categoryIds: [String!], $authorIds: [String!], $ratings: [Int!] ,$limit: Int, $page: Int, $sort: String) {\n    products(\n        categoryIds: $categoryIds\n        authorIds: $authorIds\n        ratings: $ratings\n        limit: $limit\n        page: $page\n        sort: $sort\n    ) {\n        limit\n        page\n        total\n        data {\n            author_id\n            category_id\n            created_at\n            description\n            id\n            image\n            price\n            promotion_id\n            rating\n            ratings\n            title\n            updated_at\n            author {\n                created_at\n                id\n                pen_name\n                updated_at\n            }\n            promotion {\n                created_at\n                description\n                discount_percent\n                id\n                name\n                updated_at\n            }\n        }\n    }\n}\n\n": types.ProductsDocument,
    "\nquery Promotions {\n    promotions {\n        created_at\n        description\n        discount_percent\n        id\n        name\n        updated_at\n    }\n}\n": types.PromotionsDocument,
    "\nquery FindOrderPromotion($total: Float!) {\n    findOrderPromotion(total: $total)\n}\n": types.FindOrderPromotionDocument,
    "\nmutation CreateReview($review: CreateReviewDto!) {\n    createReview(\n        review: $review\n    ) {\n        created_at\n        description\n        id\n        product_id\n        rating\n        title\n        updated_at\n        user_id\n    }\n}\n": types.CreateReviewDocument,
    "\nquery Product($id: String!, $limit: Int, $page: Int, $sort: String, $star: Int) {\n    product(id: $id) {\n        author_id\n        category_id\n        description\n        id\n        image\n        price\n        promotion_id\n        rating\n        ratings\n        title\n        category {\n            id\n            name\n        }\n        author {\n            id\n            pen_name\n        }\n        promotion {\n            description\n            discount_percent\n            id\n            name\n        }\n        reviews(star: $star, sort: $sort, page: $page, limit: $limit) {\n            limit\n            page\n            total\n            data {\n                created_at\n                description\n                id\n                product_id\n                rating\n                title\n                user_id\n            }\n        }\n    }\n}\n\n": types.ProductDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Authors {\n    authors {\n        id\n        pen_name\n    }\n}\n"): (typeof documents)["\nquery Authors {\n    authors {\n        id\n        pen_name\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateCartItem($item: CreateCartItemDto!) {\n    createCartItem(item: $item) {\n        cart_id\n        created_at\n        id\n        quantity\n        updated_at\n        product {\n            author\n            created_at\n            discount\n            id\n            image\n            price\n            title\n            updated_at\n        }\n    }\n}\n"): (typeof documents)["\nmutation CreateCartItem($item: CreateCartItemDto!) {\n    createCartItem(item: $item) {\n        cart_id\n        created_at\n        id\n        quantity\n        updated_at\n        product {\n            author\n            created_at\n            discount\n            id\n            image\n            price\n            title\n            updated_at\n        }\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateCartItem($id: String!, $quantity: Float!) {\n    updateCartItem(id: $id, quantity: $quantity)\n}\n"): (typeof documents)["\nmutation UpdateCartItem($id: String!, $quantity: Float!) {\n    updateCartItem(id: $id, quantity: $quantity)\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteCartItem($id: String!) {\n    deleteCartItem(id: $id)\n}\n"): (typeof documents)["\nmutation DeleteCartItem($id: String!) {\n    deleteCartItem(id: $id)\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetUserCartCount {\n    getUserCartCount\n}\n"): (typeof documents)["\nquery GetUserCartCount {\n    getUserCartCount\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Cart {\n    cart {\n        created_at\n        id\n        updated_at\n        user_id\n        items {\n            cart_id\n            created_at\n            id\n            quantity\n            updated_at\n            product {\n                author\n                created_at\n                discount\n                id\n                image\n                price\n                title\n                updated_at\n            }\n        }\n    }\n}\n"): (typeof documents)["\nquery Cart {\n    cart {\n        created_at\n        id\n        updated_at\n        user_id\n        items {\n            cart_id\n            created_at\n            id\n            quantity\n            updated_at\n            product {\n                author\n                created_at\n                discount\n                id\n                image\n                price\n                title\n                updated_at\n            }\n        }\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Categories {\n    categories {\n        id\n        name\n        parent_id\n        parent {\n            id\n            name\n            parent_id\n        }\n    }\n}\n"): (typeof documents)["\nquery Categories {\n    categories {\n        id\n        name\n        parent_id\n        parent {\n            id\n            name\n            parent_id\n        }\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateOrder($order: CreateOrderDto!) {\n    placeOrder(order: $order) {\n        clientSecret\n        orderId\n    }\n}\n"): (typeof documents)["\nmutation CreateOrder($order: CreateOrderDto!) {\n    placeOrder(order: $order) {\n        clientSecret\n        orderId\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdatePaymentStatus($orderId: String!, $payment_status: String!) {\n    updatePaymentStatus(orderId: $orderId, payment_status: $payment_status)\n}\n"): (typeof documents)["\nmutation UpdatePaymentStatus($orderId: String!, $payment_status: String!) {\n    updatePaymentStatus(orderId: $orderId, payment_status: $payment_status)\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery PromotionProducts {\n    promotionProducts {\n        author_id\n        category_id\n        description\n        id\n        image\n        price\n        promotion_id\n        rating\n        ratings\n        title\n        author {\n            id\n            pen_name\n        }\n        promotion {\n            description\n            discount_percent\n            id\n            name\n        }\n    }\n}\n"): (typeof documents)["\nquery PromotionProducts {\n    promotionProducts {\n        author_id\n        category_id\n        description\n        id\n        image\n        price\n        promotion_id\n        rating\n        ratings\n        title\n        author {\n            id\n            pen_name\n        }\n        promotion {\n            description\n            discount_percent\n            id\n            name\n        }\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery RecommendProducts {\n    recommendProducts {\n        author_id\n        category_id\n        description\n        id\n        image\n        price\n        promotion_id\n        rating\n        ratings\n        title\n        author {\n            id\n            pen_name\n        }\n        promotion {\n            description\n            discount_percent\n            id\n            name\n        }\n    }\n}\n"): (typeof documents)["\nquery RecommendProducts {\n    recommendProducts {\n        author_id\n        category_id\n        description\n        id\n        image\n        price\n        promotion_id\n        rating\n        ratings\n        title\n        author {\n            id\n            pen_name\n        }\n        promotion {\n            description\n            discount_percent\n            id\n            name\n        }\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery PopularProducts {\n    popularProducts {\n        author_id\n        category_id\n        created_at\n        description\n        id\n        image\n        price\n        promotion_id\n        rating\n        ratings\n        title\n        updated_at\n        author {\n            created_at\n            id\n            pen_name\n            updated_at\n        }\n        promotion {\n            created_at\n            description\n            discount_percent\n            id\n            name\n            updated_at\n        }\n    }\n}\n\n"): (typeof documents)["\nquery PopularProducts {\n    popularProducts {\n        author_id\n        category_id\n        created_at\n        description\n        id\n        image\n        price\n        promotion_id\n        rating\n        ratings\n        title\n        updated_at\n        author {\n            created_at\n            id\n            pen_name\n            updated_at\n        }\n        promotion {\n            created_at\n            description\n            discount_percent\n            id\n            name\n            updated_at\n        }\n    }\n}\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Products($categoryIds: [String!], $authorIds: [String!], $ratings: [Int!] ,$limit: Int, $page: Int, $sort: String) {\n    products(\n        categoryIds: $categoryIds\n        authorIds: $authorIds\n        ratings: $ratings\n        limit: $limit\n        page: $page\n        sort: $sort\n    ) {\n        limit\n        page\n        total\n        data {\n            author_id\n            category_id\n            created_at\n            description\n            id\n            image\n            price\n            promotion_id\n            rating\n            ratings\n            title\n            updated_at\n            author {\n                created_at\n                id\n                pen_name\n                updated_at\n            }\n            promotion {\n                created_at\n                description\n                discount_percent\n                id\n                name\n                updated_at\n            }\n        }\n    }\n}\n\n"): (typeof documents)["\n    query Products($categoryIds: [String!], $authorIds: [String!], $ratings: [Int!] ,$limit: Int, $page: Int, $sort: String) {\n    products(\n        categoryIds: $categoryIds\n        authorIds: $authorIds\n        ratings: $ratings\n        limit: $limit\n        page: $page\n        sort: $sort\n    ) {\n        limit\n        page\n        total\n        data {\n            author_id\n            category_id\n            created_at\n            description\n            id\n            image\n            price\n            promotion_id\n            rating\n            ratings\n            title\n            updated_at\n            author {\n                created_at\n                id\n                pen_name\n                updated_at\n            }\n            promotion {\n                created_at\n                description\n                discount_percent\n                id\n                name\n                updated_at\n            }\n        }\n    }\n}\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Promotions {\n    promotions {\n        created_at\n        description\n        discount_percent\n        id\n        name\n        updated_at\n    }\n}\n"): (typeof documents)["\nquery Promotions {\n    promotions {\n        created_at\n        description\n        discount_percent\n        id\n        name\n        updated_at\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery FindOrderPromotion($total: Float!) {\n    findOrderPromotion(total: $total)\n}\n"): (typeof documents)["\nquery FindOrderPromotion($total: Float!) {\n    findOrderPromotion(total: $total)\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateReview($review: CreateReviewDto!) {\n    createReview(\n        review: $review\n    ) {\n        created_at\n        description\n        id\n        product_id\n        rating\n        title\n        updated_at\n        user_id\n    }\n}\n"): (typeof documents)["\nmutation CreateReview($review: CreateReviewDto!) {\n    createReview(\n        review: $review\n    ) {\n        created_at\n        description\n        id\n        product_id\n        rating\n        title\n        updated_at\n        user_id\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Product($id: String!, $limit: Int, $page: Int, $sort: String, $star: Int) {\n    product(id: $id) {\n        author_id\n        category_id\n        description\n        id\n        image\n        price\n        promotion_id\n        rating\n        ratings\n        title\n        category {\n            id\n            name\n        }\n        author {\n            id\n            pen_name\n        }\n        promotion {\n            description\n            discount_percent\n            id\n            name\n        }\n        reviews(star: $star, sort: $sort, page: $page, limit: $limit) {\n            limit\n            page\n            total\n            data {\n                created_at\n                description\n                id\n                product_id\n                rating\n                title\n                user_id\n            }\n        }\n    }\n}\n\n"): (typeof documents)["\nquery Product($id: String!, $limit: Int, $page: Int, $sort: String, $star: Int) {\n    product(id: $id) {\n        author_id\n        category_id\n        description\n        id\n        image\n        price\n        promotion_id\n        rating\n        ratings\n        title\n        category {\n            id\n            name\n        }\n        author {\n            id\n            pen_name\n        }\n        promotion {\n            description\n            discount_percent\n            id\n            name\n        }\n        reviews(star: $star, sort: $sort, page: $page, limit: $limit) {\n            limit\n            page\n            total\n            data {\n                created_at\n                description\n                id\n                product_id\n                rating\n                title\n                user_id\n            }\n        }\n    }\n}\n\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;