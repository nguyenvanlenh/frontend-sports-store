import { useDispatch } from "react-redux";
import { removeCartItemByListId } from "../redux/cartSlice";
import { clearOrderIdSaved, clearProductsIdSelected } from "../redux/orderSlice";

export const useClearOrder = (productsIdSelected) => {
    const dispatch = useDispatch();

    const clearOrder = () => {
        dispatch(removeCartItemByListId(productsIdSelected));
        dispatch(clearProductsIdSelected());
        dispatch(clearOrderIdSaved());
    };

    return clearOrder;
};
