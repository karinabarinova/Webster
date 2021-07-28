import { createSlice } from '@reduxjs/toolkit';
import i18n from '../../i18n';

export const changeLanguage = languageId => (dispatch, getState) => {
	/*
    Change Language
     */
	i18n.changeLanguage(languageId);

	return dispatch(i18nSlice.actions.languageChanged(languageId));
};

const i18nSlice = createSlice({
	name: 'i18n',
	initialState: {
		language: i18n.options.lng
	},
	reducers: {
		languageChanged: (state, action) => {
			state.language = action.payload;
		}
	}
});

export default i18nSlice.reducer;