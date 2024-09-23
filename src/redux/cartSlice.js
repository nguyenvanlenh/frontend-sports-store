import { createSlice } from "@reduxjs/toolkit";
import { CART_LS } from "../utils/constant";
const initialState = JSON.parse(localStorage.getItem(CART_LS)) || [];
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProductToCart: (state, action) => {
            const exists = state.some(item =>
                item.productId === action.payload.productId
                && item.size.id === action.payload.size.id);

            if (!exists) {
                state.push(action.payload);
            }
        },
        removeProductFromCart: (state, action) => {
            const { id } = action.payload;
            return state.filter(item =>
                !(item.id === id));
        },
        updateProductQuantityInCart: (state, action) => {
            const { id, quantity } = action.payload;
            return state
                .map(item => {
                    if (item.id === id)
                        return {
                            ...item,
                            quantity: quantity
                        }
                    return item;
                })
        },
        removeCartItemByListId: (state, action) => {
            const listItemsSelect = action.payload;
            return state?.filter(item => !listItemsSelect.includes(item.id));
        }
        ,
        clearCart: () => []
    }
})
export const {
    addProductToCart,
    removeProductFromCart,
    updateProductQuantityInCart,
    removeCartItemByListId,
    clearCart } = cartSlice.actions
export default cartSlice.reducer