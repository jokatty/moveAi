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
import { Container, Alert } from '@mui/material';
import Cookies from 'universal-cookie';
import { ImageContext } from '../store.js';
import MessageGrid from './MessageGrid.jsx';

const cookies = new Cookies();

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function SessionSavedModal() {
  const [show, setShow] = React.useState(true);
  React.useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 6000);
    return () => {
      clearTimeout(timeId);
    };
  }, []);
  const history = useHistory();
  // get hold of global state
  const { store } = React.useContext(ImageContext);
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    history.push('/display-items');
  };
  const handleLogOut = () => {
    // document.cookie = 'loggedIn=false';
    cookies.set('loggedIn', 'false', { path: '/' });
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

        <Container>
          {show ? <Alert severity="success">Your Session is saved successfully!!!</Alert> : null}
          <ImageList cols={3}>
            {store.images.map((image) => (
              <ImageListItem>
                <img
                  src={image}
                // srcSet={image}
                  alt="imgname"
                  loading="lazy"
                  style={{ width: '500px', height: '350px' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
          <p>
            cost is:
            {store.cost.minCost}
            {' '}
            and
            {store.cost.maxCost}
          </p>
          <MessageGrid message={`Min cost: $${store.cost.minCost}K`} />
          <MessageGrid message={`Max cost: $${store.cost.maxCost}K`} />
        </Container>

      </Dialog>
    </div>
  );
}
// const itemData = [
//   { img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e' },
//   { img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d' },
// ];
