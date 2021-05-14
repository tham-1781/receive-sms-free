module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    'no-console': 'warn',
    'func-names': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
  },
};
