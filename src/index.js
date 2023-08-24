import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import Nav from './Nav';
import NewPost from './Components/NewPost'
import { BrowserRouter } from 'react-router-dom';
import './Styles/index.css'


import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';

ReactDOM.render(
  <React.StrictMode>
    {/* <newPost /> */}
    <BrowserRouter>
      <App />
      {/* <NewPost /> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(sendToVercelAnalytics);
