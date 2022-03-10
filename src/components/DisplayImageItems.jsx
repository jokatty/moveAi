import React, { useState, useContext, useEffect } from 'react';
import { Container } from '@mui/material';
import DisplayItems from './DisplayItems.jsx';
import { ImageContext } from '../store.js';
import UploadImageModal from './UploadImageModal.jsx';
import Image from './Image.jsx';
import NavBar from './NavBar.jsx';

export default function DisplayImageItems() {
  const alignStyle = { display: 'flex',
    justifyContent: 'center',
    alignItems: 'center' };
  const { store } = useContext(ImageContext);
  // local states
  const [items, setItems] = useState([]);
  const [uploadedImage, setUploadedImage] = useState([]);

  useEffect(async () => {
    setUploadedImage(store.images);
    setItems(store.items);
  }, [store]);

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '70px', marginBottom: '70px' }}>
        {uploadedImage.length !== 0 && <Image uploadedImage={uploadedImage} />}
        <div style={{ alignStyle }}>
          <UploadImageModal />
        </div>
        {items.length !== 0 && <DisplayItems items={items} />}
      </Container>
    </>
  );
}
