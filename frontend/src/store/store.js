import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth/';
import { uiSlice } from './slices/ui/';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer
    }
});

