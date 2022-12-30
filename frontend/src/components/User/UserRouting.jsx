import { Navigate, Route, Routes } from "react-router-dom"
import { useGetUsers } from "../../hooks";
import { UserProfile } from "../../pages";
import { createSlug } from "../../utils";
import { Spinner } from '..'

const UserRouting = () => {
    const { users } = useGetUsers();

    if (users.length === 0) return <Spinner message={'Loading user profile'} />

    return (
        <Routes>
            {
                users.length > 0 && users?.map( user => (
                    <Route 
                        key={user.id}  
                        path={`/${createSlug( user?.name )}` } 
                        element={ <UserProfile /> } 
                    />
                    
                ))
            }
            <Route path='*' element={ <Navigate to='/' /> } />
        </Routes>
    )
}
export default UserRouting