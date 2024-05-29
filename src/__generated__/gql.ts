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
    "\nquery Author($id: String!, $limit: Int, $page: Int, $sort: String) {\n    author(id: $id) {\n        id\n        pen_name\n        products(limit: $limit, page: $page, sort: $sort) {\n            limit\n            page\n            total\n            data {\n                author_id\n                category_id\n                description\n                id\n                image\n                price\n                promotion_id\n                rating\n                ratings\n                title\n                author {\n                    id\n                    pen_name\n                }\n                promotion {\n                    description\n                    discount_percent\n                    id\n                    name\n                }\n            }\n        }\n    }\n}\n": types.AuthorDocument,
    "\nquery Categories {\n    categories {\n        id\n        name\n        parent_id\n        parent {\n            id\n            name\n            parent_id\n        }\n    }\n}\n": types.CategoriesDocument,
    "\nquery Category($id: String!, $limit: Int, $page: Int, $sort: String) {\n    category(id: $id) {\n        id\n        name\n        parent_id\n        products(limit: $limit, page: $page, sort: $sort) {\n            limit\n            page\n            total\n            data {\n                author_id\n                category_id\n                description\n                id\n                image\n                price\n                promotion_id\n                rating\n                ratings\n                title\n                author {\n                    id\n                    pen_name\n                }\n                promotion {\n                    description\n                    discount_percent\n                    id\n                    name\n                }\n            }\n        }\n    }\n}\n": types.CategoryDocument,
    "\nquery PromotionProducts {\n    promotionProducts {\n        author_id\n        category_id\n        description\n        id\n        image\n        price\n        promotion_id\n        rating\n        ratings\n        title\n        author {\n            id\n            pen_name\n        }\n        promotion {\n            description\n            discount_percent\n            id\n            name\n        }\n    }\n}\n": types.PromotionProductsDocument,
    "\nquery RecommendProducts {\n    recommendProducts {\n        author_id\n        category_id\n        description\n        id\n        image\n        price\n        promotion_id\n        rating\n        ratings\n        title\n        author {\n            id\n            pen_name\n        }\n        promotion {\n            description\n            discount_percent\n            id\n            name\n        }\n    }\n}\n": types.RecommendProductsDocument,
    "\n    query ProductsByRating($rating: Float, $limit: Int, $page: Int, $sort: String) {\n    productsByRating(rating: $rating) {\n        limit\n        page\n        total\n        data {\n            author_id\n            category_id\n            description\n            id\n            image\n            price\n            promotion_id\n            rating\n            ratings\n            title\n            author {\n                id\n                pen_name\n            }\n            promotion {\n                description\n                discount_percent\n                id\n                name\n            }\n        }\n    }\n}\n\n": types.ProductsByRatingDocument,
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
export function gql(source: "\nquery Author($id: String!, $limit: Int, $page: Int, $sort: String) {\n    author(id: $id) {\n        id\n        pen_name\n        products(limit: $limit, page: $page, sort: $sort) {\n            limit\n            page\n            total\n            data {\n                author_id\n                category_id\n                description\n                id\n                image\n                price\n                promotion_id\n                rating\n                ratings\n                title\n                author {\n                    id\n                    pen_name\n                }\n                promotion {\n                    description\n                    discount_percent\n                    id\n                    name\n                }\n            }\n        }\n    }\n}\n"): (typeof documents)["\nquery Author($id: String!, $limit: Int, $page: Int, $sort: String) {\n    author(id: $id) {\n        id\n        pen_name\n        products(limit: $limit, page: $page, sort: $sort) {\n            limit\n            page\n            total\n            data {\n                author_id\n                category_id\n                description\n                id\n                image\n                price\n                promotion_id\n                rating\n                ratings\n                title\n                author {\n                    id\n                    pen_name\n                }\n                promotion {\n                    description\n                    discount_percent\n                    id\n                    name\n                }\n            }\n        }\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Categories {\n    categories {\n        id\n        name\n        parent_id\n        parent {\n            id\n            name\n            parent_id\n        }\n    }\n}\n"): (typeof documents)["\nquery Categories {\n    categories {\n        id\n        name\n        parent_id\n        parent {\n            id\n            name\n            parent_id\n        }\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Category($id: String!, $limit: Int, $page: Int, $sort: String) {\n    category(id: $id) {\n        id\n        name\n        parent_id\n        products(limit: $limit, page: $page, sort: $sort) {\n            limit\n            page\n            total\n            data {\n                author_id\n                category_id\n                description\n                id\n                image\n                price\n                promotion_id\n                rating\n                ratings\n                title\n                author {\n                    id\n                    pen_name\n                }\n                promotion {\n                    description\n                    discount_percent\n                    id\n                    name\n                }\n            }\n        }\n    }\n}\n"): (typeof documents)["\nquery Category($id: String!, $limit: Int, $page: Int, $sort: String) {\n    category(id: $id) {\n        id\n        name\n        parent_id\n        products(limit: $limit, page: $page, sort: $sort) {\n            limit\n            page\n            total\n            data {\n                author_id\n                category_id\n                description\n                id\n                image\n                price\n                promotion_id\n                rating\n                ratings\n                title\n                author {\n                    id\n                    pen_name\n                }\n                promotion {\n                    description\n                    discount_percent\n                    id\n                    name\n                }\n            }\n        }\n    }\n}\n"];
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
export function gql(source: "\n    query ProductsByRating($rating: Float, $limit: Int, $page: Int, $sort: String) {\n    productsByRating(rating: $rating) {\n        limit\n        page\n        total\n        data {\n            author_id\n            category_id\n            description\n            id\n            image\n            price\n            promotion_id\n            rating\n            ratings\n            title\n            author {\n                id\n                pen_name\n            }\n            promotion {\n                description\n                discount_percent\n                id\n                name\n            }\n        }\n    }\n}\n\n"): (typeof documents)["\n    query ProductsByRating($rating: Float, $limit: Int, $page: Int, $sort: String) {\n    productsByRating(rating: $rating) {\n        limit\n        page\n        total\n        data {\n            author_id\n            category_id\n            description\n            id\n            image\n            price\n            promotion_id\n            rating\n            ratings\n            title\n            author {\n                id\n                pen_name\n            }\n            promotion {\n                description\n                discount_percent\n                id\n                name\n            }\n        }\n    }\n}\n\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;