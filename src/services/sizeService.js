import httpRequest from "../utils/httpRequest"

export const sizeService = {
    getAllSizes: () => {
        const url = "/api/sizes"
        return httpRequest.get(url)
    }
}