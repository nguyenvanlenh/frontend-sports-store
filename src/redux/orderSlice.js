import { createSlice } from "@reduxjs/toolkit";
import { ORDER_LS } from "../utils/constant";
const initialState = JSON.parse(localStorage.getItem(ORDER_LS)) ||
{
    productsSelected: [],
    orderIdSaved: null
};
export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addProductToOrder: (state, action) => {
            state.productsSelected.push(action.payload);
        },
        setOneProductToOrder: (state, action) => {
            state.productsSelected = action.payload;
        },
        removeProductFromOrder: (state, action) => {
            const cartItem = action.payload;
            state.productsSelected = state.productsSelected
                .filter((item) =>
                    !(item?.product.id === cartItem?.product.id &&
                        item?.size.id === cartItem?.size.id));
        },
        updateProductQuantityInOrder: (state, action) => {
            const { id, quantity } = action.payload;
            const product = state.productsSelected.find(item => item.id === id);
            if (product) {
                product.quantity = quantity;
            }
        },
        clearProductsSelected: (state) => {
            state.productsSelected = [];
        },
        setOrderIdSaved: (state, action) => {
            state.orderIdSaved = action.payload;
        },
        clearOrderIdSaved: (state) => {
            state.orderIdSaved = null;
        }

    }
})
export const {
    addProductToOrder,
    setOneProductToOrder,
    removeProductFromOrder,
    updateProductQuantityInOrder,
    clearProductsSelected,
    setOrderIdSaved,
    clearOrderIdSaved } = orderSlice.actions;

export default orderSlice.reducer;