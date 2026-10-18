import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Analytics } from "@vercel/analytics/react";

// Run once per page load, outside React's StrictMode effect lifecycle.
if (import.meta.env.PROD) {
  fetch('/api/logger', { cache: 'no-store', keepalive: true }).catch(() => {
    // A failed analytics request should not interrupt the portfolio.
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
)
