import httpRequest from "../utils/httpRequest"
const BASE_URL = "/api/products"
export const productService = {
    getProductById: (productId) => {
        const url = `${BASE_URL}/${productId}`;
        return httpRequest.get(url);

    },
    getAllProducts: (currentPage = 0, sizePage = 20, sortBy = "name", direction = "asc") => {
        return httpRequest.get(BASE_URL, {
            params: {
                page: currentPage,
                size: sizePage,
                sort: `${sortBy},${direction}`
            }
        });
    },
    createProduct: (productRequest, files) => {
        const formData = new FormData();

        formData.append("product", new Blob([JSON.stringify(productRequest)],
            { type: "application/json" }));

        files.forEach((file) => {
            formData.append("files", file);
        });

        return httpRequest.post(BASE_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }
}