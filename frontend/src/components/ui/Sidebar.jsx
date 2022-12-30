import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';

import { Home, CloseOutlined, SentimentVeryDissatisfied, Logout } from '@mui/icons-material/';
import './Sidebar.css';

import { setMenu } from '../../store/slices/ui';
import { NavLink, useNavigate } from 'react-router-dom';
import UserImage  from '../User/UserImage';
import { api } from '../../api/axios';
import Spinner from '../Spinner';
import { createSlug, capitalizeLetter } from '../../utils';
import { NotHaveMessage } from '../';
import { setLogout } from '../../store/slices/auth';


const url = 'https://source.unsplash.com/1600x900/?nature,photography,technology';

const Sidebar = () => {

  const { menu } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState( false );
  const navigate = useNavigate()

  useEffect(() => {
    
    const getAlbums = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token') || 'invalid token';

        const options = {
          headers: {
            token
          }
        }

        const { data } = await api.get('/album', options);
        const { albums } = data; 
        setAlbums( albums );

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    } 

    getAlbums();

  }, []);

  const closeMenu = () => dispatch(setMenu( false ));
  const logOut = () => {
    localStorage.removeItem('token');
    dispatch( setLogout() );
    navigate('/login');
  }

  return (
    <Box className={ menu ? 'sidebar sidebar__open' : 'sidebar' }  >
      <IconButton className='sidebar__close_button' onClick={ closeMenu }>
        <CloseOutlined/>
      </IconButton>
      <List className='sidebar__list_container'>
        <Box className='sidebar__logo'>
          <img 
            className='sidebar__image'
            src="/assets/camera_image.png" alt="logo_camera" 
          />
          <h1 className='sidebar__title'>MyPicz</h1>
        </Box>
        <NavLink
            to='/'
            onClick={ closeMenu }
            className={({ isActive } ) => isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'}
          >
            <ListItem sx={{ cursor: 'pointer '}}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
            </ListItem>
          </NavLink>
        <ListSubheader sx={{fontSize: 20, color: 'var(--black-color)'}}>Your albums</ListSubheader>
        <Box className='sidebar__list'>
          
          {
            albums?.length > 0 ? 
              (
                albums.map( album => (
                  <NavLink
                    to={`/album/${createSlug(album.name)}`}
                    className={({ isActive } ) => isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'}
                    onClick={ closeMenu }
                    key={ album.name }
                   >
                    <ListItem sx={{ cursor: 'pointer '}}>
                        <ListItemIcon className='sidebar__listItemIcon'>
                          <img 
                            className='sidebar__image'
                            src={ url } alt={ album.name } 
                          />
                        </ListItemIcon>
                        <ListItemText>{ capitalizeLetter( album.name ) }</ListItemText>
                    </ListItem>
                  </NavLink>
                ))
              
              ) : (
                <Box padding='16px' display='flex' flexDirection='column' alignItems='start'>
                  <NotHaveMessage variant='subtitle2' message={"You don't have albums"} />
                  <SentimentVeryDissatisfied fontSize='large' />
                </Box>
              )
          }
          {
            loading && <Spinner message='loading your albums' />
          }
          
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <UserImage isPadding={true} />
          <Box className='sidebar__button_logout'>
            <IconButton 
              className='user-profile__button '
              onClick={ logOut }
            >
              <Logout fontSize='medium' sx={{ color: 'var(--black-color)' }}/>
            </IconButton>
            <p>Log Out</p>
          </Box>
        </Box>
      </List>
    </Box>
  )
}
export default Sidebar