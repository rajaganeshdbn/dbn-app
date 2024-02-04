module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'prettier', '@typescript-eslint'],
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
  ],
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: [
    'src/utils/generated',
    'src/utils/fetcher',
    'src/App.tsx',
    'src/main.tsx',
    'src/stories',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'prettier/prettier': ['error', { singleQuote: true, endOfLine: 'auto' }],
    'prefer-destructuring': 'off',
    'max-params': ['error', 3],
    'func-style': ['error', 'expression'],
    'import/no-namespace': 'error',
    'import/no-relative-parent-imports': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: 'types/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'consts/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'components/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'hooks/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'queries/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'helpers/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'fixtures/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'assets/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'styles/**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'import/no-anonymous-default-export': [
      'error',
      {
        allowArray: true,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowCallExpression: true, // The true value here is for backward compatibility
        allowLiteral: true,
        allowObject: true,
      },
    ],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/forbid-dom-props': ['error', { forbid: ['style'] }],
    'react/no-multi-comp': ['error', { ignoreStateless: true }],
    'react/jsx-pascal-case': ['error', { allowAllCaps: false }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],

    // Common abbreviations are known and readable
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-array-for-each': 'off',

    'unicorn/no-array-reduce': 'off',
    'unicorn/filename-case': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
      },
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      // Allow camelCase functions (23.2), and PascalCase functions (23.8)
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      // Airbnb recommends PascalCase for classes (23.3), and although Airbnb does not make TypeScript recommendations, we are assuming this rule would similarly apply to anything "type like", including interfaces, type aliases, and enums
      {
        selector: 'typeLike',
        format: ['StrictPascalCase'],
      },
    ],
    'react/forbid-elements': [
      'error',
      {
        forbid: [
          'button',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'p',
          'a',
          'input',
        ],
      },
    ],
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
    // '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/no-floating-promises': 'off',
    'import/prefer-default-export': 'off',
  },
};
