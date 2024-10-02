import httpRequest from "../utils/httpRequest"

const BASE_URL = "/api/users"
export const userService = {
    getAllUsers: (page = 0, size = 20, sortBy = "", sortOrder = "") => {
        return httpRequest.get(BASE_URL,
            {
                params: {
                    page,
                    size,
                    sort: `${sortBy},${sortOrder}`
                }
            }
        );
    },
    updateUserStatus: (userId, status) => {
        const url = `${BASE_URL}/${userId}`;
        return httpRequest.patch(url, status);
    }
}