import gql from "graphql-tag";

export const GET_AUTHORS = gql`
query Authors {
    authors {
        id
        pen_name
    }
}
`;