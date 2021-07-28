import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import Grow from '@material-ui/core/Grow';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { hideMessage } from '../store/message/messageSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function SnackBarPopper() {
  	const dispatch = useDispatch();
	const state = useSelector(({ message }) => message);
    // const [open, setOpen] = useState(true);


  	// const handleClose = (event, reason) => {
    // 	if (reason === 'clickaway') {
    // 	  return;
    // 	}

    // 	setOpen(false);
  	// };

	if (!state.message) return null;

    return (
        <Snackbar 
            open={state.state} 
            autoHideDuration={6000} 
            onClose={() => dispatch(hideMessage())} 
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            TransitionComponent={Grow}
        >
            <SnackbarContent
				message={
					<div className="flex items-center">
						<Typography style={{fontSize: 16}} className="mx-8">{state.message}</Typography>
					</div>
				}
				action={[
					<IconButton key="close" aria-label="close" color="inherit" onClick={() => dispatch(hideMessage())}>
						<Icon>x</Icon>
					</IconButton>
				]}
			/>
        </Snackbar>
    )
}
