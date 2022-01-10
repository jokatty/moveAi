/* eslint-disable no-unused-vars */
import './App.css';
import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { ImageProvider } from './store.js';
import HomeScreen from './components/HomeScreen.jsx';
import DisplayImageItems from './components/DisplayImageItems.jsx';
import LogIn from './components/LogIn.jsx';
import SignUp from './components/SignUp.jsx';
import SessionSavedModal from './components/SessionSavedModal.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <ImageProvider>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/display-items" exact component={DisplayImageItems} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/saved-session" exact component={SessionSavedModal} />
        </ImageProvider>
      </Switch>
    </Router>
  );
}

export default App;
