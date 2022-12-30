import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { createSlug } from '../../utils';

import './UserImage.css';

const UserImage = ({ isPadding }) => {

    const { auth } = useSelector(( state ) => state.auth );
    const { user } = auth;

    
    return (
      <a 
        href={`https://gcp-fundamentals-372116.uc.r.appspot.com/user/${createSlug(user?.name)}?id=${user?.id}`}
      >
        <Box 
          sx={ isPadding ? { pl: '16px' } : { p: 0 }} 
          className='user__container'
        >
            <img  
              className='user__image'
              src={ user?.image } alt={user?.name} 
              
            />
        </Box>
      </a>
     )
}

export default UserImage;