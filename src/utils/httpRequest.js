import axios from "axios";
import qs from 'query-string';
import { ACCESS_TOKEN, APP_BASE_URL, REFRESH_TOKEN } from "./constant";
const notAuthenticationURL = ['/api/auth/login', '/api/auth/register', '/api/auth/refresh-token'];

const httpRequest = axios.create({
    baseURL: APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: {
        serialize: (params) => {
            return qs.stringify(params, {
                arrayFormat: 'bracket'
            })
        }
    }
})

httpRequest.interceptors.request.use(
    (request) => {
        // if (!notAuthenticationURL.includes(request.url)) {
        //     let accessToken = localStorage.getItem(ACCESS_TOKEN);
        //     request.headers['Authorization'] = `Bearer ${accessToken}`;
        // }
        return request;
    },
    (error) => Promise.reject(error)
);

httpRequest.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            let refreshToken = localStorage.getItem(REFRESH_TOKEN);

            try {
                const response = await axios.post(`${APP_BASE_URL}/api/auth/refresh-token`, { token: refreshToken });

                if (response.data.status === "200") {
                    let newAccessToken = response.data.accessToken;
                    localStorage.setItem(ACCESS_TOKEN, newAccessToken);

                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return httpRequest(originalRequest);
                } else {
                    localStorage.removeItem(ACCESS_TOKEN);
                    localStorage.removeItem(REFRESH_TOKEN);
                    window.location.href = "/login";
                    alert("Expired session. Please log in again.");
                }
            } catch (refreshError) {
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
                window.location.href = "/login";
                alert("Expired session. Please log in again.");
            }
        }
        return Promise.reject(error);
    }
);

export default httpRequest;