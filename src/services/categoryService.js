import httpRequest from "../utils/httpRequest"

const BASE_URL = "/api/categories";
export const categoryService = {
    getAllCategories: () => {
        return httpRequest.get(BASE_URL)
    },
    createCategory: (request) => {
        return httpRequest.post(BASE_URL, request);
    },
    updateCategory: (cateId, request) => {
        const url = `${BASE_URL}/${cateId}`
        return httpRequest.put(url, request);
    },
    deleteCategory: (cateId) => {
        const url = `${BASE_URL}/${cateId}`
        return httpRequest.delete(url);
    }
}