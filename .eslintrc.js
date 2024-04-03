module.exports = {
  'env': {
    'browser': true,
    'amd': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'react/prop-types': 'off', // Disable react/prop-types rule
    'no-unused-vars': 'warn',
    'indent': ['error', 2], // Use 2 spaces for indentation
    'quotes': ['error', 'single'], // Use single quotes
    'semi': ['error', 'always'] // Require semicolons at the end of statements
  }
};
  