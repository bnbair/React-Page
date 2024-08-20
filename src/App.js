// src/App.js
import React, { Component } from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Contact from "./Contact";
import Appo from "./Appo";
import Paper from "./Paper";
import News from './components/News';
import Login from './components/Login';
import GoogleLogin from './components/GoogleLoginComponent';


const App = () => {
  return (
    <div style={styles.app}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
		  <Route path="/appo" element={<Appo />} />
		   <Route path='/external-link' element={<RedirectPage />} />
		   <Route path="/paper" element={<Paper />} />
          <Route path="/news" element={<News />} />
		  <Route path="/login" element={<Login />} />
		  	<Route path="/GoogleLoginComponent" component={GoogleLogin} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;


// Redirect Page
const RedirectPage = () => {
  useEffect(() => {
    window.location.replace('https://www.kindacode.com');
  }, [])

  // Render some text when redirecting
  // You can use a loading gif or something like that
  return <div style={styles.container}>
    <h3>Redirecting...</h3>
  </div>
}




// Kindacode.com
// Just some styling
const styles = {
  app: {
    padding: 50,
  },
  
   link: {
    color: 'blue',
    textDecoration: 'underline'
  }
  
  
};