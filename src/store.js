import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';

// object that represents all the data contained in the app.
export const initialState = { items: [], images: [], isUser: 'false', containers: { twentyFt: 0, fortyFt: 0 }, cost: { minCost: 0, maxCost: 0 } };

// actions that can be performed on the above data
const GET_ITEMS = 'GET_ITEMS';
const STORE_UPLOADED_IMAGES_LOCALLY = 'STORE_UPLOADED_IMAGES_LOCALLY';
const SET_USER = 'SET_USER';
const SET_CONTAINER = 'SET_CONTAINER';
const STORE_COST = 'STORE_COST';

// Reducer function for the actions
export function imageReducer(state, action) {
  switch (action.type) {
    case GET_ITEMS: {
      return { ...state, items: [...state.items, ...action.payload.items] };
    }
    case STORE_UPLOADED_IMAGES_LOCALLY: {
      return { ...state, images: [...state.images, action.payload.image] };
    }
    case SET_USER: {
      return { ...state, isUser: 'true' };
    }
    case SET_CONTAINER: {
      // change container size update logic in next version.
      return { ...state,
        containers: { twentyFt: action.payload.twentyFt, fortyFt: action.payload.fortyFt } };
    }
    case STORE_COST: {
      return { ...state,
        cost: { minCost: action.payload.minCost, maxCost: action.payload.maxCost } };
    }
    default:
      return state;
  }
}

// action creators
export function getItemsAction(items) {
  return { type: GET_ITEMS,
    payload: { items } };
}
export function storeImagesAction(image) {
  return { type: STORE_UPLOADED_IMAGES_LOCALLY,
    payload: { image } };
}

export function setUser(boolVal) {
  return { type: SET_USER,
    payload: boolVal };
}

export function storeContainerSizes(twentyFt, FortyFt) {
  return { type: SET_CONTAINER,
    payload: { twentyFt, FortyFt } };
}

export function storeCost(minCost, maxCost) {
  return { type: STORE_COST,
    payload: { minCost, maxCost } };
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
  const postedData = await axios.post(`${REACT_APP_BACKEND_URL}/upload`, formData);
  return postedData.data;
}

const cookies = new Cookies();

export async function createUser(userName, email, password) {
  const response = await axios.post(`${REACT_APP_BACKEND_URL}/signup`, { userName, email, password });

  if (response.status === 200) {
    cookies.set('loggedIn', 'true', { path: '/' });
  }
  return 'signup success';
}

export async function loginUser(email, password) {
  const response = await axios.post(`${REACT_APP_BACKEND_URL}/login`, { email, password });

  if (response.status === 200) {
    cookies.set('loggedIn', 'true', { path: '/' });
  }
  return 'success';
}
// Implement this logic in next version
export default function getWeight(totalLength, totalWidth, totalHeight) {
  //  this gives weight in kg
  const volumetricWeight = (totalLength + totalWidth + totalHeight) / 5000;
  return volumetricWeight;
}
