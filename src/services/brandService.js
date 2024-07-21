import httpRequest from "../utils/httpRequest"

export const brandService = {
    getAllBrands: () => {
        const url = "/api/brands"
        return httpRequest.get(url)
    }
}