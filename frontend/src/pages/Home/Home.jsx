import { Navigate, Route, Routes } from 'react-router-dom';

import { CreateAlbum, CreatePhoto, HomePage } from '..';
import { AppLayout } from '../../Layouts';

const Home = () => {

  return (
    <AppLayout>
      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='create-album' element={ <CreateAlbum /> } />
        <Route path='create-photo' element={ <CreatePhoto /> } />
       
        <Route path='*' element={ <Navigate to='/' /> } />
      </Routes>
    </AppLayout>
  )
  
}
export default Home