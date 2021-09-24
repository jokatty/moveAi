/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import UploadImageModal from './UploadImageModal.jsx';
import NavBar from './NavBar.jsx';
import './HomeScreen.css';

const useStyles = makeStyles((theme) => ({ containerStyle: { margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '8vh' },
uploadBtn: { alignItems: 'center', textAlign: 'center', marginTop: '2vh' } }));

export default function HomeScreen() {
  const classes = useStyles();
  return (
    <>
      <NavBar />
      <Container className={classes.containerStyle}>
        <Typography variant="h3" style={{ fontFamily: 'Roboto Mono', color: '#476072', textAlign: 'center', lineHeight: 1.2 }}>Know the cost of  your relocation.</Typography>
        <div className={classes.uploadBtn}>
          <UploadImageModal homepage="true" />
        </div>
      </Container>
    </>
  );
}
