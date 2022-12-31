import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Box, Button, Divider, IconButton } from '@mui/material';
import { ArrowBackRounded } from '@mui/icons-material';

import profileBackground from '/assets/profile-background.svg'
import { apiUser } from '../../api/axios';
import Spinner from '../../components/Spinner';
import { AlbumsUserProfile, PhotosUserProfile } from '../../components';

import './UserProfile.css';


const UserProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [typeLayout, setTypeLayout] = useState('photos');
  
  let { search } = useLocation();
  let query = new URLSearchParams(search);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await apiUser.get(`/${ query.get('id') }`)

        setProfileData( data )

      } catch (error) {
        console.log('error getting user profile', error);
        navigate('/')

      }
    }

    fetchData();
  }, []);


  const changeLayout = ( type = 'photos' ) => setTypeLayout(type) ;


  if (!profileData.user) return <Spinner message='Loading user profile' />

  return (
    <Box className='user-profile'>
      <Box className='user-profile__banner'>
        <img 
          className='user-profile__banner_background'
          src={ profileBackground } alt='profile-background' 
        />
        <img 
            className='user-profile__image' 
            src={ profileData.user?.image } 
            alt='user-image' 
            
        />
        <a href='http://35.192.147.166:4000/' 
          className='user-profile__button_container user-profile__button_container--back'
        >
          <IconButton 
            className='user-profile__button '
          >
            <ArrowBackRounded fontSize='medium' sx={{ color: 'var(--black-color)' }}/>
          </IconButton>
          <p>Back to home</p>
        </a>
        
      </Box>
      <Box className='user-profile__info'>
        <p className='user-profile__name'>@{ profileData.user?.name }</p>
        <p className='user-profile__biography'>{ profileData.user?.biography}</p>
        
      </Box>
      <Divider />
      <Box className='user-profile__buttons_container'>
        <Button 
          variant='contained'
          color='secondary'
          type='submit'
          sx={{ my: 5 }}
          onClick={ () => changeLayout() }
        >
          Photos
        </Button>
        <Button 
          variant='contained'
          color='secondary'
          type='submit'
          sx={{ my: 5 }}
          onClick={ () => changeLayout('albums') }
        >
          Albums
        </Button>
      </Box>

      { typeLayout === 'photos' ? (
          <PhotosUserProfile profileData={ profileData } />
         ) : (
          <AlbumsUserProfile profileData={ profileData } />
        )
      }
    </Box>
  )
}
export default UserProfile