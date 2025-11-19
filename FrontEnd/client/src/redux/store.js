import {configureStore} from '@reduxjs/toolkit'
import productsReducer from './productSlice'
import categoriesReducer from './categoriesSlice'
import userReducer from './userSlice'

export const store = configureStore({
    reducer: {
        products: productsReducer, 
        categories : categoriesReducer, 
        user: userReducer}
})