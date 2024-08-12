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
