import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { initAnalytics } from '@/lib/analytics';

// Theme class is applied synchronously by the inline script in index.html
// (prevents a flash of the wrong theme). useTheme() takes over from there.
initAnalytics();

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
