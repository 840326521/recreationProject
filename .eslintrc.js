module.exports = {
    "settings": { "react": { "version": "detect" } },
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "plugin:taro/all",
        "plugin:react/recommended",
        "standard"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {}
};