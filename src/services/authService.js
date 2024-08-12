import httpRequest from "../utils/httpRequest";

export const authService = {
    login: (loginRequest) => {
        const url = "/api/auth/login";
        return httpRequest.post(url, loginRequest);
    },
    register: (registerRequest) => {
        const url = "/api/auth/register";
        return httpRequest.post(url, registerRequest);
    },
    refreshToken: (token) => {
        console.log(token);

        const url = "/api/auth/refresh-token";
        return httpRequest.post(url,
            {
                token: token
            });
    }
}