import { createSlice } from "@reduxjs/toolkit";
import jwt from '../auth/index';
import { showMessage } from "../message/messageSlice";

export const getUserInfo = () => async (dispatch, getState) => {
    return jwt
        .getUserInfo()
        .then((data) => {
            return dispatch(setUserInfo(data))
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}


export const addPassword = password => async (dispatch) => {
    return jwt
        .addPassword(password)
        .then((data) => {
            return dispatch(showMessage(data.message))
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}


export const addAvatar = avatar => async (dispatch) => {
    console.log(avatar.get('image'))
    return jwt
        .addAvatar(avatar)
        .then((data) => {
            dispatch(showMessage(data.message))
            return dispatch(getUserInfo());
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}
export const addEmail = email => async (dispatch) => {
    return jwt
        .addEmail(email)
        .then((data) => {
            dispatch(showMessage(data.message))
            return dispatch(getUserInfo());
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}

export const getOrders = () => async (dispatch, getState) => {
    return jwt
        .getOrders()
        .then((data) => {
            return dispatch(setOrders(data))
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}

const initialState = {
    user: {},
    orders: {},
    selectedOrder: {},
}

export const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.user = action.payload
        },
        setOrders: (state, action) => {
            state.orders = action.payload
        },
        setSelectedOrder: (state, action) => {
            state.selectedOrder = action.payload
        },
        setUserInfoPassword: (state, action) => {
            state.user.password = action.payload
        }

    },
    extraReducers: {}
})


export const { setUserInfo, setOrders, setSelectedOrder, setUserInfoPassword} = userSlice.actions


export default userSlice.reducer
