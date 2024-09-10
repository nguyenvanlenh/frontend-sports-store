import httpRequest from "../utils/httpRequest";

const BASE_URL = "/api/ratings";
export const ratingService = {
    addRating: (ratingRequest) => {
        return httpRequest.post(BASE_URL, ratingRequest);
    },
    getRatingsByProductId: (productId, currentPage) => {
        const url = `${BASE_URL}/products/${productId}?page=${currentPage}`;
        return httpRequest.get(url);
    },
    getAverageStarByProductId: (productId) => {
        const url = `${BASE_URL}/products/${productId}/average-star`;
        return httpRequest.get(url);
    }

}