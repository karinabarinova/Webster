import { createSlice } from "@reduxjs/toolkit";
import jwt from './index';
import { showMessage } from '../message/messageSlice'
import { getUserInfo } from "../user/userSlice";

export const login = (data) => async (dispatch, getState) => {
    return jwt
        .login(data)
        .then(data => {
            dispatch(showMessage(data.message))
            dispatch(setLogIn(data))
            return dispatch(getUserInfo())
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}

export const loginGoogle = (payload) => async (dispatch, getState) => {
    return jwt
        .loginGoogle(payload)
        .then(data => {
            dispatch(getUserInfo())
            dispatch(setLogIn(data))
            return dispatch(showMessage(data.message))
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}

export const logout = () => async (dispatch, getState) => {
    const {user} = getState().auth;
    if (!user.email) {
        localStorage.removeItem('user')
        return null;
    }
    localStorage.removeItem('user')

    jwt.logout();

    dispatch(setLogout());

}

const initialState = {
    user: {},
    cart: {}
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogIn: (state, action) => {
            state.user = action.payload.data
            state.message = action.payload.message
            localStorage.setItem('user', JSON.stringify(state))
        },
        setLogout: (state, action) => initialState
    },
    extraReducers: {}
})

export const { setLogIn, setLogout } = authSlice.actions

export default authSlice.reducer
