// App.tsx
import React, { useState, useEffect, useRef } from "react";

 
import "./App.css";
//import AnotherApp from './about/AnotherApp';
import { useNavigate } from "react-router-dom";

const PHOTO_URL =
  "https://www.kindacode.com/wp-content/uploads/2021/06/cute-dog.jpeg";

const Appo = () => {  const [isOpen, setIsOpen] = useState(false);
  // The content of the target box
  const [content, setContent] = useState<string>("Drop Something Here");
  const [term, setTerm] = useState('');
    const [text, setText] = useState("this text will be copied or cut");
const navigate = useNavigate();

// The back-to-top button is hidden at the beginning
  const [showButton, setShowButton] = useState(false);
  

const toggleDropdown = () => {
  setIsOpen(!isOpen);
}

  
  
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  // This function will scroll the window to the top 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  };


 // onCopy
  const copyHandler = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.currentTarget.style.border = '3px solid green';
  };

  // onCut
  const cutHandler = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.currentTarget.style.border = "3px solid orange";
    event.currentTarget.style.backgroundColor = "yellow";
    event.currentTarget.disabled = true;
    setText("you can no longer cut text here");
  };

  // onPaste
  const pasteHandler = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    event.currentTarget.style.border = "5px solid purple";
    event.currentTarget.style.backgroundColor = "orange";

    console.log(event.clipboardData.getData("text"));

    // Transform the copied/cut text to upper case
    event.currentTarget.value = event.clipboardData
      .getData("text")
      .toUpperCase();

    event.preventDefault();
  };







  // This function will be triggered when you start dragging
  const dragStartHandler = (
    event: React.DragEvent<HTMLDivElement>,
    data: string
  ) => {
    event.dataTransfer.setData("text", data);
  };
 
  // This function will be triggered when dropping
  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    setContent(data);
  };
  
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    // Do something 
    alert(term);
  }

  // This makes the third box become droppable
  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // the width of the indicator (which is orange in color)
  const [width, setWidth] = useState(0);

  // this ref will be used to connected with the main content section
  const contentRef = useRef<HTMLElement | null>(null);

  const scrollProgress = () => {
    // how far the user has scrolled down
    const scrollTop = document.documentElement.scrollTop;

    if (contentRef.current) {
      // the distance from the content section to the top of the page
      const contentOffsetTop = contentRef.current?.offsetTop;

      // the height of the content section
      const contentHeight = contentRef.current?.clientHeight;

      if (scrollTop - contentOffsetTop <= 0) {
        return setWidth(0);
      }

      if (scrollTop - contentHeight > contentHeight) {
        return setWidth(100);
      }

      setWidth(((scrollTop - contentOffsetTop) / contentHeight) * 100);
    }
  };

  // add event listener
  useEffect(() => {
    window.addEventListener("scroll", scrollProgress);
  }, []);
  
  
   const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  // Focus the name input when the app launches
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  // This function is triggered when the "Focus on Name" button is clicked
  const focusonName = () => {
    nameRef.current?.focus();
  }

  // This function is triggered when the "Focus on Email" button is clicked
  const focusonEmail = () => {
    emailRef.current?.focus();
  }

  
  



  return (
    
      <div>
        {/* The reading progress indicator bar */}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${width}%` }} />
        </div>
    
        <div className="container">
          <div
            className="box1"
            onDragStart={(event) => dragStartHandler(event, PHOTO_URL)}
            draggable={true}
          >
            <img src={PHOTO_URL} alt="Cute Dog" />
          </div>

          <div
            className="box2"
            onDragStart={(event) => dragStartHandler(event, "Kindacode.com")}
            draggable={true}
          >
            <h2>Kindacode.com</h2>
          </div>

          <div className="box3" onDragOver={allowDrop} onDrop={dropHandler}>
            {content.endsWith(".jpeg") ? <img src={content} /> : <h2>{content}</h2>}
          </div>
         
          <div>
            <form onSubmit={submitForm}>
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                type="text"
                placeholder="Enter a term"
                className="input"
              />
              <button type="submit" className="btn">Submit</button>
            </form>
          </div>
        </div>

        {/* Header */}
        <header>
          <h1>Header</h1>
          <h1>KindaCode.com</h1>
        </header>

        <main className="content" ref={contentRef}>
          {/* Just some dummy content */}
		  
		  
        <div className="box box--4">
		  
		  <button onClick={() => navigate(-1)}>Go Back</button>
          <h1 className="header">Content</h1>
          <h2>Kindacode.com</h2>
          <h1>Content</h1>
          <h2>Kindacode.com</h2>
          <h1>Content</h1>
          <h2>Kindacode.com</h2>
          <h1>Content</h1>
          <h2>Kindacode.com</h2>
          <h1>Content</h1>
          <h2>Kindacode.com</h2>	 
 </div>
 
      <h1>About Page</h1>
      <p>
        To go to the home page, you can use either the <b>blue back button</b>{' '}
        or the back button of the browser
      </p>
        </main>

  <div className="container">
      <h1>Kindacode.com</h1>
      <input ref={nameRef} type="text" className="input" placeholder="Name" />
      <input ref={emailRef} type="text" className="input" placeholder="Email" />

      <div className="btn-wrapper">
        <button onClick={focusonName} className="btn">Foucs on Name</button>
        <button onClick={focusonEmail} className="btn">Focus on Email</button> 
      </div>
    </div>
	
	
	  <div className="container">
      <h2>KindaCode.com</h2>
      <p>
        <input
          type="text"
          value={text}
          onCopy={copyHandler}
          onCut={cutHandler}
        />
      </p>
      <hr />
      <p>Paste things here:</p>
      <textarea onPaste={pasteHandler}></textarea>
    </div>
	
	<div className="containerbBelow">
        <div className="box box--1">
		
	
     <div>
    <button onClick={toggleDropdown}>
      Toggle Dropdown
    </button>
    {isOpen && <div className="dropdown-content">Content Here</div>}
  </div>
   
		
		</div>
        <div className="box box--2"></div>
        <div className="box box--3"></div>
        <div className="box box--4"></div>
        <div className="box box--5"></div>
      </div>

      {showButton && (
        <button onClick={scrollToTop} className="back-to-top">
          &#8679;
        </button>
      )}
      


         <footer>
          <h1>Footer</h1>
          <h1>KindaCode.com</h1>
          
        </footer>
      </div>
     
	

	
	
  );
};

export default Appo;
