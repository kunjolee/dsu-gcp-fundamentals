import { Box, CardActionArea, Typography } from '@mui/material';
import NotHaveMessage from '../NotHaveMessage';

import './index.css';
const AlbumsUserProfile = ({ profileData = [] }) => {

  return (
    profileData?.albums?.length > 0 ? (
      <Box className='user-profile__layout'>
        {
          profileData?.albums?.map(el => (
            <Box key={el.idAlbum} className='user-profile__album' >
              <CardActionArea sx={{ height: '100%' }} className='user-profile__album_card_action' >
                <h2>{ el.album.toUpperCase() }</h2>
              </CardActionArea>
            </Box>
          ))
        }
      </Box>
    ) : (
      <NotHaveMessage variant='h1' message="You don't have albums right now!"/>
    )
  )
}
export default AlbumsUserProfile