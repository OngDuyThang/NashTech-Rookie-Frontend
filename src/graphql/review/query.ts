import gql from "graphql-tag";

export const GET_PRODUCT_BY_ID = gql`
query Product($id: String!, $limit: Int, $page: Int, $sort: String, $star: Int) {
    product(id: $id) {
        author_id
        category_id
        description
        id
        image
        price
        promotion_id
        rating
        ratings
        title
        category {
            id
            name
        }
        author {
            id
            pen_name
        }
        promotion {
            description
            discount_percent
            id
            name
        }
        reviews(star: $star, sort: $sort, page: $page, limit: $limit) {
            limit
            page
            total
            data {
                created_at
                description
                id
                product_id
                rating
                title
                user_id
            }
        }
    }
}

`;