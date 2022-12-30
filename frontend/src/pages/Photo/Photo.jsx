import { InfoOutlined, SentimentVeryDissatisfied } from "@mui/icons-material";
import { Box, Button, InputAdornment, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { api } from "../../api/axios";
import { NotHaveMessage, Spinner, UserImage } from "../../components";
import { useGetAlbums } from "../../hooks/useGetAlbums";
import { useMessage } from "../../hooks/useMessage";

import './Photo.css';

const Photo = ({ photo }) => {


    const [loading, setLoading] = useState(false);
    const { albums, idAlbum, setIdAlbum } = useGetAlbums();
    const showMessage = useMessage();

    const handleChange = ({ target }) => {
        const { value } = target; 
        setIdAlbum(value)
    }

    const onSave = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || 'invalid token';

        const options = {
            headers: {
                token
            }
        }

        const body = {
            idAlbum,
            idPhoto: photo?.id
        }
        
        try {
            setLoading( true );
            const { data } = await api.post('/photo/add-to-album', body, options );
            showMessage( data.msg, 'success' );
            
        } catch (error) {
            console.log('error save photo to album', error);
            const message = error.response.data.msg || 'Server error - contact your admin';
            showMessage(message, 'error')
            
        } finally {
            setLoading( false )
        }
    }
    

    return (
        <form className='photo-page' onSubmit={ onSave }>
            <Box className='photo-page__thumbnail'>
                <img src={ photo?.url } alt='photo-thumbnail' />
            </Box>
            <Box className='photo-page__container'>
                <Typography variant='h2' sx={{ fontWeight: 800, mb: '1rem', fontSize: '30px' }} >
                    Add your photo to an album!
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <InfoOutlined sx={{ mr: 1 }} />
                    <p className='photo-page__description'>
                        { photo?.description }
                    </p>
                </Box>
                <UserImage />
                <Button 
                    variant='contained'
                    color='secondary'
                    type='submit'
                    sx={{ margin: '1.5rem 0 .5rem' }}
                    disabled={ albums.length < 1 }
                >
                    Add to album
                </Button>
                {
                    albums.length > 0 ? (
                        <TextField
                            fullWidth
                            select
                            color='secondary'
                            label='Albums'
                            name='album'
                            onChange={ handleChange }
                            value={ idAlbum }
                            InputProps={{
                                startAdornment:(
                                    <InputAdornment position='start'>
                                        <InfoOutlined />
                                    </InputAdornment>
                                )
                            }}
                            sx={{ mt: 3}}
                        >
                            {
                                albums.map( album => (
                                    <MenuItem key={ album.id } value={ album.id }>
                                        { album.name }
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    ) : (
                        <Box padding='16px' display='flex' flexDirection='column' alignItems='start'>
                            <NotHaveMessage variant='subtitle2' message={"You don't have albums"} />
                            <SentimentVeryDissatisfied fontSize='large' />
                        </Box>
                    )
                }
                {
                    loading && <Spinner message={ 'Saving your data...' } />
                }
            
            </Box>
        </form>
    )
}
export default Photo