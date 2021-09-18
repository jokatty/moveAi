/* eslint-disable no-unused-vars */
import './App.css';
import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { ImageProvider } from './store.js';
import HomeScreen from './components/HomeScreen.jsx';
import DisplayImageItems from './components/DisplayImageItems.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <ImageProvider>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/display-items" exact component={DisplayImageItems} />
        </ImageProvider>
      </Switch>
    </Router>
    // <ImageProvider>
    //   <DisplayImageItems />
    // </ImageProvider>
  );
}

export default App;
