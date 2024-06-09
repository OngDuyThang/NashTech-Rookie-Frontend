import gql from "graphql-tag";

export const GET_ORDERS_BY_USER_ID = gql`
query FindAllByUserId {
    findAllByUserId {
        address
        created_at
        email
        id
        name
        payment_method
        payment_status
        phone
        status
        total
        updated_at
        user_id
    }
}
`;