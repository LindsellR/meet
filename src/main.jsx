import * as atatus from 'atatus-spa';
atatus.config('0e60f1dd7a5b4a8b810f213bea29f028').install();
// atatus.setPage(window.location.pathname);

atatus.notify(new Error('Test Atatus Setup'));

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
