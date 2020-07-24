module.exports = {
  env: {
    node: true,
    commonjs: true,
    es6: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  rules: {
    'no-underscore-dangle':0
  },
};
