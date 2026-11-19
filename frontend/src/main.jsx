import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import './style.css';

// Mount the app in the HTML root; StrictMode helps surface unsafe effects during development
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);