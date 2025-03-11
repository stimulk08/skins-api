const packageJson = require('./package.json');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'import',
    'simple-import-sort',
    'unused-imports',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'dist/', 'node_modules/', '*.md'],
  settings: {
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@apps': './src/apps',
          '@core': './src/core',
          '@libs': './src/libs',
          '@common': './src/common',
          '@test': './src/test',
          '@src': './src',
        },
        extensions: ['.ts', '.js', '.jsx', '.dto'],
      },
    },
  },
  rules: {
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': 'off',
    'import/no-cycle': 2,
    'simple-import-sort/imports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    'simple-import-sort/exports': 'error',
    'import/newline-after-import': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true, // Игнорировать функциональные выражения
        allowHigherOrderFunctions: true, // Игнорировать функции высшего порядка
        allowIIFEs: true, // Игнорировать немедленно вызываемые функциональные выражения (IIFE)
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['.*'],
      },
    ],
    'prefer-const': 'error',
  },
  overrides: [
    {
      files: ['*.md'],
      rules: {
        // Отключаем все правила ESLint для файлов .md
        '*': 'off',
      },
    },
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Встроенные библиотеки
              ['^node:'],
              // Встроенные библиотеки (например, fs, path и т.д.)
              ['^\\w'],
              [
                ...Object.keys(packageJson.dependencies),
                ...Object.keys(packageJson.devDependencies),
              ].map(dependency => `^${dependency}*`),
              [''], // Пустая строка для разделения групп
            ],
          },
        ],
      },
    },
  ],
};
