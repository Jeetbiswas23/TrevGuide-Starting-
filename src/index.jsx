import { init } from '@emailjs/browser';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

// Initialize EmailJS with your public key
init("PyO7_rbCa9rxa0721");

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
