import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import { lightTheme } from '../src/themes/lightTheme';

import { store } from './store'

import App from './App';
import './index.css';




ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={ store }>
        <ThemeProvider theme={ lightTheme }>
            <BrowserRouter>
                <SnackbarProvider>
                    <CssBaseline/>
                    <App />
                </SnackbarProvider>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>
)
