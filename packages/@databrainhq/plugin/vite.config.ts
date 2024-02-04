import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    react(),
    cssInjectedByJsPlugin({
      injectCodeFunction: (cssCode) => {
        try {
          if (typeof document != 'undefined') {
            const elementStyle = document.createElement('style');
            elementStyle.innerHTML = cssCode;
            elementStyle.setAttribute('id', 'dbn-styles');
            document.head.appendChild(elementStyle);
          }
        } catch (e) {
          console.error('vite-plugin-css-injected-by-js', e);
        }
      },
    }),
    tsconfigPaths(),
  ],
  build: {
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/webcomponents.ts'),
      name: 'DbnWeb',
      formats: ['es', 'umd'],
      fileName: (format) => `webcomponents.${format}.js`,
    },
  },
});
