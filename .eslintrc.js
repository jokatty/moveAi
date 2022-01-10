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
  'react/prop-types': 'warn',
  'no-shadow': 'warn',
  'arrow-parens': 'warn',
  'object-curly-newline': ['error', { multiline: false }] } };
