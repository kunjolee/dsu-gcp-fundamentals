import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { lightTheme } from '../src/themes/lightTheme';
import App from './App';
import './index.css';



ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={ lightTheme }>
        <BrowserRouter>
            <CssBaseline/>
            <App />
        </BrowserRouter>
    </ThemeProvider>
)
