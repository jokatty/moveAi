/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { createContext, useReducer } from 'react';
import axios from 'axios';

// +++++============HANDLE IT SOON
// make sure that axios always sends the cookies to the backend server
// axios.defaults.withCredentials = true;
// const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';
// console.log(REACT_APP_BACKEND_URL);
// +++++++++======================

// object that represents all the data contained in the app.
export const initialState = { items: [], images: [] };

// actions that can be performed on the above data
const GET_ITEMS = 'GET_ITEMS';
const STORE_UPLOADED_IMAGES_LOCALLY = 'STORE_UPLOADED_IMAGES_LOCALLY';

// Reducer function for the actions
export function imageReducer(state, action) {
  switch (action.type) {
    case GET_ITEMS: {
      console.log('reducer is running in store. Pay load is:');
      console.log(action.payload.items);
      console.log({ ...state, items: [...state.items, ...action.payload.items] });
      return { ...state, items: [...state.items, ...action.payload.items] };
    }
    case STORE_UPLOADED_IMAGES_LOCALLY: {
      return { ...state, images: [...state.images, action.payload.image] };
    }
    default:
      return state;
  }
}

// action creators
export function getItemsAction(items) {
  console.log('getItemsAction clicked form store');
  return { type: GET_ITEMS,
    payload: { items } };
}
export function storeImagesAction(image) {
  return { type: STORE_UPLOADED_IMAGES_LOCALLY,
    payload: { image } };
}

// provider code
export const ImageContext = createContext(null);
const { Provider } = ImageContext;
export function ImageProvider({ children }) {
  const [store, dispatch] = useReducer(imageReducer, initialState);
  return <Provider value={{ store, dispatch }}>{children}</Provider>;
}

// callback functions:
export async function getDataFromImage(selectedFile) {
  const formData = new FormData();
  formData.append('image', selectedFile);
  console.log(formData);
  const postedData = await axios.post('http://localhost:3004/upload', formData);
  console.log(postedData.data);
  return postedData.data;
}

// extras=======
export default function getWeight(totalLength, totalWidth, totalHeight) {
  //  this gives weight in kg
  const volumetricWeight = (totalLength + totalWidth + totalHeight) / 5000;
  return volumetricWeight;
}
