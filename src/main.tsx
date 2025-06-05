// src/main.tsx
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import '@/globals.css';
import { BootstrappedApp } from './BootstrappedApp';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BootstrappedApp />
  </StrictMode>
);
