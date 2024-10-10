export const vnPayPaymentRequest = ({
    orderId,
    amount,
    paymentFee = 0,
    bankCode = "NCB",
    language = "vn",
} = {}) => ({
    orderId,
    amount,
    paymentFee,
    bankCode,
    language,
})