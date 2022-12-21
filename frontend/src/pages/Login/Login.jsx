import { useNavigate } from 'react-router-dom';

import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { api } from '../../api/axios';
import AuthLayout from '../../Layouts/AuthLayout';
import { setLogin } from '../../store/slices/auth/'
import { isEmail } from '../../utils';
import image from '/assets/login_image.svg';

import './Login.css';
import { useMessage } from '../../hooks/';


const Login = () => {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const dispatch = useDispatch();
  const showMessage = useMessage();

  const goSignUp = () => navigate('/register');

  const onSave = async (form) => {

    try {
      
      const { data } = await api.post('/auth', form);
    
      dispatch( setLogin( data ) );
      showMessage( data.msg, 'success');

      localStorage.setItem('token', data.token);

      navigate('/');
      
    } catch (error) {
      localStorage.removeItem('token');
      const { data } = error.response;
      showMessage( `${data.msg}`, 'error' )
    }
  }
  
  return (
    <AuthLayout>
      <Box className='login__component'>
        <form onSubmit={ handleSubmit(onSave) } noValidate>

          <img className='login__image' src={ image } alt='login-image' />
          
          <Typography variant='h1' fontSize={30} className='login__title' mt={3}>
            Sign In
          </Typography>
          <Typography variant='subtitle2' sx={{ color: 'var(--fifth-color)'}} mt={1}>
            Please fill the inputs below here
          </Typography>

          <Box mt={3}>
            <TextField 
              type='email'
              fullWidth
              label='Email'
              variant='standard' 
              color='secondary' 
              {
                ...register('email', {
                  required: 'Email required',
                  validate: isEmail
                })
              }
              error={ !!errors.email }
              helperText={ errors.email?.message }
              sx={{mb: '1rem'}}
            />
            <TextField 
              type='password'
              fullWidth
              label='Password'
              variant='standard' 
              color='secondary' 
              {
                ...register('password', {
                  required: 'Password required',
                  minLength: { value: 6, message: 'Password should be at least 6 characters' }
                })
              }
              error={ !!errors.password }
              helperText={ errors.password?.message }
              sx={{mb: '1rem'}}
            />
          </Box>
          <Button 
            fullWidth 
            variant='contained'
            type='submit'
            color='secondary'
            sx={{ my: 5 }}
          >
            Login
          </Button>
          <Typography variant='subtitle2' sx={{ color: 'var(--fifth-color)'}}>
            Don't have an account?
            <span 
              className='login__sign-up-button'
              onClick={ goSignUp }
            >
              Sign up
            </span>
          </Typography>      
        </form>
      </Box>
    </AuthLayout>
  )
}
export default Login