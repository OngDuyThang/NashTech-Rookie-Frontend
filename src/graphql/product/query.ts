import gql from "graphql-tag";

export const getPromotionProducts = gql`
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

export const getRecommendProducts = gql`
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
`