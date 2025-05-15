import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config({
  ignores: ['dist'],
}, {
  extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: {
      ...globals.browser,
      // vitest globals
      vi: true, test: true, describe: true, expect: true,
    },
    parserOptions: {
      project: ['tsconfig.node.json', 'tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {'react-hooks': reactHooks, 'react-refresh': reactRefresh},
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn', {allowConstantExport: true},
    ],
    'no-trailing-spaces': 'error', 'linebreak-style': ['error', 'unix'],
    'indent': ['warn', 2],
    'quotes': ['error', 'single'], 'semi': ['error', 'never'],
    'eqeqeq': 'error',
    'no-constant-condition': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error', {'argsIgnorePattern': '^_'},
    ],
  },
})
