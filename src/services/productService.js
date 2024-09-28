import httpRequest from "../utils/httpRequest"
const BASE_URL = "/api/products"
export const productService = {
    getProductById: (productId) => {
        const url = `${BASE_URL}/${productId}`;
        return httpRequest.get(url);

    },
    getAllProducts: (page = 0, size = 20, sortBy = "name", sortOrder = "asc") => {
        return httpRequest.get(BASE_URL, {
            params: {
                page,
                size,
                sort: `${sortBy},${sortOrder}`
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
    },
    updateProduct: (productId, productRequest, files) => {
        const url = `${BASE_URL}/${productId}`;
        const formData = new FormData();

        formData.append("product", new Blob([JSON.stringify(productRequest)],
            { type: "application/json" }));

        files.forEach((file) => {
            formData.append("files", file);
        });

        return httpRequest.put(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
}