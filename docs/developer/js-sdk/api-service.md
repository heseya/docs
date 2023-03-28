# API Service

Primary functionality of the package is to easy the usage of the Heseya API. This can be done by creating an instance of the SDK and calling the methods on it.

[[toc]]

## Initialization

You can initialize the API Service by calling the `createHeseyaApiService` function. It is important to pass the `axios` instance to the function.

::: tip
Axios instance needs to be configured to use the URL of the Heseya API. Without it the SDK will not be able to make requests to the API.
:::

```ts
import axios from 'axios'
import { createHeseyaApiService, HeseyaApiService } from '@heseya/store-core'

const axiosInstance = axios.create({ baseURL: 'https://api.example.com' })

const heseya: HeseyaApiService = createHeseyaApiService(axiosInstance)
```

You can also create the API Service creating own Axios instance. To do this you can use the `createHeseyaApiService` function with the `baseURL` parameter containing the URL of the Heseya API.

::: warning
This is not recommended, as it is not possible to influence the Axios instance in any way.
Nethertheless, it could be good enough for use cases when you do not need to use, for example, authentication.
:::

```ts
import { createHeseyaApiService, HeseyaApiService } from '@heseya/store-core'

const heseya: HeseyaApiService = createHeseyaApiService('https://api.example.com')
```

Now, you can use the `HeseyaApiService` object to call the API for any of the endpoints.

For example, you can fetch all the products:

```ts
const products = await heseya.Products.get()
```

::: tip
All the methods on the `HeseyaApiService` object return promises. If the request fails, the promise will be rejected with an default `AxiosError` object. This package provides a helper function to handle that errors [`formatApiError`](#format-api-errors).
:::

## Available modules

The SDK provides a service for each of the available API endpoints. Each module has a typed methods to call the API.

- `Analytics`
- `Apps`
- `Auth`
- `Banners`
- `UserProfile`
- `Roles`
- `Users`
- `Products`
- `Schemas`
- `Tags`
- `ProductSets`
- `Warehouse`
- `Attributes`
- `Pages`
- `Sales`
- `Coupons`
- `Orders`
- `OrderStatuses`
- `ShippingMethods`
- `PackagesTemplates`
- `GlobalSeo`
- `PaymentMethods`
- `Settings`
- `Media`
- `Webhooks`
- `Consents`

## Authorization

The SDK does not provide any authorization. You need to implement your own authorization mechanism. To do this, you should use the `axios` instance that you injected into the `createHeseyaApiService` function. That instance needs to have interceptors configured to add the authorization header, as well as to handle the token refreshing.

There is a helper [`enhanceAxiosWithAuthTokenRefreshing` function](#auth-axios-enhancer) that addes all the necessary authorization headers to the Axios instance.

To handle auth requests you can use methods from the `Auth` module.

### Login

```ts
const user = await heseya.Auth.login({
  email: 'admin@example.com',
  password: 'admin',
})
```

### Refresh access token

```ts
// { user, accessToken, identityToken, refreshToken }
const data = await heseya.Auth.refreshToken(currentRefreshToken)
```

### Logout

```ts
await heseya.Auth.logout()
```

### Register new user

```ts
const user = await heseya.Auth.register({
  name: 'admin',
  email: 'admin@example.com',
  password: 'admin',
  consents: {},
})
```

### Check identity token

```ts
const user = await heseya.Auth.checkIdentity(identityToken)
```
