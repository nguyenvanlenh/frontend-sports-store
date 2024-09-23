import { createSlice } from "@reduxjs/toolkit";
import { ORDER_LS } from "../utils/constant";
const initialState = JSON.parse(localStorage.getItem(ORDER_LS)) ||
{
    productsIdSelected: [],
    orderIdSaved: null
};
export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        toggleProductInOrder: (state, action) => {
            const id = action.payload;
            const exists = state.productsIdSelected.some(item => item === id);
            if (!exists)
                state.productsIdSelected.push(action.payload);
            else
                state.productsIdSelected = state.productsIdSelected
                    .filter(item => item !== id);
        },
        clearProductsIdSelected: (state) => {
            state.productsIdSelected = [];
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
    toggleProductInOrder,
    clearProductsIdSelected,
    setOrderIdSaved,
    clearOrderIdSaved } = orderSlice.actions;

export default orderSlice.reducer;