/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/require-default-props */

import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Alert, CircularProgress } from '@mui/material';
import { getDataFromImage, storeImagesAction, getItemsAction, ImageContext } from '../store.js';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({ '& .MuDialogContent-root': { padding: theme.spacing(2) },
  '& .MuDialogActions-root': { padding: theme.spacing(1) } }));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = { children: PropTypes.node,
  onClose: PropTypes.func.isRequired };

export default function UploadImageModal({ homepage }) {
  //  show message if vision response comes empty
  const [show, setShow] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  React.useEffect(() => {
    if (!errMsg) {
      setShow(false);
      return;
    }
    setShow(true);
    const timeId = setTimeout(() => {
      setShow(false);
    }, 7000);
    return () => clearTimeout(timeId);
  }, [errMsg]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // upload image logic
  const [selectedFile, setSelectedFile] = useState('');
  const { dispatch } = useContext(ImageContext);
  async function readImages(e) {
    const image = e.target.files[0];
    setSelectedFile(image);
  }
  async function handleClick() {
    // show the loading spinner
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 5000);
    const response = await getDataFromImage(selectedFile);
    await dispatch(getItemsAction(response.items));
    if (response.items.length !== 0) {
      await dispatch(storeImagesAction(response.gcsUri));
    }
    else {
      setErrMsg(true);
    }
  }
  // redirect to the display image and items
  const history = useHistory();
  function handleSaveChange() {
    history.push('/display-items');
    handleClose();
  }
  return (
    <div>
      {homepage === 'true'
        ? (
          <Button variant="contained" size="medium" style={{ backgroundColor: '#1C1464', height: '60px', width: '380px', fontSize: '1.5rem' }} onClick={handleClickOpen} startIcon={<UploadFileIcon style={{ fontSize: 50 }} />}>
            Upload Image
          </Button>
        ) : (
          <Button variant="contained" size="medium" style={{ backgroundColor: '#1C1464' }} onClick={handleClickOpen} startIcon={<UploadFileIcon />}>
            Upload Image
          </Button>
        )}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Upload an image
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ height: 100, width: 350 }}>
          <Button
            variant="outlined"
            component="label"
            className="upload"
            sx={{ mr: 7, mt: 4, width: 200 }}
          >
            Select File
            <input
              type="file"
              hidden
              onChange={readImages}
            />
          </Button>

          <Button variant="contained" size="small" onClick={handleClick} className="upload" sx={{ mt: 4 }}>
            Upload
          </Button>

        </DialogContent>
        {show ? <Alert severity="error">Sorry, vision api response is empty. Please try again!</Alert> : null}
        {load ? <CircularProgress color="success" /> : null}
        {load ? <p>sending request...</p> : null}
        <DialogActions>
          <Button autoFocus onClick={handleSaveChange}>
            View image content
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
