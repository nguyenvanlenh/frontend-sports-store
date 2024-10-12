import { useDispatch } from "react-redux";
import { clearOrderIdSaved, clearProductsSelected } from "../redux/orderSlice";
import { useCallback } from "react";
import { removeListCartItemThunk } from "../redux/cartThunks";

export const useClearOrder = (productsSelected) => {
    const dispatch = useDispatch();

    const clearOrder = useCallback(() => {
        dispatch(removeListCartItemThunk(productsSelected));
        dispatch(clearProductsSelected());
        dispatch(clearOrderIdSaved());
    }, [dispatch, productsSelected]);

    return clearOrder;
};
