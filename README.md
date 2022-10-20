# Chainlink Solhint Rules

A set of Solhint rules for Chainlink's Solidity Style Guide.

[You can find a working Foundry example here](https://github.com/smartcontractkit/chainlink-solhint-rules-example).

## Install to a new project

```
npm init && npm install solhint solhint-plugin-chainlink-solidity@npm:@chainlink/solhint-plugin-chainlink-solidity --save
```

Create a `.solhint.json` in your root project directory:

```
{
  "extends": "solhint:recommended",
  "plugins": ["chainlink-solidity"],
  "rules": {
    "compiler-version": ["off", "^0.7.0"],
    "const-name-snakecase": "off",
    "constructor-syntax": "error",
    "var-name-mixedcase": "off",
    "func-visibility": [
      "error",
      {
        "ignoreConstructors": true
      }
    ],
    "max-line-length": ["error", 160],
    "not-rely-on-time": "off",
    "no-empty-blocks": "off",
    "quotes": ["error", "single"],
    "reason-string": [
      "warn",
      {
        "maxLength": 64
      }
    ],
    "chainlink-solidity/prefix-internal-functions-with-underscore": "warn",
    "chainlink-solidity/prefix-private-functions-with-underscore": "warn",
    "chainlink-solidity/prefix-storage-variables-with-s-underscore": "warn",
    "chainlink-solidity/prefix-immutable-variables-with-i": "warn",
    "chainlink-solidity/all-caps-constant-storage-variables": "warn",
    "chainlink-solidity/no-hardhat-imports": "warn",
    "chainlink-solidity/inherited-constructor-args-not-in-contract-definition": "warn",
    "chainlink-solidity/explicit-imports": "warn",
    "chainlink-solidity/no-require-statements": "warn",
    "chainlink-solidity/no-block-single-if-reverts": "warn"
  }
}
```

Add the following to your `package.json`:

```
  "scripts": {
    "solhint": "solhint --config .solhint.json \"src/*.sol\""
  },
```

Then, run:

```
npm solhint

src/Counter.sol
  4:1  warning  Internal function increment is not prefixed with underscore (_)  chainlink-solidity/prefix-internal-functions-with-underscore
  4:1  warning  Private / internal variable number is not prefixed with s_       chainlink-solidity/prefix-storage-variables-with-s-underscore
  8:9  warning  Use custom errors instead of revert statements                   chainlink-solidity/no-require-statements
  8:9  warning  Provide an error message for require                             reason-string
```

## Rules

| Rule Id                                                 | Description                                                                           |
|---------------------------------------------------------|---------------------------------------------------------------------------------------|
| `prefix-internal-functions-with-underscore`             | Naming convention                                                                     |
| `prefix-private-functions-with-underscore`              | Naming convention                                                                     |
| `prefix-storage-variables-with-s-underscore`            | Naming convention                                                                     |
| `prefix-immutable-variables-with-i`                     | Naming convention                                                                     |
| `all-caps-constant-storage-variables`                   | Naming convention                                                                     |
| `no-hardhat-imports`                                    | Leftover `hardhat/*.sol` imports not allowed                                          |
| `inherited-constructor-args-not-in-contract-definition` | Inherited contract constructor arguments should be specified in the constructor block |
| `explicit-imports`                                      | import {Foo} from 'Foo.sol'                                                           |
| `no-require-statements`                                 | Use custom errors instead                                                             |
| `no-block-single-if-reverts`                            | Omit curly braces for single-line guard clauses                                       |
