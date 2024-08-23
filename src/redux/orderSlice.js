import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: "order",
    initialState: {},
    reducers: {
        createOrder: (state, action) => {
            return action.payload;
        },
        updateOrder: (state, action) => {
            const { id } = action.payload;

        }
    }
})