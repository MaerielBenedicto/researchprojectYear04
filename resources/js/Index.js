import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.css'
// import './css/index.css';
import App from './views/App';
// import 'jquery/dist/jquery.js'
// import 'popper.js/dist/umd/popper.js'
import 'bootstrap/dist/js/bootstrap.js'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />    
    </BrowserRouter>
</React.StrictMode>,
    document.getElementById('root')
  );
  