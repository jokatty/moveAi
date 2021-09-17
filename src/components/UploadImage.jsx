import React, { useState, useContext } from 'react';
import axios from 'axios';
import DisplayItems from './DisplayItems.jsx';
import { addItemsAction, ImageContext } from '../store.js';
// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';
console.log(REACT_APP_BACKEND_URL);

export default function UploadImage() {
  const { dispatch } = useContext(ImageContext);
  const [selectedFile, setSelectedFile] = useState('');
  const [items, setItems] = useState([]);
  const [uploadedImage, setUploadedImage] = useState([]);
  async function readImages(e) {
    const image = e.target.files[0];
    setSelectedFile(image);
  }
  async function handleClick(e) {
    e.preventDefault();
    // create a form data object
    const formData = new FormData();
    formData.append('image', selectedFile);
    console.log(formData);
    const localImageUrl = URL.createObjectURL(selectedFile);
    setUploadedImage([...uploadedImage, localImageUrl]);
    console.log('uploaded image', uploadedImage);
    const postedData = await axios.post('http://localhost:3004/upload', formData);
    console.log(postedData.data);
    setItems([...postedData.data]);
    dispatch(addItemsAction(postedData.data));
  }

  return (
    <>
      <input type="file" onChange={readImages} />
      <button type="button" onClick={handleClick}>upload</button>
      <br />
      {uploadedImage.length !== 0 && uploadedImage.map((image) => (
        <img src={image} alt="uploadedImage" />
      ))}
      {items.length !== 0 && <DisplayItems items={items} />}
    </>
  );
}
