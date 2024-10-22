import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx';
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); 


root.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-umff0vrcgvopf8c5.us.auth0.com'
      clientId='s6klbLwwDCMnvHJr4qThMgpL7ksryiw3'
      redirectUri={window.location.origin}
    >
    <App />
    </Auth0Provider>
  </React.StrictMode>,
  
  
);
