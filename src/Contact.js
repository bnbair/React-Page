import React, { useEffect, useState } from "react";
import './Contact.css';
import { useNavigate } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import { Card } from 'reactstrap';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import image from "./img/Capture-16.png";

export const metadata = {
  title: "Upload your image",
  description: "Uploader image",
};

const Contact = (props) => {
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize the datepicker
    $(function() {
      $.datepicker.setDefaults({
        closeText: "Close",
        currentText: "Today",
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        nextText: "Next",
        prevText: "Previous",
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
        dateFormat: "yy-mm-dd",
        firstDay: 1,
        isRTL: false
      });
      $("#datepicker").datepicker({
        onSelect: function(dateText) {
          $("#selected-date").text("Selected date: " + dateText);
        }
      });
    });

    // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  const checkCapsLock = (event) => {
    if (event.getModifierState('CapsLock')) {
      setIsCapsLockOn(true);
    } else {
      setIsCapsLockOn(false);
    }
  };

  const photos = [
    { id: 'p1', title: 'Photo One', url: 'https://www.kindacode.com/wp-content/uploads/2022/08/1.png' },
    { id: 'p2', title: 'Photo Two', url: 'https://www.kindacode.com/wp-content/uploads/2022/08/2.png' },
    { id: 'p3', title: 'Photo Three', url: 'https://www.kindacode.com/wp-content/uploads/2022/08/3.jpg' },
    { id: 'p4', title: 'Photo Four', url: 'https://www.kindacode.com/wp-content/uploads/2022/08/4.jpg' },
    { id: 'p5', title: 'Photo Five', url: 'https://www.galvanizeaction.org/wp-content/uploads/2022/06/Wow-gif.gif' }
  ];

  const next = () => {
    setCurrentIndex((currentIndex + 1) % photos.length);
  };

  const prev = () => {
    setCurrentIndex((currentIndex - 1 + photos.length) % photos.length);
  };

  const handleToggle = () => {
    setIsOpenNav(!isOpenNav);
  };

  const RedirectPage = () => {
    window.location.href = 'https://www.kindacode.com';
    return <div><h3>Redirecting...</h3></div>;
  };

  return (
    <>   <div>
      <video className="video-background" autoPlay loop muted>
        <source src="https://worldsimseries.com/wp-content/uploads/wss-promo-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video></div>
      <div style={{ backgroundImage: `url(${image})` }}></div>
      <h1>Contact Page</h1>
      <nav className="navbar" aria-label="Main Navigation">
        <div className="navbar-logo">Logo Here</div>
        <ul className="navbar-links">

          <li><a href="/"><i className="home-icon"></i>Home</a></li>
		     <li><a href="/login">Login</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/page">Page</a></li>
          <li><a href="/news">News</a></li>
          <li><a onClick={() => navigate("/Paper")}>Shop</a></li>
        </ul>
        <button onClick={handleToggle}>
          {isOpenNav ? "Close Menu" : "Open Menu"}
        </button>
      </nav>
      <br />
      <button onClick={RedirectPage}>Redirect to KindaCode</button>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <div className='slider-container'>
        {photos.map((photo) => (
          <div key={photo.id} className={photos[currentIndex].id === photo.id ? 'fade' : 'slide fade'}>
            <img src={photo.url} alt={photo.title} className='photo' />
            <div className='caption'>{photo.title}</div>
          </div>
        ))}
        <button onClick={prev} className='prev'></button>
        <button onClick={next} className='next'></button>
      </div>
      <div className='dots'>
        {photos.map((photo) => (
          <span key={photo.id} className={photos[currentIndex].id === photo.id ? 'dot active' : 'dot'} onClick={() => setCurrentIndex(photos.indexOf(photo))}></span>
        ))}
      </div>
      <div style={{ margin: "30px" }}>
        <p><Button variant="primary">Primary Button</Button></p>
        <p><Button variant="danger">Danger Button</Button></p>
        <Alert variant="warning">This is a warning alert</Alert>
        <Alert variant="success">This is a success alert</Alert>
      </div>
      <div className='container'>
        <h3>Welcome to KindaCode.com</h3>
        <p>Turn on/off your Wi-Fi to see what happens</p>
        {isOnline ? <h1 className='online'>You Are Online</h1> : <h1 className='offline'>You Are Offline</h1>}
      </div>
      <div className='container'>
        <h3>KindaCode.com Example: Detect Caps Lock</h3>
        <p>If you focus on the input field and hit the Caps Lock key, a warning will show up</p>
        <input onKeyUp={checkCapsLock} type='text' placeholder='Enter some text here' className='input' />
        {isCapsLockOn && <p className='caps-lock-warning'>Warning: Caps Lock is ON</p>}
      </div>
      <div className='container'>
        <h3>Datepicker Example</h3>
        <input type="text" id="datepicker" placeholder="Select a date" />
        <div id="selected-date" style={{ marginTop: "10px" }}></div>
      </div>
      <Card>
        <h4>Greentech Innovation Group</h4>
        <p>The art of developing software using popular frameworks across the globe, such as ReactJS, VueJS, ExpressJS. Building mobile apps, Android apps, and desktop apps for productivity. Greentech Innovation Group is always ready for preserving nature via modern software development roles.</p>
      </Card>
    </>
  );
};

export default Contact;
