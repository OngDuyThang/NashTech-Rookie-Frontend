import gql from "graphql-tag";

export const getCategories = gql`
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

export const getCategory = gql`
query Category($id: String!, $limit: Int, $page: Int, $sort: String) {
    category(id: $id) {
        id
        name
        parent_id
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