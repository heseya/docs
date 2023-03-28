# Config object

You can import and modify the config object that is being used in the package. This allows you to change the default settings for the SDK. They are mainly used by the `@heseya/store-vue` package, but it is recommended to use them as well.

```ts
import { config } from '@heseya/store-core'

config.cartItemLifeDuration = 0
```

## Config object properties

| Property               | Default value            | Description                                                                              |
| ---------------------- | ------------------------ | ---------------------------------------------------------------------------------------- |
| `cartItemLifeDuration` | `604 800 000` (one week) | The duration of time in seconds that a cart item is kept in the browser's local storage. |
| `formatAmount`         | `[function]`             | Method used to format all the prices in the store                                        |
