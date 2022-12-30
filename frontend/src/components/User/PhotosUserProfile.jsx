import { Box, Card, CardActionArea, CardMedia } from '@mui/material';
import NotHaveMessage from '../NotHaveMessage';

import './index.css';

const PhotosUserProfile = ({ profileData = [] }) => {


  return (
    profileData?.photos?.length > 0 ? (
      <Box className='user-profile__layout'>
        {
          profileData?.photos?.map(el => (
            <Box key={el.idPhoto}>
              <CardActionArea sx={{ height: '100%'}} className='user-profile__photo_card_action'>
                <img className='user-profile__photo' src={el?.url} alt="image" />
              </CardActionArea>
            </Box>
          ))
        }
      </Box>
    ) : (
      <NotHaveMessage variant='h1' message="There are no photos to show"/>
    )
  )
}
export default PhotosUserProfile