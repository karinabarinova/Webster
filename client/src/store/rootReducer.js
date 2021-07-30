// import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import auth from './auth/authSlice'
import register from './auth/registerSlice'
import project from './project/projectSlice'
import i18n from './i18n/i18nSlice'
import user from './user/userSlice'
import message from './message/messageSlice'

const createReducer = asyncReducers => 
    combineReducers({
        auth,
        register,
        i18n,
        user,
        message,
        project
    })

export default createReducer;
