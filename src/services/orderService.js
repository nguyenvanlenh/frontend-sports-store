import httpRequest from "../utils/httpRequest";

const BASE_URL = "/api/orders";

export const orderService = {
    createOrder: (orderRequest) => {
        return httpRequest.post(BASE_URL, orderRequest);
    },
    updateOrderStatus: (orderId, status) => {
        const url = `${BASE_URL}/${orderId}`;
        return httpRequest.patch(url, status);
    },
    getOrder: (orderId) => {
        const url = `${BASE_URL}/${orderId}`;
        return httpRequest.get(url);
    },
    getOrders: () => {
        return httpRequest.get(BASE_URL);
    },
    getOrdersByUserId: (userId) => {
        const url = `${BASE_URL}/user/${userId}`;
        return httpRequest.get(url);
    }
};
