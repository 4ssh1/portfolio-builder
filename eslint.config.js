import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: "2022",
            sourceType: "module",
            globals: {
                console: "readonly",
                process: "readonly",
                Buffer: "readonly",
                __dirname: "readonly",
                __filename: "readonly",
                URL: "readonly",
                setTimeout: "readonly",
                setInterval: "readonly",
                clearTimeout: "readonly",
                clearInterval: "readonly"
            }
        },
        rules: {
            indent: ["error", 2, {switchCase: 1}],
            'linebreak-style': ["error", "unix"],
            quotes: ["error", "single"],
            semi: ["error", "always"],
            'no-unused-vars': ["error", {argsIgnorePattern: "^_"}],
            'no-console': "off",
            'prefer-const': "error",
            'no-var': "error",
            'object-shorthand': "error",
            'prefer-arrow-callback': "error",
        }
    },
    {
        files: ["**/*.js"],
    }
]