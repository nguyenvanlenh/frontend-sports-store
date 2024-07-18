export const localStorages = {
    getDataByKey: (key) => {
        try {
            const item = localStorage.getItem(key);
            return JSON.parse(item);
        } catch (error) {
            console.error(`Error getting item with key "${key}":`, error);
            return null;
        }
    },
    setDataByKey: (key, data) => {
        try {
            const jsonData = JSON.stringify(data);
            localStorage.setItem(key, jsonData);
        } catch (error) {
            console.error(`Error setting item with key "${key}":`, error);
        }
    }
}
