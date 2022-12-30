import { Box, Typography } from "@mui/material"

const NotHaveMessage = ({ variant='h1', message='forgot to add your message' }) => {
  return (
    <Box>
      <Typography variant={ variant } textAlign='center' sx={{ fontWeight: '800' }}>
        { message }
      </Typography>
    </Box>
  )
}
export default NotHaveMessage