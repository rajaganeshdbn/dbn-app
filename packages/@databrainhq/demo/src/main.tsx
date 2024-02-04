import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from './contexts/configContext';
import '@databrainhq/plugin/web';

// plugin is configured to point the current host
// export const selfHostedUrl = () =>
//   `${window.location.protocol}//${window.location.hostname}:3000`;
// window.dbn = {
//   baseUrl: import.meta.env.VITE_IS_SELFHOSTED ? selfHostedUrl() : '',
// };
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
