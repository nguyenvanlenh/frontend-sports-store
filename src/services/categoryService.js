import httpRequest from "../utils/httpRequest"

export const categoryService = {
    getAllCategories: () => {
        const url = "/api/categories"
        return httpRequest.get(url)
    }
}