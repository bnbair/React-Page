// KindaCode.com
// src/App.js
import { useState,useEffect } from 'react';
import './AppJS.css';
import { useNavigate } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import image from "./img/Hero-Background-notecode@2x.png"; 
import file from "./md/posts.md";
import ReactMarkdown from 'react-markdown';
// Define MobileMenu component
const MobileMenu = () => {
  return (
  
  
  
    <div className={'mobile-menu'}>
      <a href='#home'>Home</a>
      <a href='#news'>News</a>
      <a onClick={() => navigate("/appo")}>Shop</a> 
      <a onClick={() => navigate("/contact")}>Go to Contact</a>
      <a href='#about'>About</a>
      <a href='#privacy'>Privacy Policy</a>
    </div>
  );
};
 //
function Home() {
  const [isShown, setIsShown] = useState(false);
  const toggleMobileMenu = () => {
    setIsShown(!isShown);
  };
const navigate = useNavigate();





 const divStyle = {
    width: '100%',
    height: '100vh',
     backgroundImage:`url(${image})`,
    backgroundSize: 'cover',
	 margin: "30px", backgroundColor: 'orange' 
  };

const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(file)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);
  
  
  
  return (
    <>
	
	
	
	<div style={divStyle}>
	
      <div className='topnav'>
        {/* Your Logo/Brand here */}
        <div className='logo'>
          KINDA<span>CODE</span>
        </div>

        {/* Desktop Menu, which only appears on large screens */}
        <div className='menu'>
          <a href='#home' className='active-link'>
            Home
          </a>
          <a href='#news'>News</a>
          <a onClick={() => navigate("/appo")}>Shop</a> 
<a onClick={() => navigate("/contact")}>Go to Contact</a>
          <a href='#about'>About</a>
        </div>

        {/* This button only shows up on small screens. It is used to open the mobile menu */}
        <button className='show-mobile-menu-button' onClick={toggleMobileMenu}>
          &#8801;
        </button>
      </div>

      {/* The mobile menu and the close button */}
      {isShown && <MobileMenu />}
      {isShown && (
        <button className='close-mobile-menu-button' onClick={toggleMobileMenu}>
          &times;
        </button>
      )}

      {/* Dummy content */}
      <div className='content'>
        <h2>Welcome to KindaCode.com</h2>
        <p>Responsive top navigation bar with React and pure CSS</p>
      </div>
	  
	  	  
	
	  <div style={divStyle}>
      <p>
        <Button variant="primary">Primary Button</Button>
      </p>
      <p>
        {" "}
        <Button variant="danger">Danger Button</Button>
      </p>
      <Alert variant="warning">This is a warning alert</Alert>
      <Alert variant="success">This is a success alert</Alert>
    </div>
	  
	   <ReactMarkdown children={markdown} />
	  
	  
	  </div>
	  
	  </>


 
            
  );
}

export default Home;