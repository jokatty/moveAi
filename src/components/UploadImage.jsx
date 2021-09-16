import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayItems from './DisplayItems.jsx';
// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';
console.log(REACT_APP_BACKEND_URL);

export default function UploadImage() {
  const [selectedFile, setSelectedFile] = useState('');
  const [items, setItems] = useState([]);
  const [uploadedImage, setUploadedImage] = useState('');
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
    setUploadedImage(URL.createObjectURL(selectedFile));
    console.log(uploadedImage);
    const postedData = await axios.post('http://localhost:3004/upload', formData);
    console.log(postedData.data);
    setItems(postedData.data);
  }

  useEffect(() => {
    console.log(uploadedImage);
  }, [uploadedImage]);

  return (
    <>
      <input type="file" onChange={readImages} />
      <button type="button" onClick={handleClick}>upload</button>
      <br />
      {uploadedImage !== '' && <img src={uploadedImage} alt="uploadedImage" />}
      {items.length !== 0 && <DisplayItems items={items} />}
    </>
  );
}
