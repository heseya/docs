# Introduction

[![NPM version](https://img.shields.io/npm/v/@heseya/store-vue)](https://www.npmjs.com/package/@heseya/store-vue) &nbsp;
![Downloads](https://img.shields.io/npm/dt/@heseya/store-vue) &nbsp;

This package provides set of ready to use Vue components and utilities for creating e-commerce applications using _Heseya_ solution. Package is based on [@heseya/store-core](../js-sdk/index.md) package/

## Instalation

:::tip
You don't need to install [@heseya/store-core](../js-sdk/index.md) package, it is already included in this package. But it can be useful if you want to use some of the core utilities.
:::

You can install the package by running the following command:

:::: code-group
::: code-group-item YARN

```bash
yarn install @heseya/store-vue
```

:::
::: code-group-item NPM

```bash
npm i @heseya/store-vue
```

:::
::::

## Components

TODO

## Config object

You can import and modify the config object that is being used in the package. This allows you to change the default settings for the SDK. They are mainly used by the `@heseya/store-vue` built-in components, but it is recommended to use them as well.

```ts
import { config } from '@heseya/store-vue'

config.formatAmount = (amount: number) => {
  return amount.toFixed(2)
}
```

## Config object properties

| Property       | Default value | Description                                       |
| -------------- | ------------- | ------------------------------------------------- |
| `formatAmount` | `[function]`  | Method used to format all the prices in the store |
