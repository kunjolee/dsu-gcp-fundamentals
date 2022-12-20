import { Box } from '@mui/material';

import './AuthLayout.css';

const AuthLayout = ({ children }) => {
  return (
    <Box className='auth__page'> 
        { children }    
        <Box className='auth__circle auth__circle--gray' />
        <Box className='auth__circle auth__circle--white' />
        <Box className='auth__circle auth__circle--cyan ' />
        <Box className='auth__circle auth__circle--black' />
    </Box>
  )
}
export default AuthLayout