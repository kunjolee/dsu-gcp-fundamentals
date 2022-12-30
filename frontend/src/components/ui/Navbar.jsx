import { useDispatch, useSelector } from'react-redux';

import { NavLink } from 'react-router-dom';
import { Box, IconButton } from'@mui/material'
import { AddAPhotoOutlined, AddOutlined, Menu  } from '@mui/icons-material/';


import { setMenu } from'../../store/slices/ui';
import './Navbar.css'
import { createSlug } from '../../utils';
import { UserImage } from '../'

const Navbar = () => {

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { user } = auth;

  const openMenu = () => dispatch(setMenu( true ));

  
  return (
    <>
      <Box className='navbar'>
          <IconButton className='navbar__open_button' onClick={ openMenu }>
            <Menu/>
          </IconButton>
          <NavLink to='/create-album' className='navbar__add_album' >
            <AddOutlined sx={{ color: 'var(--white-color)' }}/>
          </NavLink>
          <NavLink to='/create-photo' className='navbar__add_image' >
            <AddAPhotoOutlined sx={{ color: 'var(--white-color)' }} />
          </NavLink>
          <Box 
            className='navbar__user_image'
            href={`https://gcp-fundamentals-372116.uc.r.appspot.com/user/${createSlug(user?.name)}?id=${user?.id}`}
          >
            <UserImage />
          </Box>
      </Box>
    </>
  )
}
export default Navbar