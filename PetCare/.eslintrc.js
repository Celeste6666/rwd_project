module.exports = {
  root: true,
  extends: 'airbnb-base',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': 'webpack',
  },
  rules: {
    'import/extensions': [
      'warn',
      'ignorePackages',
      {
        '.js': 'never',
        '.scss': 'never',
      },
    ],
    'import/no-import-module-exports': ['warn', {
      exceptions: ['*.scss'],
    }],
    'import/no-unresolved': [1, { ignore: ['.scss$'] }],
  },
};
