import httpRequest from "../utils/httpRequest";

const BASE_URL = "/api/payments"
export const paymentService = {
    createPayment: (paymentRequest) => {
        return httpRequest.post(BASE_URL, paymentRequest);
    },
    getPayments: () => {
        return httpRequest.get(BASE_URL);
    },
    getPayment: (paymentId) => {
        const url = `${BASE_URL}/${paymentId}`;
        return httpRequest.get(url);
    },
    getPaymentsByUserId: (userId) => {
        const url = `${BASE_URL}/user/${userId}`;
        return httpRequest.get(url);
    },
    updatePaymentStatus: (paymentId, status) => {
        const url = `${BASE_URL}/${paymentId}`;
        return httpRequest.patch(url, status);
    }
}