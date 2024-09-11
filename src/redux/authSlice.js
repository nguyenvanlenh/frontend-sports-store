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
        logout: () => [],
        setAuthenticationType: (state, action) => {
            return {
                ...state,
                typeAccount: action.payload
            }
        },

    }
})
export const { saveAuthentication, logout, setAuthenticationType } = authSlice.actions;
export default authSlice.reducer