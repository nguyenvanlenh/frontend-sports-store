import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchService } from "../services/searchService";
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ name, brands, categories, sizes, currentPage, sizePage, sortBy, sortDirection }, { rejectWithValue }) => {
        try {
            const response = await searchService.searchProduct(
                name,
                brands,
                categories,
                sizes,
                currentPage,
                sizePage,
                sortBy,
                sortDirection
            );
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
const toggleItemInArray = (array, item) => {
    const set = new Set(array);
    set.has(item) ? set.delete(item) : set.add(item);
    return Array.from(set);
};
export const filterSlice = createSlice({
    name: "filter",
    initialState: {
        productFilter: {
            brand: [],
            size: [],
            category: []
        },
        sortAttribute: {
            // field: "price",
            // direction: "asc",
            // label: "Giá thấp tới cao"
        },
        products: [],
        isLoading: false,
        isError: false,
        error: null,
        search: {
            content: null,
            showSuggest: false
        }
    },
    reducers: {
        brandFilter: (state, action) => {
            state.productFilter.brand = toggleItemInArray(state.productFilter.brand, action.payload);
        },
        sizeFilter: (state, action) => {
            state.productFilter.size = toggleItemInArray(state.productFilter.size, action.payload);
        },
        categoryFilter: (state, action) => {
            state.productFilter.category = toggleItemInArray(state.productFilter.category, action.payload);
        },
        clearFilters: (state) => {
            state.productFilter = { brand: [], size: [], category: [] };

        },
        setSortAttribute: (state, action) => {
            state.sortAttribute = action.payload;
        },
        searchByName: (state, action) => {
            state.search = action.payload;
        },
        hideSuggest: (state) => {
            state.search.showSuggest = false
        },
        clearSearch: (state) => {
            state.search = {
                content: null,
                showSuggest: false
            };
        },
        resetFilter: (state) => {
            state.productFilter = { brand: [], size: [], category: [] };
            state.search = {
                content: null,
                showSuggest: false
            };
            state.sortAttribute = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            });
    }
})
export const {
    brandFilter,
    sizeFilter,
    categoryFilter,
    clearFilters,
    setSortAttribute,
    searchByName,
    clearSearch,
    hideSuggest } = filterSlice.actions;
export default filterSlice.reducer;
