import { useEffect, useState } from 'react';
import { api } from '../api/axios';

export const useGetAlbumsWithPhoto = (id) => {


    const [albumWithPhotos, setAlbumWithPhotos] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
            
        try {
            const token = localStorage.getItem('token');
            const options = {
            headers: {
                token
            }
            }

            const { data } = await api.get(`/album/${ id }`, options);
            setAlbumWithPhotos( data.albums )
            
        } catch (error) {
            console.log('error getting the album with its photos', error)
        } 
        };

        fetchData();

  }, [id]);

      return { 
        albumWithPhotos
      }
}