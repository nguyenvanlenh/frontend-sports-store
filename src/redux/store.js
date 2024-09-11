import { configureStore } from '@reduxjs/toolkit'
import { cartSlice } from './cartSlice'
import { localStorageMiddleware } from './middleware'
import { filterSlice } from './filterSlice'
import { thunk } from 'redux-thunk';
import { paginationSlice } from './paginationSlice';
import { authSlice } from './authSlice';
export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        filter: filterSlice.reducer,
        pagination: paginationSlice.reducer,
        auth: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(thunk, localStorageMiddleware),
})