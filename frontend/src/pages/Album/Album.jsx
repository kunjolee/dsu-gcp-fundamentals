import { DeleteForever } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { api } from '../../api/axios';
import { Spinner } from '../../components';
import { useGetAlbumsWithPhoto, useMessage } from '../../hooks';
import { MasonryLayout } from '../../Layouts';
import './Album.css';

const Album = ({ album }) => {
  const { albumWithPhotos } = useGetAlbumsWithPhoto(album.id);

  const showMessage = useMessage();

  const deleteAlbum = async () => {
    if (!confirm('Are you sure you want to delete this album permanently?')) return;

    try {
      const idAlbum = albumWithPhotos[0]?.idAlbum || 0;
      const token = localStorage.getItem('token') || 'invalid token';

      const options = {
        headers: {
          token
        }
      }

      const { data } = await api.delete(`/album/${ idAlbum }`, options);
      showMessage(data.msg, 'success');
    } catch (error) {
      const message = error.response.data.msg
      showMessage(message, 'error', 4000)
    }
  }


  return albumWithPhotos.length > 0 ?  (
    <Box>
      <MasonryLayout photos={ albumWithPhotos }/>
      <IconButton 
        className='album__button album__button--delete'
        onClick={ deleteAlbum }
       >
        <DeleteForever fontSize='medium' sx={{ color: 'var(--black-color)' }}/>
       </IconButton>
    </Box>
  ) : (
    <Spinner message={'Loading your images...'} /> 
  )
}
export default Album