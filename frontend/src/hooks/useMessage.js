import { useSnackbar } from 'notistack';

export const useMessage = () => {

    const { enqueueSnackbar } = useSnackbar();

    return ( message, variant, time=2000 ) => {
        enqueueSnackbar(message, {
            variant,
            autoHideDuration: time,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        })  
    }
}