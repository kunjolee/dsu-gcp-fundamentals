import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { CloudUploadOutlined, CollectionsOutlined, InfoOutlined } from '@mui/icons-material/';

import { useState } from 'react';

import { Spinner, UserImage } from '../../components';
import { api } from '../../api/axios';
import { useMessage } from '../../hooks';

import './CreateAlbum.css'

const CreateAlbum = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const showMessage = useMessage();

  const onSave = async (form) => {
    const { url } = form;
    const file = url[0]
    
    if(url.length === 0) return showMessage('Please upload your image!', 'error');
    if (file.size > ( 5 * 1024 * 1024)) return showMessage('File too large!', 'error');

    const token = localStorage.getItem('token') || 'invalid token';

    try {
      setLoading(true);

      const formData = new FormData();

      for (const key in form) {
        formData.append(key, form[key])
      } 
      
      formData.append('url', file);
      
      const { data } = await api.post('/album', formData, {
        headers: {
          token
        }
      });

      showMessage(data.msg, 'success');
      reset();

      
    } catch (error) {

      const { msg = 'Error - contact your admin' } = error?.response?.data
      showMessage(msg, 'error')

    }finally {
      setLoading(false);
    }
  }

  return (
    <form className='album' onSubmit={ handleSubmit(onSave) }>
      <Box className='album__drop'>
        <label>
          <Box className='album__drop_image'>
            <Box className='album__file'>
              <Box className='album__file_container'>
                <CloudUploadOutlined/>
                <p>Upload your file</p>
              </Box>
              <p className='album__file_extensions'>Use hight-quality JPG, SVG, PNG</p>
            </Box>
            <input type='file' {
              ...register('url', {
                  required: 'url is required'
                })
              } 
            />
          </Box>
        </label>
      </Box>
      <Box className='album__form'>
        <Typography variant='h2' sx={{ fontWeight: 800, mb: '1rem', fontSize: '30px'  }} >Create album! </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CollectionsOutlined sx={{ mr: 1 }} />
          <TextField 
            className='album__input'
            fullWidth
            variant='standard' 
            color='secondary' 
            label='Add your album name here'
            { ...register('name', {
              required: 'Name required',
              minLength: { value: 2, message: 'Name should be at least 2 characters'}
            })}
            error={ !!errors.name }
            helperText={ errors.name?.message }
            sx={{mb: '1rem'}}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InfoOutlined sx={{ mr: 1 }} />
          <TextField 
            className='album__input'
            fullWidth
            variant='standard' 
            color='secondary' 
            label='Description'
            { ...register('description', {
              required: 'description required',
              minLength: { value: 2, message: 'description should be at least 2 characters'}
            })}
            error={ !!errors.description }
            helperText={ errors.description?.message }
            sx={{mb: '1rem'}}
          />
        </Box>
        <UserImage />
        <Button 
          // fullWidth 
          variant='contained'
          color='secondary'
          type='submit'
          sx={{ my: 3 }}
        >
          Save Album
        </Button>
        {
          loading && <Spinner message={ 'Saving your data...' } />
        }
      </Box>
    </form>
  )
}
export default CreateAlbum