import { createSlice } from "@reduxjs/toolkit";
import { USER_LS } from "../utils/constant";
const initialState = JSON.parse(localStorage.getItem(USER_LS)) || [];
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        saveAuthentication: (state, action) => {
            return action.payload;
        },
        logout: () => []
    }
})
export const { saveAuthentication, logout } = authSlice.actions;
export default authSlice.reducer