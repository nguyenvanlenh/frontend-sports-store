import { useDispatch } from "react-redux";
import { removeCartItemByListSelect } from "../redux/cartSlice";
import { clearOrderIdSaved, clearProductsSelected } from "../redux/orderSlice";

export const useClearOrder = (productsSelected) => {
    const dispatch = useDispatch();

    const clearOrder = () => {
        dispatch(removeCartItemByListSelect(productsSelected));
        dispatch(clearProductsSelected());
        dispatch(clearOrderIdSaved());
    };

    return clearOrder;
};
