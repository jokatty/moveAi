/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useHistory } from 'react-router-dom';
import { ImageContext } from '../store.js';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function SessionSavedModal() {
  const history = useHistory();
  // get hold of global state
  const { store } = React.useContext(ImageContext);
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogOut = () => {
    document.cookie = 'loggedIn=false';
    setOpen(false);
    history.push('/');
  };
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleLogOut}>
              Log out
            </Button>
          </Toolbar>
        </AppBar>

        <h1> Your Session is saved successfully</h1>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {store.images.map((image, index) => (
            <ImageListItem key={index}>
              <img
                src={`${image}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt="imgname"
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>

      </Dialog>
    </div>
  );
}
// const itemData = [
//   { img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e' },
//   { img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d' },
// ];
