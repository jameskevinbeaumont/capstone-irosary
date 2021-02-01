import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Setting global variables for axios
//window.$R_API_KEY = '?api_key=';
window.$R_URL = 'http://localhost:8080/';
window.$R_ROSARY = 'api/rosary/';
window.$R_MYSTERY = 'mystery/';
window.$R_DETAIL = 'detail/';
window.$R_USER = 'user/';
window.$R_REGISTER = 'register/';
window.$R_LOGIN = 'login/';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);