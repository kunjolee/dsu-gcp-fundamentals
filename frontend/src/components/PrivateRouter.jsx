import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Outlet, useNavigate } from 'react-router-dom';
import { api } from '../api/axios';
import { AppLayout } from '../Layouts/';
import { setLogin } from '../store/slices/auth';

const PrivateRouter = () => {

    const { auth } = useSelector(( state) => state.auth );
    const dispatch = useDispatch();
    const navigate = useNavigate('/login');

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                let token = localStorage.getItem('token') || 'invalid token';
        
                const options = {
                    headers: {
                        token
                    }
                }
        
                const { data } = await api.get('/auth/verify', options);
                
                localStorage.setItem('token', data.token );
                dispatch( setLogin( data ) );
            } catch (error) {
                localStorage.removeItem('token');
                navigate('/login');
                console.log('error verifying authentication', error);
            }
        }

        verifyAuth();
    }, []);

    return auth && (
        <AppLayout>
            <Outlet />
        </AppLayout>
    ) 
}
export default PrivateRouter