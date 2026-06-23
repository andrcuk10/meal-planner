import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/compat';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

// Emulate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  // 1. Ignore build artifacts and dependencies
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },
  
  // 2. Load the legacy Airbnb Base configurations using FlatCompat
  ...compat.extends('eslint-config-airbnb-base'),

  // 3. Apply TypeScript recommended rules to .ts files
  ...tseslint.configs.recommended,

  // 4. Custom rules for your Express TypeScript application
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json', // Path to your TypeScript config
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Turn on Prettier errors inside ESLint
      'prettier/prettier': 'error',
      
      // Node/Express specific overrides for typical backend architectures
      'no-console': 'warn',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'class-methods-use-this': 'off',
    },
  },

  // 5. Disable conflicting stylistic formatting rules via Prettier config
  configPrettier
);
