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
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function UserAuth() {
  const [open, setOpen] = React.useState(false);
  const userLoggedIn = cookies.get('loggedIn');
  console.log(typeof userLoggedIn);

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
      <Button variant="outlined" style={{ color: '#1C1464', margin: '25px' }} onClick={handleClickOpen}>
        Save My Session
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Login / Sign up </DialogTitle>
        <DialogContent>
          <DialogContentText>
            New user? signup to create an account.
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{ display: 'flex',
              flexDirection: 'row',
              m: 'auto',
              width: 'fit-content' }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <Button variant="contained" sx={{ mb: 3, width: '150px', backgroundColor: '#1C1464' }} onClick={userLoginReq}>Login</Button>
              <Button variant="contained" sx={{ backgroundColor: '#1C1464' }} onClick={userSignUpReq}>Sign up</Button>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sm={{ color: '#1C1464' }}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
