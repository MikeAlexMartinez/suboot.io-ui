module.exports = {
  "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "jest/globals": true,
  },
  "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
  ],
  "parserOptions": {
      "ecmaVersion": 2017,
      "ecmaFeatures": {
          "experimentalObjectRestSpread": true,
          "jsx": true
      },
      "sourceType": "module"
  },
  "plugins": [
      "react",
      "jest"
  ],
  "rules": {
      "indent": [
          "error",
          2,
          {
              "SwitchCase": 1
          }
      ],
      "linebreak-style": [
          "error",
          "unix"
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "always"
      ],
      "no-console": 0,
      "no-process-env": 0,
  },
  "globals": {
      __filename: true,
      __dirname: true,
      "process": true,
      "Enzyme": true,
  }
};