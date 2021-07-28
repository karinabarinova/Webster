// import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
// import product from './products/productSlice'
// import company from './company/companySlice'
import auth from './auth/authSlice'
// import search from './search/searchSlice'
import register from './auth/registerSlice'
// import cart from './cart/cartSlice'
import i18n from './i18n/i18nSlice'
import user from './user/userSlice'
import message from './message/messageSlice'

const createReducer = asyncReducers => 
    combineReducers({
        auth,
        register,
        i18n,
        user,
        message
    })

export default createReducer;
