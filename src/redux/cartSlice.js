import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addProduct: (state, action) => {
            const exists = state.some(item =>
                item.productId === action.payload.productId
                && item.sizeId === action.payload.sizeId);

            if (!exists) {
                state.push(action.payload);
            }
        },
        deleteProduct: (state, action) => {
            const { productId, sizeId } = action.payload;
            return state.filter(item =>
                !(item.productId === productId && item.sizeId === sizeId));
        },
        deleteAllProducts: () => []
    }
})
export const { addProduct, deleteProduct, deleteAllProducts } = cartSlice.actions
export default cartSlice.reducer