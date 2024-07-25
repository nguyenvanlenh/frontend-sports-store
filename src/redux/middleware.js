import { CART_LS } from "../utils/constant";

export const localStorageMiddleware = store => next => action => {
    let result = next(action);
    localStorage.setItem(CART_LS, JSON.stringify(store.getState().cart));
    return result;
};
