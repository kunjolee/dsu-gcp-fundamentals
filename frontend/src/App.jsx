import { Navigate, Route, Routes } from 'react-router-dom';

import { Login, Register, Home } from './pages';
import { PrivateRouter } from './components'

const App = () => {

  return (
    <>
      <Routes>
        <Route element={ <PrivateRouter /> }>
          <Route path='/' element={ <Home /> } />
        </Route>

        <Route path='login' element={ <Login /> } />
        <Route path='register' element={ <Register /> } />
        <Route path='/*' element={ <Navigate to='login'/>}/>
      </Routes>
    </>
  )
}
export default App