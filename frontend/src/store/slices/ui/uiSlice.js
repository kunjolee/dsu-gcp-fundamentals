import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menu: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setMenu: ( state, action ) => {
            state.menu = action.payload
        },
    }
});

export const { setMenu } = uiSlice.actions;