import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

export default {
  overrides: [
    {
      files: ['**/*.{js,mjs,cjs,jsx}'],
      languageOptions: {
        globals: {
          ...globals.browser,
          process: 'readonly', // Add process as a global
        },
      },
      extends: [
        pluginJs.configs.recommended,
        pluginReact.configs.flat.recommended,
      ],
      rules: {
        // Custom rules to ignore certain warnings/errors
        'no-undef': ['error', { typeof: true }], // Ensure 'process' is considered a global
        'no-unused-vars': [
          'warn',
          {
            vars: 'all',
            args: 'none', // Do not warn on unused function arguments like 'req' and 'res'
            ignoreRestSiblings: true,
          },
        ],
      },
    },
  ],
};
