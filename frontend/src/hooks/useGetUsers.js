import { useEffect, useState } from 'react';
import { apiUser } from '../api/axios';

export const useGetUsers = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
    
            const { data } = await apiUser.get('/');

            const { users } = data; 

            setUsers ( users );
            
          } catch (error) {
              console.log('Error getting users',error)
          } 
        } 
        
        fetchData();

      }, []);

      return { 
        users,
      }
}