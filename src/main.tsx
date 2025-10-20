/**
 * Main Entry Point
 * 
 * This is the entry point of the React application. It initializes the React
 * application by mounting the root App component to the DOM element with id 'root'.
 * Uses React 18's createRoot API for optimal performance and StrictMode for
 * development-time checks.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

/**
 * Application initialization
 * 
 * Creates a React root and renders the App component wrapped in StrictMode.
 * StrictMode enables additional checks and warnings during development to help
 * identify potential problems in the application.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
