# Introduction

[![NPM version](https://img.shields.io/npm/v/@heseya/store-core)](https://www.npmjs.com/package/@heseya/store-core) &nbsp;
[![Code Coverage](https://codecov.io/gh/heseya/sdk-core/branch/develop/graph/badge.svg)](https://codecov.io/gh/heseya/sdk-core) &nbsp;
![Downloads](https://img.shields.io/npm/dt/@heseya/store-core) &nbsp;

The JS SDK provides an intuitive and powerful interface for the _Heseya API_ from within your **browser or Node.js** application. The SDK uses [Axios](https://www.npmjs.com/package/axios) for transport, which could be customized to use authentication or other integrations.

::: tip
SDK is framework-agnostic, you can use it with Vue, React and any JS library you like!
:::

## Features

- All Heseya API endpoints are exposed as methods on the SDK object.
- Full typing of all API responses and requests, as well as for the all Heseya models and enums.
- Automatic conversion between JSON and native types.
- Automatic handling request query parameters.
- Support for custom [Axios](https://www.npmjs.com/package/axios) instance.
- Helper functions and class for handling common tasks when creating e-commerce applications.

## Instalation

You can install the package by running the following command:

:::: code-group
::: code-group-item YARN

```bash
yarn install @heseya/store-core
```

:::
::: code-group-item NPM

```bash
npm i @heseya/store-core
```

:::
::::
