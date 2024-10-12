import { ORDER_LS, USER_LS } from "../utils/constant";

export const localStorageMiddleware = store => next => action => {
    let result = next(action);
    localStorage.setItem(USER_LS, JSON.stringify(store.getState().auth));
    localStorage.setItem(ORDER_LS, JSON.stringify(store.getState().order));
    return result;
};
