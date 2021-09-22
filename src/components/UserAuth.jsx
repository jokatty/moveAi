/* eslint-disable jsx-a11y/control-has-associated-label */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import { useHistory } from 'react-router-dom';

// import LogIn from './LogIn.jsx';
// import SignUp from './SignUp.jsx';

export default function UserAuth() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();
  const userLoginReq = () => {
    setOpen(false);
    history.push('/login');
  };

  const userSignUpReq = () => {
    setOpen(false);
    history.push('/signup'); };
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Save My Session
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Optional sizes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{ display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content' }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <button type="button" onClick={userLoginReq}>Login</button>
              <button type="button" onClick={userSignUpReq}>Signup</button>
              {/* <LogIn />
              <SignUp /> */}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
