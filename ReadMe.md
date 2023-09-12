# A API REST WITH TYPESCRIPT, EXPRESS, ESLINT AND PRETTIER

## Installation

### Install Eslint

```javascript
npm i -D eslint
```

```javascript
npx eslint --init
```

choice :

- 1 : To check syntax and find problems, and enforce code style
- 2 : JavaScript modules (import/export)
- 3 : none of these of framework
- 4 : yes of typescript
- 5 : Node
- 6 : JSON
- 7 : choice npm || yarn

### Install Prettier and Dependencies

```javascript
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

 Modify file "***.eslint.json***"

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    // add Prettier in extends
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },

  "plugins": [
    "@typescript-eslint",
    // add Prettier in plugin
     "prettier"]
     ,
  "rules": {
    // add rules Prettier
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto",
        "singleQuote": true, // change double quote and single
        "semi": true // keep the ";"
      }
    ]
  }
}
```

### Configure Vscode

Configure Vscode to format automatically when saving the file

Create folder "***.vscode***" at the root
Create file "***settings.json***" in folder

Edit file :

```json
{
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.formatOnSave": false
  },
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```

automatically format when saving the file with "ctrl left + s"

### Install Typescript

```linux
npm i -D typescript ts-node @types/express @types/node @types/cors @types/helmet
```

a configuration file is created "tsconfig.json" at the root of the project

modify file :

```json
    "target" : "es2021"
```

```json
    "rootDir" : "./src" 
```

```json
    "outDir" : "./build"
```

### Start server & build

create file "nodemon.json" at the root of the project

```json
    {
    "watch": ["src"],
    "ext": ".ts",
    "ignore": [],
    "exec": "ts-node ./src/index.ts"
}
```

```json
    "dev": "tsc && node ./build/index.js",
    "start": "node ./build/index.js",
    "nodemon": "tsc && nodemon ./build/index.js",
```

### Install Options

- Jest for perform tests on queries

```linux
npm install --save-dev jest
```

```json
  {
    "scripts": {
      "test": "jest --notify --config=config.json"
    }
  }
 ```

Additional Configuration Using TypeScript

```linux
npm init jest@latest
```

```linux
npm install --save-dev @babel/preset-typescript @jest/globals
```

```javascript
  module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};
```

```json
npm i ts-jest -D
```

Create jest.config.js in your root dir

```json
module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}
```

Create folder "test"

Create file "sum.test.js"

```javascript
import {describe, expect, test} from '@jest/globals';
import {sum} from './sum';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});  
```

Running from command line

```linux
jest my-test --notify --config=config.json
or
npm run test
