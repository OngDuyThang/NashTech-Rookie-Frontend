import gql from "graphql-tag";

export const GET_ALL_PROMOTIONS = gql`
query Promotions {
    promotions {
        created_at
        description
        discount_percent
        id
        name
        image
        updated_at
    }
}
`;

export const FIND_ORDER_PROMOTION = gql`
query FindOrderPromotion($total: Float!) {
    findOrderPromotion(total: $total)
}
`;