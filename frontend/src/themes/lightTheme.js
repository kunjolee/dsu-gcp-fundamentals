import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        secondary: {
            main: '#3ff1de'
        }
    },
    components:{
        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontSize: '20px'
                },
                h2: {
                    fontSize: '16px'
                }
            }
        }
    }
})