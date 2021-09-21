import React from 'react';
import { Container } from '@mui/material';
import UploadImageModal from './UploadImageModal.jsx';
import NavBar from './NavBar.jsx';

export default function HomeScreen() {
  return (
    <>
      <NavBar />
      <Container>
        <h1>Know the cost of  your relocation.</h1>
        <UploadImageModal />
      </Container>
    </>
  );
}
