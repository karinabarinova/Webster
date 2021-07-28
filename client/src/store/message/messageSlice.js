import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	state: null,
	message: '',
};
const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		showMessage: (state, action) => {
			state.state = true;
			state.message = action.payload;
        },
		hideMessage: (state, action) => {
			state.state = null;
            state.message = null;
		}
	}
});

export const { hideMessage, showMessage } = messageSlice.actions;

export default messageSlice.reducer;