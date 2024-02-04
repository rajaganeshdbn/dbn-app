const baseConfig = require('./packages/@databrainhq/plugin/tailwind.config');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: true,
  prefix: 'dbn-',
  theme: baseConfig.theme,
  plugins: [],
};
