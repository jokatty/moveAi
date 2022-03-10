module.exports = { env: { browser: true,
  es2021: true },
extends: [
  'plugin:react/recommended',
  'airbnb',
],
parserOptions: { ecmaFeatures: { jsx: true },
  ecmaVersion: 12,
  sourceType: 'module' },
plugins: [
  'react',
],

rules: { 'brace-style': 'off',
  'import/extensions': ['error', 'ignorePackages'],
  'import/no-extraneous-dependencies': 'off',
  'linebreak-style': 'off',
  'no-param-reassign': ['error', { props: false }],
  // 'react/prop-types': 'warn',
  'no-shadow': 'warn',
  'arrow-parens': 'warn',
  // newly added props
  'react/prop-types': 0,
  'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  // up till here
  'object-curly-newline': ['error', { multiline: false }] } };
