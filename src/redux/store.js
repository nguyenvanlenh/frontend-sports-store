import { configureStore } from '@reduxjs/toolkit'
import { cartSlice } from './cartSlice'
import { localStorageMiddleware } from './middleware'

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
})