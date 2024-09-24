import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { addProductToOrder, removeProductFromOrder } from "./orderSlice";

export const selectOrderState = (state) => state.order;

export const selectProductsSelected = createSelector(
    selectOrderState,
    (orderState) => orderState.productsSelected
);

export const selectOrderIdSaved = createSelector(
    selectOrderState,
    (orderState) => orderState.orderIdSaved
);

export const useToggleProductInOrder = (cartItem) => {
    const dispatch = useDispatch();
    const productsSelected = useSelector(selectProductsSelected);

    const toggleProduct = () => {

        if (productsSelected?.length === 0) {
            dispatch(addProductToOrder(cartItem));
            return;
        }
        const isProductSelected = productsSelected.some(
            (item) =>
                (item?.product.id === cartItem?.product.id) &&
                (item?.size.id === cartItem?.size.id)
        );

        if (isProductSelected) {
            dispatch(removeProductFromOrder(cartItem));
        } else {
            dispatch(addProductToOrder(cartItem));
        }
    }
    return toggleProduct;
}