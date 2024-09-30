import httpRequest from "../utils/httpRequest"

const BASE_URL = "/api/users"
export const userService = {
    getAllUsers: () => {
        return httpRequest.get(BASE_URL);
    },
    updateUserStatus: (userId, status) => {
        const url = `${BASE_URL}/${userId}`;
        return httpRequest.patch(url, status);
    }
}