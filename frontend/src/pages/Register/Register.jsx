import { useNavigate } from 'react-router-dom';

import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { isEmail } from '../../utils';

import './Register.css';
import AuthLayout from '../../Layouts/AuthLayout';

const Register = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  const goSignIn = () => navigate('/login');


  const onSave = (form) => {

    console.log('good good', form)
  }


  return (
    <AuthLayout>

      <Box className='register__component'>
        <form onSubmit={ handleSubmit( onSave ) } noValidate>

          <Typography variant='h1' fontSize={30} className='register__title' mt={3}>
            Sign Up
          </Typography>
          <Typography variant='subtitle2' sx={{ color: 'var(--fifth-color)'}} mt={1}>
            Please fill the inputs below here
          </Typography>

          <Box mt={3}>
            <TextField 
              fullWidth
              variant='standard' 
              color='secondary' 
              label='Name'
              { ...register('name', {
                required: 'Name required',
                minLength: { value: 2, message: 'Name should be at least 2 characters'}
              })}
              error={ !!errors.name }
              helperText={ errors.name?.message }
              sx={{mb: '1rem'}}
            />
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
            <TextField 
              fullWidth
              label='Biography'
              variant='standard' 
              color='secondary' 
              { ...register('biography', {
                required: 'Biography required',
                minLength: { value: 2, message: 'Biography should be at least 2 characters'},
                maxLength: { value: 50, message: 'Max characters of 50 '}
              })}
              error={ !!errors.biography }
              helperText={ errors.biography?.message }
              sx={{mb: '2rem'}}
              autoFocus
              multiline
            />
            <InputLabel className='register__file'>
              <Box display='flex' alignItems='center'>
                <PhotoCamera />
                <span style={{ marginLeft: '.5rem'}}>
                  Profile picture
                </span>
                <input className='register__file' type='file' {
                  ...register('image', {
                      required: 'image is required'
                    })
                  } 
                />
              </Box>
            </InputLabel>
          </Box>
          <Button 
            fullWidth 
            variant='contained'
            color='secondary'
            type='submit'
            sx={{ my: 5 }}
          >
            register
          </Button>
          <Typography variant='subtitle2' sx={{ color: 'var(--fifth-color)'}}>
            Already have an account?
            <span 
              className='register__sign-in-button'
              onClick={ goSignIn }
            >
              Sign In
            </span>
          </Typography>  
        </form>
      </Box>
    </AuthLayout>
  )
}
export default Register