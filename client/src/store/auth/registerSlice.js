import { createSlice } from '@reduxjs/toolkit';
import jwt from './jwt';
import { showMessage } from '../message/messageSlice'

export const register = (data) => async dispatch => {
	return jwt
		.register(data)
		.then((data) => {
			dispatch(showMessage(data.message))
			return dispatch(registerSuccess(data));
		})
		.catch(error => {
			return dispatch(showMessage(error.message))
		});
};

export const verifyToken = (data) => async dispatch => {
	return jwt
		.verifyToken(data)
		.then((data) => {
			dispatch(showMessage(data.message));
			return dispatch(verifySuccess(data));
		})
		.catch(error => {
			return dispatch(showMessage(error.message))
		});
};

export const requestReset = (data) => async dispatch => {
	return jwt
		.requestReset(data)
		.then((data) => {
			dispatch(showMessage(data.message));
			return dispatch(requestSuccess(data));
		})
		.catch(error => {
			return dispatch(showMessage(error.message))
		});
};

export const resetPassword = (data) => async dispatch => {
	return jwt
		.resetPassword(data)
		.then((data) => {
			dispatch(showMessage(data.message));
			return dispatch(resetSuccess(data));
		})
		.catch(error => {
			return dispatch(showMessage(error.message))
		});
};

const initialState = {
	success: false,
};

const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {
		resetState: (state, action) => {
			state.success = initialState.success;
		},
		registerSuccess: (state, action) => {
			state.success = true;
		},
		verifySuccess: (state, action) => {
			state.success = false;
		},
		requestSuccess: (state, action) => {
			state.success = false;
		},
		resetSuccess: (state, action) => {
			state.success = false;
		},
	},
	extraReducers: {}
});

export const { registerSuccess, resetState, 
	verifySuccess, 
	requestSuccess,
	resetSuccess 
} = registerSlice.actions;

export default registerSlice.reducer;
