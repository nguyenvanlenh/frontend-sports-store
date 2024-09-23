import { CART_LS, ORDER_LS, USER_LS } from "../utils/constant";

export const localStorageMiddleware = store => next => action => {
    let result = next(action);
    localStorage.setItem(CART_LS, JSON.stringify(store.getState().cart));
    localStorage.setItem(USER_LS, JSON.stringify(store.getState().auth));
    localStorage.setItem(ORDER_LS, JSON.stringify(store.getState().order));
    return result;
};
