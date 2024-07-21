import httpRequest from "../utils/httpRequest"

export const productService = {
    getProductById: (productId) => {
        const url = `/api/products/${productId}`;
        return httpRequest.get(url);

    },
    getAllProducts: (currentPage = 0, sizePage = 20, sortBy = "name", direction = "asc") => {
        const url = "/api/products";
        return httpRequest.get(url, {
            params: {
                page: currentPage,
                size: sizePage,
                sort: `${sortBy},${direction}`
            }
        });
    }
}