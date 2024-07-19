import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa directamente
import App from './App.jsx';
import './index.css';

// Encuentra el elemento raíz en tu archivo HTML
const rootElement = document.getElementById('root');

// Crea la raíz y renderiza tu App
const root = createRoot(rootElement); // Uso actualizado de createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
