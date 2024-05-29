import gql from "graphql-tag";

export const GET_PROMOTION_PRODUCTS = gql`
query PromotionProducts {
    promotionProducts {
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
    }
}
`;

export const GET_RECOMMEND_PRODUCTS = gql`
query RecommendProducts {
    recommendProducts {
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
    }
}
`;

export const GET_PRODUCTS_BY_RATING = gql`
    query ProductsByRating($rating: Float, $limit: Int, $page: Int, $sort: String) {
    productsByRating(rating: $rating, limit: $limit, page: $page, sort: $sort) {
        limit
        page
        total
        data {
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
        }
    }
}

`;