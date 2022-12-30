import { Box } from '@mui/material';
import { Sidebar, Navbar } from '../../components';

import './AppLayout.css'


const AppLayout = ({ children }) => {
  return (
    <main className='main'>
      <Sidebar /> 
      <Box className='app__layout' >
        <Navbar/> 
        <Box>
          { children }
        </Box>
      </Box>
    </main>
  )
}
export default AppLayout