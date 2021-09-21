import React, { useState, useContext, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Container } from '@mui/material';
import DisplayItems from './DisplayItems.jsx';
import { ImageContext } from '../store.js';
import UploadImageModal from './UploadImageModal.jsx';
// import UserAuth from './UserAuth.jsx';
import Image from './Image.jsx';
import NavBar from './NavBar.jsx';

const cookies = new Cookies();

export default function DisplayImageItems() {
  const userLoggedIn = cookies.get('loggedIn');
  console.log('cookie', userLoggedIn);
  const { store } = useContext(ImageContext);
  // local states
  const [items, setItems] = useState([]);
  const [uploadedImage, setUploadedImage] = useState([]);

  useEffect(async () => {
    console.log('use effect is running');
    setUploadedImage(store.images);
    setItems(store.items);
  }, [store]);
  console.log(store);

  return (
    <>
      <NavBar />
      <Container>
        {/* {uploadedImage.length !== 0 && uploadedImage.map((image) => (
        <img src={image} alt="uploadedImage" />
      ))} */}
        {uploadedImage.length !== 0 && <Image uploadedImage={uploadedImage} />}
        <UploadImageModal />
        {items.length !== 0 && <DisplayItems items={items} />}

        {/* {items.length !== 0 && <UserAuth />} */}
      </Container>
    </>
  );
}