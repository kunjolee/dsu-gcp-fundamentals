import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: ( state, action ) => {
            state.auth = action.payload
        },
        setLogout: ( state ) => {
            state.auth = null
        },
        setRegister: ( state, action ) => {
            state.auth = action.payload
        },
    }
});

export const { setLogin, setLogout, setRegister } = authSlice.actions;