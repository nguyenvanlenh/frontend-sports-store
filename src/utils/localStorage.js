import { ACCESS_TOKEN, REFRESH_TOKEN, USER_LS } from "./constant";

export const localStorages = {
    getDataByKey: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`Error getting item with key "${key}":`, error);
            return null;
        }
    },
    setDataByKey: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error(`Error setting item with key "${key}":`, error);
        }
    }
}
export const setLogin = (data) => {
    localStorages.setDataByKey(ACCESS_TOKEN, data.accessToken);
    localStorages.setDataByKey(REFRESH_TOKEN, data.refreshToken);
} 