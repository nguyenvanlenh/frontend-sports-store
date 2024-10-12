import httpRequest from "../utils/httpRequest"

const BASE_URL = "/api/carts"
export const cartService = {
    addCartItem: (cartItem) => {
        return httpRequest.post(BASE_URL, cartItem);
    },
    removeCartItem: (cartItemId) => {
        const url = `${BASE_URL}/${cartItemId}`;
        return httpRequest.delete(url);
    },
    removeListCartItem: (listCartItemId) => {
        return httpRequest.delete(BASE_URL, {
            data: listCartItemId,
        });
    },
    updateProductQuantityCartItem: (cartItemId, quantity) => {
        const url = `${BASE_URL}/${cartItemId}`;
        return httpRequest.patch(url, quantity);
    },
    deleteByUserId: () => {
        const url = `${BASE_URL}/clear`;
        return httpRequest.delete(url);
    },
    getCartByUser: () => {
        return httpRequest.get(BASE_URL);
    }
}