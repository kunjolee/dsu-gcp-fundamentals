import { Navigate, Route, Routes } from 'react-router-dom';
import { Login, Register, Home } from './pages';
import { AlbumRouting, PhotoRouting, PrivateRouter, UserRouting } from './components'

const App = () => {

  return (
    <>
      <Routes>
        <Route element={ <PrivateRouter /> }>
          <Route path='/*' element={ <Home /> } />
          <Route path='/album/*' element={ <AlbumRouting /> } />
          <Route path='/photo/*' element={ <PhotoRouting /> } />
        </Route>
        <Route path='/user/*' element={ <UserRouting /> } />
        <Route path='login' element={ <Login /> } />
        <Route path='register' element={ <Register /> } />
        <Route path='/*' element={ <Navigate to='login'/>}/>
      </Routes>
    </>
  )
}
export default App