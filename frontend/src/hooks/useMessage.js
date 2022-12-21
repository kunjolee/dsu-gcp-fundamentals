import { useSnackbar } from 'notistack';

export const useMessage = () => {

    const { enqueueSnackbar } = useSnackbar();

    return ( message, variant ) => {
        enqueueSnackbar(message, {
            variant,
            autoHideDuration: 2000,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        })  
    }
}