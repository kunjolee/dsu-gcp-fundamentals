import { useEffect, useState } from 'react';
import { api } from '../api/axios';

export const useGetPhotos = () => {

    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('token') || 'invalid token';
            
            console.log(import.meta.env.VITE_API_URL)

            const options = {
              headers: {
                token
              }
            }
    
            const { data } = await api.get('/photo', options);
            const { photos } = data; 
            
            setPhotos ( photos );
            
          } catch (error) {
              console.log('Error getting photos',error)
          } 
        } 
        
        fetchData();

      }, []);

      return { 
        photos,
      }
}