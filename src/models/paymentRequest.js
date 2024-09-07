export const paymentRequest = ({
    orderId,
    amount,
    paymentFee = 0,
    paymentMethod,
    paymentStatus
} = {}) => ({
    orderId,
    amount,
    paymentFee,
    paymentMethod,
    paymentStatus
})