import { createAsyncThunk } from "@reduxjs/toolkit";
import { cartService } from "../services/cartService";

export const addCartItemThunk = createAsyncThunk(
    'cart/addCartItem',
    async ({ cartItem, currentCartItems = [] }, { rejectWithValue }) => {
        try {
            const exists = currentCartItems.some(item =>
                item.product.id === cartItem.product.id && item.size.id === cartItem.size.id
            );

            if (exists) {
                // Nếu đã có, ném ra một lỗi với thông điệp phù hợp
                return rejectWithValue("Item already exists in the cart");
            }
            const response = await cartService.addCartItem(cartItem);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const removeCartItemThunk = createAsyncThunk(
    'cart/removeCartItem',
    async (cartItemId, { rejectWithValue }) => {
        try {
            await cartService.removeCartItem(cartItemId);
            return cartItemId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const removeListCartItemThunk = createAsyncThunk(
    'cart/removeListCartItem',
    async (productsSelected, { rejectWithValue }) => {
        try {
            const listCartItemIdDelete = (productsSelected || []).map(item => item.id);
            await cartService.removeListCartItem(listCartItemIdDelete);
            return listCartItemIdDelete;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProductQuantityCartItemThunk = createAsyncThunk(
    'cart/updateProductQuantity',
    async ({ cartItemId, quantity }, { rejectWithValue }) => {
        try {
            await cartService.updateProductQuantityCartItem(cartItemId, quantity);
            return { cartItemId, quantity };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getCartByUserThunk = createAsyncThunk(
    'cart/getCartByUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await cartService.getCartByUser();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteCartByUserThunk = createAsyncThunk(
    'cart/deleteCartByUser',
    async (_, { rejectWithValue }) => {
        try {
            await cartService.deleteByUserId();
            return;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
