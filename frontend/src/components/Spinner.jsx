import { Box } from "@mui/material";
import { TailSpin } from "react-loader-spinner";

const Spinner = ({ message }) => {
  return (
    <Box 
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
    >
      <TailSpin color="var(--main-color)" height={50} width={200} className="m-5" />
      <p style={{ color: 'var(--text-color)', marginTop: '1rem'}}>{message}</p>
    </Box>
  );
};
export default Spinner;