import React, { useState, useContext, useEffect } from 'react';
import DisplayItems from './DisplayItems.jsx';
import { ImageContext } from '../store.js';
import UploadImageModal from './UploadImageModal.jsx';

export default function DisplayImageItems() {
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
      <p>display image items page</p>
      {console.log('insideloop', store.items)}
      {uploadedImage.length !== 0 && uploadedImage.map((image) => (
        <img src={image} alt="uploadedImage" />
      ))}
      {items.length !== 0 && <DisplayItems items={items} />}
      <UploadImageModal />
    </>
  );
}
