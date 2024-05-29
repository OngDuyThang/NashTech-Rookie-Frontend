import gql from "graphql-tag";

export const GET_AUTHORS = gql`
query Authors {
    authors {
        id
        pen_name
    }
}
`;

export const GET_AUTHOR = gql`
query Author($id: String!, $limit: Int, $page: Int, $sort: String) {
    author(id: $id) {
        id
        pen_name
        products(limit: $limit, page: $page, sort: $sort) {
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
}
`;