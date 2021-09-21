/* eslint-disable no-unused-vars */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useHistory } from 'react-router';
import { createUser } from '../store.js';
import SessionSavedModal from './SessionSavedModal.jsx';

export default function LogIn() {
  // local states for input fields
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(true);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const history = useHistory();
  const handleClose = () => {
    setOpen(false);
    history.push('/display-items');
  };
  const handleSignUp = async () => {
    console.log('handle signup is triggred.');
    const response = await createUser(userName, email, password);
    console.log('signup response', response);
    setOpen(false);
    history.push('/saved-session');
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Sign up
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create an account with us.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => { setUserName(e.target.value); }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => { setEmail(e.target.value); }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => { setPassword(e.target.value); }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSignUp}>Sign up</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
