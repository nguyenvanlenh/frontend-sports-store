import httpRequest from "../utils/httpRequest";

const BASE_URL = "/api/payments"
export const paymentService = {
    createPayment: (paymentRequest) => {
        return httpRequest.post(BASE_URL, paymentRequest);
    },
    getPayments: (page, size = "", sortBy = "", sortOrder = "") => {
        return httpRequest.get(BASE_URL,
            {
                params: {
                    page,
                    size,
                    sort: `${sortBy},${sortOrder}`
                }
            }
        );
    },
    getPayment: (paymentId) => {
        const url = `${BASE_URL}/${paymentId}`;
        return httpRequest.get(url);
    },
    getPaymentsByUserId: (userId) => {
        const url = `${BASE_URL}/users/${userId}`;
        return httpRequest.get(url);
    },
    updatePaymentStatus: (paymentId, status) => {
        const url = `${BASE_URL}/${paymentId}`;
        return httpRequest.patch(url, status);
    },
    paypal: {
        createPayment: (paymentRequest) => {
            const url = `${BASE_URL}/paypal`;
            return httpRequest.post(url, paymentRequest)
        }
    },
    vnPay: {
        pay: (vnPayPaymentRequest) => {
            const url = `${BASE_URL}/vn-pay`;
            return httpRequest.post(url, vnPayPaymentRequest)
        }
    }
}