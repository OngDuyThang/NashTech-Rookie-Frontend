import gql from "graphql-tag";

export const PLACE_ORDER = gql`
mutation CreateOrder($order: CreateOrderDto!) {
    placeOrder(order: $order) {
        clientSecret
        orderId
    }
}
`;

export const UPDATE_PAYMENT_STATUS = gql`
mutation UpdatePaymentStatus($orderId: String!, $payment_status: String!) {
    updatePaymentStatus(orderId: $orderId, payment_status: $payment_status)
}
`;