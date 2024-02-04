import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import htmlPlugin from 'vite-plugin-html-config';
import htmlPluginOpt from './src/html-configs';
import pluginRewriteAll from 'vite-plugin-rewrite-all';
const path = require('path');

export default defineConfig(({ mode }) => {
  let plugins = [pluginRewriteAll(), react(), tsconfigPaths()];
  if (mode === 'production') {
    plugins.push(htmlPlugin(htmlPluginOpt));
  }
  let config = {
    define: {
      global: 'window',
    },
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../plugin/src'),
        '@src': path.resolve(__dirname, './src'),
        '@root': path.resolve(__dirname, '../plugin'),
      },
    },
  };
  return config;
});
