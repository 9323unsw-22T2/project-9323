import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2398735135051938"
     crossOrigin="anonymous"></script>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
  window.localStorage.removeItem('expert')
);
