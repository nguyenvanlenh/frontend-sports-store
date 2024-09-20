import { createSlice } from "@reduxjs/toolkit";
export const searchSlice = createSlice({
    name: "search",
    initialState: {
        content: null,
        showSuggest: false,
    },
    reducers: {
        searchByName: (state, action) => {
            state.content = action.payload.content;
            state.showSuggest = action.payload.showSuggest;
        },
        hideSuggest: (state) => {
            state.showSuggest = false
        },
        displaySuggest: (state) => {
            state.showSuggest = true
        },
        clearSearch: (state) => {
            state.content = null;
            state.showSuggest = false;
        },
    }
})
export const { searchByName, hideSuggest, displaySuggest, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;