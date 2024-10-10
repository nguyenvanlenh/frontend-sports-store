import { useDispatch } from "react-redux";
import { removeCartItemByListSelect } from "../redux/cartSlice";
import { clearOrderIdSaved, clearProductsSelected } from "../redux/orderSlice";
import { useCallback } from "react";

export const useClearOrder = (productsSelected) => {
    const dispatch = useDispatch();

    const clearOrder = useCallback(() => {
        dispatch(removeCartItemByListSelect(productsSelected));
        dispatch(clearProductsSelected());
        dispatch(clearOrderIdSaved());
    }, [dispatch, productsSelected]);

    return clearOrder;
};
