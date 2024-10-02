import httpRequest from "../utils/httpRequest"
const BASE_URL = "/api/brands";
export const brandService = {
    getAllBrands: () => {
        return httpRequest.get(BASE_URL)
    },
    createBrand: (request) => {
        return httpRequest.post(BASE_URL, request);
    },
    updateBrand: (brandId, request) => {
        const url = `${BASE_URL}/${brandId}`
        return httpRequest.put(url, request);
    },
    deleteBrand: (brandId) => {
        const url = `${BASE_URL}/${brandId}`
        return httpRequest.delete(url);
    }
}