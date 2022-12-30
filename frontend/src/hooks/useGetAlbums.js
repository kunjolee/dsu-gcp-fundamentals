import { useEffect, useState } from 'react';
import { api } from '../api/axios';

export const useGetAlbums = () => {

    const [albums, setAlbums] = useState([]);
    const [idAlbum, setIdAlbum] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          
          try {
            const token = localStorage.getItem('token') || 'invalid token';
      
            const options = {
              headers: {
                token
              }
            }
      
            const { data } = await api.get('/album', options);
            const { albums } = data; 
            setIdAlbum(albums[0]?.id);
            
            
            setAlbums( albums )
            
          } catch (error) {
            console.log('error getting the albums', error);
          }
        } 
        
        fetchData();

      }, []);

      return { 
        albums,
        idAlbum,
        setIdAlbum
      }
}