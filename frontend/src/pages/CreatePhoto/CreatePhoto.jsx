import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { CloudUploadOutlined, CollectionsOutlined, InfoOutlined } from '@mui/icons-material/';

import { useState } from 'react';

import { Spinner, UserImage } from '../../components';
import { api } from '../../api/axios';
import { useMessage } from '../../hooks';

import './CreatePhoto.css'

const CreatePhoto = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const showMessage = useMessage();

  const onSave = async (form) => {
    const { description, url } = form;  
    const file = url[0]
    
    if(url.length === 0) return showMessage('Please upload your image!', 'error');
    if (file.size > ( 5 * 1024 * 1024)) return showMessage('File too large!', 'error');

    const token = localStorage.getItem('token') || 'invalid token';

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append('description', description)
      formData.append('url', file);
      
      const { data } = await api.post('/photo', formData, {
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
    <form className='photo' onSubmit={ handleSubmit(onSave) }>
      <Box className='photo__drop'>
        <label>
          <Box className='photo__drop_image'>
            <Box className='photo__file'>
              <Box className='photo__file_container'>
                <CloudUploadOutlined/>
                <p>Upload your photo</p>
              </Box>
              <p className='photo__file_extensions'>Use hight-quality JPG, SVG, PNG</p>
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
      <Box className='photo__form'>
        <Typography variant='h2' sx={{ fontWeight: 800, mb: '1rem', fontSize: '30px' }} >Save your photo here! </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InfoOutlined sx={{ mr: 1 }} />
          <TextField 
            className='photo__input'
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
          variant='contained'
          color='secondary'
          type='submit'
          sx={{ my: 3 }}
        >
          Save photo
        </Button>
        {
          loading && <Spinner message={ 'Saving your data...' } />
        }
     
      </Box>
    </form>
  )
}
export default CreatePhoto