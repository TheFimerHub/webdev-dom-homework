import js from '@eslint/js'
import prettier from 'eslint-config-prettier'

export default [
    {
        ...js.configs.recommended,
        languageOptions: {
            globals: {
                document: 'readonly',
                window: 'readonly',
            },
            ecmaVersion: 2021,
            sourceType: 'module',
        },
        rules: {
            semi: ['error', 'never'],
            quotes: ['error', 'single'],
        },
    },
    prettier,
]
