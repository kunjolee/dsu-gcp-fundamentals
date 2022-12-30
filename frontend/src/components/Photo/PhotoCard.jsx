import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Card, CardMedia, IconButton } from '@mui/material';
import { LaunchOutlined, Favorite, FavoriteBorder, DeleteForever, Delete } from '@mui/icons-material';

import { useMessage } from '../../hooks/useMessage';
import { api } from '../../api/axios';

import './PhotoCard.css';


const PhotoCard = ({ photo }) => {

    const [controlState, setControlState] = useState(photo?.state);
    const navigate = useNavigate();
    const showMessage = useMessage();
    const idPhoto = photo.id || photo.idPhoto

    const changeState = async () => {

        const token = localStorage.getItem('token') || 'invalid token';
        const options = {
            headers: {
                token
            }
        }

        try {
            // 1 - it is already in favorite, we will remove it from favorites
            
            if (controlState) {                
                await api.put(`/photo/change-favorite/${ idPhoto }`, { state: 0 }, options);
                setControlState(0);

            // 0 - it not in favorite, we will add it to favorites
            }else {
                await api.put(`/photo/change-favorite/${ idPhoto }`, { state: 1 }, options);      
                setControlState(1);          
            }

        } catch (error) {
            console.log('Error change state in photoCard',error)
        }

        
    }

    const deletePhoto = async () => {
        const token = localStorage.getItem('token') || 'invalid token';
        const options = {
            headers: {
                token
            }
        }

        if (!confirm('Are you sure you want to delete this picture permanently?')) return;

        try {

            const { data } = await api.delete(`/photo/${idPhoto}`, options);

            showMessage(data.msg, 'success');

        } catch (error) {
            const message = error.response.data.msg || 'Error - contact your admin';
            showMessage(message, 'error', 4000);
            console.log('error delete photo', error);
        }
    }

    const removePhotoFromAlbum = async () => {
        const token = localStorage.getItem('token') || 'invalid token';
        const options = {
            headers: {
                token
            }
        }
        
        if (!confirm('Are you sure you want to remove this picture from the current album?')) return;
        try {
            const { data } = await api.delete(`/photo/remove-album/${ photo.AlbumDetailsId }`, options)
            showMessage(data.msg, 'success');
        } catch (error) {
            const message = error.response.data.msg || 'Error - contact your admin';
            showMessage(message, 'error', 4000);
            console.log('error remove photo from album',error);
        }
    }
 
    return (
        <Card 
            sx={{ m: '0 1rem 1rem' }} 
            className='photo__card'
        >
            <CardMedia
                component='img'
                image={ photo?.url }
                alt='photo'
            />
            <Box className='photo__items'>
                <IconButton 
                    className='photo__item photo__item--navigate'
                    onClick={ () =>  navigate(`/photo/${ idPhoto }`) }
                >
                    <LaunchOutlined fontSize='small' sx={{ color: 'var(--black-color)' }}/>
                </IconButton>
                <IconButton 
                    onClick={ changeState}
                    className='photo__item photo__item--favorite'
                >
                    {
                        controlState ? (
                            <Favorite 
                                fontSize='small' 
                                sx={{ color: 'var(--red-color)' }}                                     
                            /> 
                        ) : (
                            <FavoriteBorder 
                                fontSize='small' 
                                sx={{ color: 'var(--red-color)' }}                                    
                            />
                                                                
                        )
                    }
                    
                </IconButton>
                {
                    photo.AlbumDetailsId ? (
                        <>
                        <IconButton 
                            className='photo__item photo__item--delete'
                            onClick={ removePhotoFromAlbum }
                        >
                            <Delete fontSize='small' sx={{ color: 'var(--black-color)' }}/>
                        </IconButton>
                        </>
                    ) : (
                        <IconButton 
                            className='photo__item photo__item--delete'
                            onClick={ deletePhoto }
                        >
                            <DeleteForever fontSize='small' sx={{ color: 'var(--black-color)' }}/>
                        </IconButton>
                    )
                }
            </Box>
        </Card>
    )
}
export default PhotoCard