import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import htmlPluginOpt from './src/html-configs';
import htmlPlugin from 'vite-plugin-html-config';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/demo/',
  plugins: [react(), htmlPlugin(htmlPluginOpt)],
});
