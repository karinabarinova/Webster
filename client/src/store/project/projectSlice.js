import { createSlice } from "@reduxjs/toolkit";
import jwt from '../auth/index';
import { showMessage } from "../message/messageSlice";

export const saveProject = (image) => async (dispatch, getState) => {
    return jwt
        .saveProject(image)
        .then((data) => {
            return dispatch(setPath(data))
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}

const initialState = {
    path: {},
    projects: {},
}

export const userSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setPath: (state, action) => {
            state.path = action.payload.data
        },
        setProjects: (state, action) => {
            state.projects = action.payload
        },
    },
    extraReducers: {}
})


export const { setPath, setProjects } = userSlice.actions


export default userSlice.reducer
