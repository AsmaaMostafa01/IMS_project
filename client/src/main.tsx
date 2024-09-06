import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './style/style.scss';
import { Provider } from 'react-redux';
import App from './App';



ReactDOM.render(
  <StrictMode>
      <App />
  </StrictMode>,
  document.getElementById('root'),
);
