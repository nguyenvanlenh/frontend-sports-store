import { createSlice } from "@reduxjs/toolkit";
import {
    addCartItemThunk,
    removeCartItemThunk,
    updateProductQuantityCartItemThunk,
    getCartByUserThunk,
    deleteCartByUserThunk,
    removeListCartItemThunk
} from "./cartThunks";

const initialState = {
    cartItems: [],
    status: 'idle',
    error: null
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCartItemThunk.fulfilled, (state, action) => {
                state.cartItems.push(action.payload);
                state.status = 'succeeded';
            })
            .addCase(addCartItemThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            })

            .addCase(removeCartItemThunk.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload
                );
                state.status = 'succeeded';
            })
            .addCase(removeCartItemThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            })

            .addCase(removeListCartItemThunk.fulfilled, (state, action) => {
                const listCartItemIdDelete = action.payload;
                state.cartItems = (state.cartItems || []).filter(item =>
                    !listCartItemIdDelete.some(
                        pr => pr === item.id
                    )
                );
                state.status = 'succeeded';
            })
            .addCase(removeListCartItemThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            })

            .addCase(updateProductQuantityCartItemThunk.fulfilled, (state, action) => {
                const { cartItemId, quantity } = action.payload;
                const cartItems = state.cartItems.map(
                    item => {
                        if (item.id === cartItemId)
                            return {
                                ...item,
                                quantity: quantity
                            }
                        return item;
                    });
                state.cartItems = cartItems
                state.status = 'succeeded';
            })
            .addCase(updateProductQuantityCartItemThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            })

            .addCase(getCartByUserThunk.fulfilled, (state, action) => {
                state.cartItems = action.payload;
                state.status = 'succeeded';
            })
            .addCase(getCartByUserThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            })

            .addCase(deleteCartByUserThunk.fulfilled, (state) => {
                state.cartItems = [];
                state.status = 'succeeded';
            })
            .addCase(deleteCartByUserThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            });
    }
});
export const { clearCart } = cartSlice.actions
export default cartSlice.reducer;
