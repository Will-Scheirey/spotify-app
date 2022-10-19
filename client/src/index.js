import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './navbar.css';
import GetApp from './App';
import { setImageSize } from './imageSize';
import { scrollStyles } from './scrollStyles';
import { NavBar } from './components/NavBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className="container">
    <h1>Loading the page...</h1>
  </div>
);
GetApp(root)
  .then((content) => {
    root.render(
      <div className="container">
        <NavBar />
        {content}
      </div>
    );
    setImageSize();
  })
  .then(() => {
    setImageSize();
  });

document.onscroll = scrollStyles;
