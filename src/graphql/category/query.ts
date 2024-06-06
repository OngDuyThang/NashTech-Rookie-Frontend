import gql from "graphql-tag";

export const GET_CATEGORIES = gql`
query Categories {
    categories {
        id
        name
        parent_id
        parent {
            id
            name
            parent_id
        }
    }
}
`;