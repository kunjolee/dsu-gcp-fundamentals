import { useNavigate } from 'react-router-dom';

import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { isEmail } from '../../utils';
import image from '/assets/login_image.svg';

import './Login.css';
import AuthLayout from '../../Layouts/AuthLayout';


const Login = () => {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const goSignUp = () => navigate('/register');

  const onSave = (form) => {
    reset();
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