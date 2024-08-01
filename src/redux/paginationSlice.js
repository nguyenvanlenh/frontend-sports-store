import { createSlice } from "@reduxjs/toolkit";

export const paginationSlice = createSlice({
    name: "pagination",
    initialState: 0,
    reducers: {
        setPage: (state, action) => {
            return action.payload;
        }
    }
})
export const { setPage } = paginationSlice.actions;
export default paginationSlice.reducer;