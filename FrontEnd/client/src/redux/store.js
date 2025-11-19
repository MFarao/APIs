import {configureStore} from '@reduxjs/toolkit'
import productsReducer from './productSlice'
import categoriesReducer from './categoriesSlice'
import authReducer from './authSlice'

export const store = configureStore({
    reducer: {
        products: productsReducer, 
        categories : categoriesReducer, 
        auth: authReducer}
})