import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {} from 'react-router'
import { BrowserRouter } from 'react-router-dom';
import { getUsersFromDb } from './service/userService';

(function() {
  getUsersFromDb();
})();
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
