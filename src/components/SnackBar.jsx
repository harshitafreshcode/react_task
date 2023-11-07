// imports
import MuiSnackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { addAlert } from '../store/slices/alerts';

const SnackBar = ({ status }) => {
    const dispatch = useDispatch();
    if (!status) return;

    const onClose = () => {
        dispatch(addAlert(null));
    }

    return (
        <MuiSnackbar
            autoHideDuration={6000}
            open={true}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            onClose={onClose}
        >
            <Alert severity={status.severity} sx={{ width: '100%' }}>
                {status.message}
            </Alert>
        </MuiSnackbar>
    );
};

export default SnackBar;
