# Auth Axios Enhancer

Package provides a helper function to handle everything related to the authorization. Thanks to it, you can modify the `axios` instance to add the authorization header, and to handle the token refreshing.

The instance modified in this way may be used in the [`createHeseyaApiService` function](#api-service).

```ts
import axios from 'axios'
import { enhanceAxiosWithAuthTokenRefreshing } from '@heseya/store-core'

const axiosInstance = enhanceAxiosWithAuthTokenRefreshing(axios.create(), {
  heseyaUrl: 'https://api.example.com',
  getAccessToken: () => localStorage.get('accessToken'),
  getRefreshToken: () => localStorage.get('refreshToken'),
  setAccessToken: (token: string) => localStorage.set('accessToken', token),
  setRefreshToken: (token: string) => localStorage.set('refreshToken', token),
})
```

Modified axios will try to refresh the access token every time the request fails with the `401` response code. If token refreshing will succeed, the request will be retried, otherwise axios will throw original error.

::: tip
When token refreshing fails, not only the original error will be thrown, but also the `config.onTokenRefreshError` function will be called. You should use it to logout the user.
:::

## Config object

| Key                                | Description                                                                                                                                    |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `heseyaUrl`                        | URL of the Heseya API                                                                                                                          |
| `getAccessToken`                   | Function that returns the access token or a promise returning it                                                                               |
| `getRefreshToken`                  | Function that returns the refresh token or a promise returning it                                                                              |
| `setAccessToken`                   | Function that sets the access token                                                                                                            |
| `setRefreshToken`                  | Function that sets the refresh token                                                                                                           |
| `setIdentityToken`                 | Function that sets the identity token                                                                                                          |
| `onTokenRefreshError`              | Function that is called when token refreshing fails                                                                                            |
| `shouldIncludeAuthorizationHeader` | Function that should return `true` if the authorization header needs be included in the request. By default it's being added to every request. |
