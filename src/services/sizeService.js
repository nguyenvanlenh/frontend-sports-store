import httpRequest from "../utils/httpRequest"
const BASE_URL = "/api/sizes";
export const sizeService = {
    getAllSizes: () => {
        return httpRequest.get(BASE_URL)
    },
    createSize: (request) => {
        return httpRequest.post(BASE_URL, request);
    },
    updateSize: (sizeId, request) => {
        const url = `${BASE_URL}/${sizeId}`
        return httpRequest.put(url, request);
    },
    deleteSize: (sizeId) => {
        const url = `${BASE_URL}/${sizeId}`
        return httpRequest.delete(url);
    }
}