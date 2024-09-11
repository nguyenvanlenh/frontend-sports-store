import axios from "axios";
import qs from 'query-string';
import { ACCESS_TOKEN, APP_BASE_URL, REFRESH_TOKEN } from "./constant";
import { authService } from "../services/authService";
import { localStorages } from "./localStorage";
import { errorAlert } from "./sweetAlert";
const notAuthenticationURL = ["/api/auth/login", "/api/auth/register", "/api/auth/refresh-token", "/api/auth/outbound/authentication"];

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

const setAuthorizationHeader = (request) => {
    let accessToken = localStorages.getDataByKey(ACCESS_TOKEN);
    if (accessToken)
        request.headers['Authorization'] = `Bearer ${accessToken}`;
};
const handleSessionExpired = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    // window.location.href = "/login";
    errorAlert("Thông báo hết hạn", "Hết phiên đăng nhập. Vui lòng đăng nhập lại.")
};
const refreshAccessToken = async () => {
    let rfToken = localStorages.getDataByKey(REFRESH_TOKEN);
    if (rfToken) {
        try {
            const response = await authService.refreshToken(rfToken);
            if (response.status === 200) {
                let newAccessToken = response.data.accessToken;
                localStorages.setDataByKey(ACCESS_TOKEN, newAccessToken);
                return newAccessToken;
            } else {
                handleSessionExpired();
            }
        } catch (error) {
            handleSessionExpired();
        }
    } else {
        handleSessionExpired();
    }
};

httpRequest.interceptors.request.use(
    (request) => {
        if (!notAuthenticationURL.includes(request.url))
            setAuthorizationHeader(request);
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

        if (error.response && error.response.status === 401 && !notAuthenticationURL.includes(originalRequest.url) && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return httpRequest(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);



export default httpRequest;