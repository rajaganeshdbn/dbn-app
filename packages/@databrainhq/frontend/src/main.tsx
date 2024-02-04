import ReactDOM from 'react-dom/client';
import { PluginProvider } from '@databrainhq/plugin';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PluginProvider>
    <App />
  </PluginProvider>
);
