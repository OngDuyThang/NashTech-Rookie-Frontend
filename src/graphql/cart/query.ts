import gql from "graphql-tag";

export const GET_USER_CART_COUNT = gql`
query GetUserCartCount {
    getUserCartCount
}
`;

export const GET_USER_CART = gql`
query Cart {
    cart {
        created_at
        id
        updated_at
        user_id
        items {
            cart_id
            created_at
            id
            quantity
            updated_at
            product {
                author
                created_at
                discount
                id
                image
                price
                title
                updated_at
            }
        }
    }
}
`;