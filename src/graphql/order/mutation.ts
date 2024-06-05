import gql from "graphql-tag";

export const PLACE_ORDER = gql`
mutation CreateOrder {
    createOrder
}
`;