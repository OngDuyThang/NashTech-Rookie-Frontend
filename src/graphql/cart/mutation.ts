import gql from "graphql-tag";

export const ADD_TO_USER_CART = gql`
mutation CreateCartItem($item: CreateCartItemDto!) {
    createCartItem(item: $item) {
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
`;

export const UPDATE_CART_ITEM = gql`
mutation UpdateCartItem($id: String!, $quantity: Float!) {
    updateCartItem(id: $id, quantity: $quantity)
}
`;

export const REMOVE_CART_ITEM = gql`
mutation DeleteCartItem($id: String!) {
    deleteCartItem(id: $id)
}
`;