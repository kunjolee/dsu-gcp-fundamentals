import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import './AuthLayout.css';

const AuthLayout = ({ children }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const auth = localStorage.getItem('token') || null;  
      auth && navigate('/')
}, []);

  return (
    <Box className='auth__page'> 
        { children }    
        <Box className='auth__circle auth__circle--purple' />
        <Box className='auth__circle auth__circle--white' />
        <Box className='auth__circle auth__circle--cyan ' />
        <Box className='auth__circle auth__circle--black' />
    </Box>
  )
}
export default AuthLayout