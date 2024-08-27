// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Discipline from './components/Discipline'; // Import the Discipline component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
  <React.StrictMode>
    <Discipline />
  </React.StrictMode>,
  document.getElementById('root')
);
