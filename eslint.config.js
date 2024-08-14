module.exports = [
    {
        ignores: ['node_modules/**', 'dist/**'],
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: require('@typescript-eslint/parser'),
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: __dirname,
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
        },
        rules: {
            'quotes': ['error', 'single', { 'avoidEscape': true }],
        },
    },
];