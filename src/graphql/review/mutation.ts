import gql from "graphql-tag";

export const CREATE_REVIEW = gql`
mutation CreateReview($review: CreateReviewDto!) {
    createReview(
        review: $review
    ) {
        created_at
        description
        id
        product_id
        rating
        title
        updated_at
        user_id
    }
}
`;