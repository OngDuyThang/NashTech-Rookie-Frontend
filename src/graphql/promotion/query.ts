import gql from "graphql-tag";

export const GET_ALL_PROMOTIONS = gql`
query Promotions {
    promotions {
        created_at
        description
        discount_percent
        id
        name
        updated_at
    }
}
`;