/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
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

export default function UploadImageModal() {
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
    const response = await getDataFromImage(selectedFile);
    console.log('response in modal', response);
    // await dispatch(getItemsAction(response));
    await dispatch(getItemsAction(response.items));
    // const localImageUrl = URL.createObjectURL(selectedFile);
    // await dispatch(storeImagesAction(localImageUrl));
    await dispatch(storeImagesAction(response.gcsUri));
  }
  // redirect to the display image and items
  const history = useHistory();
  function handleSaveChange() {
    history.push('/display-items');
    handleClose();
  }
  return (
    <div>
      <Button variant="contained" size="medium" onClick={handleClickOpen} startIcon={<UploadFileIcon />}>
        Upload Image
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Upload an image
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {/* <input type="file" onChange={readImages} /> */}
          <Button
            variant="outlined"
            component="label"
            className="upload"
          >
            Select File
            <input
              type="file"
              hidden
              onChange={readImages}
            />
          </Button>
          {/* <button type="button" onClick={handleClick}>upload</button> */}

          <Button variant="contained" size="small" onClick={handleClick} className="upload">
            Upload
          </Button>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSaveChange}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
