import httpRequest from "../utils/httpRequest";
const BASE_URL = "/api/auth"
export const authService = {
    login: (loginRequest) => {
        const url = `${BASE_URL}/login`;
        return httpRequest.post(url, loginRequest);
    },
    register: (registerRequest) => {
        const url = `${BASE_URL}/register`;
        return httpRequest.post(url, registerRequest);
    },
    refreshToken: (token) => {
        const url = `${BASE_URL}/refresh-token`;
        return httpRequest.post(url,
            {
                token: token
            });
    },
    outboundUserGG: (code) => {
        const url = `${BASE_URL}/outbound/authentication?code=${code}`;
        return httpRequest.post(url);
    }
}