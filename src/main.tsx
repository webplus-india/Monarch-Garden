import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { VenueProvider } from './context/VenueContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VenueProvider>
      <App />
    </VenueProvider>
  </StrictMode>,
);
