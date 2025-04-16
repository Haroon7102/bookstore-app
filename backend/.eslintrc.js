// .eslintrc.js
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended'],
    rules: {
        '@typescript-eslint/no-unsafe-call': 'off', // turn this off if it's blocking decorators
        '@typescript-eslint/no-unused-vars': 'warn',
    },
};
