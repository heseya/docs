# Webhooks

[[toc]]

## Basic

This is functionality that is responsible for communicating with other applications or services.
Webhooks are triggered for specific actions on the store side, for example,
you can configure a webhook to trigger when a new order is created,
after which detailed order information will be sent to the external application.

Webhook can be created by any user who has a `webhooks.add` permission,
but specific webhooks may require [additional permissions](#available-events).

### Sending process
Every send webhook follows this pattern:

- After trigger specific event is created suitable query and added to queue
- Executing each webhook from queue
- Time out is set for 4s.
- To let us know about successful delivery data we have to receive one of 2** HTTP code.
- If we receive other code we will retry request but max 3 times.
- Failed webhooks are logged in, and can be viewed in admin dashboard.

### Signature
Optionally, the API can send a hashed payload that can be used to verify the authenticity of the request.
To enable this feature, simply specify `secret` in the webhooks settings.
The hash is generated using the `HMAC` method with the `sha256` algorithm and will be sent in the `Signature` header.
To verify the signature you must hash the `payload` with the `sha256` algorithm.
and compare your hash with the one received in the request header.

## Secure webhooks
Some of our webhooks have fully encrypted payloads for security reasons - they can be found [here](#available-events).

This feature must be enabled by store administrator. Key is hidden in API files.
Additionally, this requires **SSL** and [Signature webhook](#signature-webhook).

### Decoding payload
To do that, you have to get `payload` string and provide that to *base64 decode* function
and then trim from beginning to length of `WEBHOOK_CIPHER` - keep that fragment it's important
for next step - that will be your *Initialization Vector*. With these strings trimmed strings
put them to [OpenSSL decode function](https://www.php.net/manual/en/function.openssl-encrypt.php)
with information about:
- Second part of trimmed string as `data`
- `WEBHOOK_CIPHER` as `cipher_algo`
- `WEBHOOK_KEY` as `passphrase`
- `OPENSSL_RAW_DATA` as `options`
- First part of trimmed string as `iv`

## Structure of webhook
Webhooks 

::: details 
```json5
{
   "event": "string",
   "data_type": "string",
   "triggered_at": "DateTime", // ISO 8601
   "issuer_type": "string", // enum - app | user
   "issuer": { // when issuer is user
      "id": "UUID",
      "email": "string",
      "name": "string",
      "avatar": "string",
   },
   "issuer": { // when issuer is app
      "id": "UUID",
      "url": "string",
      "microfrontend_url": "string",
      "name": "string",
      "slug": "string",
      "version": "string",
      "description": "string",
      "icon": "string",
      "author": "string",
   },
   "api_url": "string", // Store api URL
   "data": {},
}
```
:::

## Available events
::: details List of all events
\* - It means permission is required when webhook has set `with_hidden` to `true`

| Event                                                                       | Requirement permission                                                              | Payload                                                                                                                                                                                     | Encryption |
|-----------------------------------------------------------------------------|-------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|
| `OrderCreated`<br/>`OrderUpdated`<br/>`OrderUpdatedStatus`                  | `orders.show_details`<br/>`orders.show`                                             | <pre>WebHookEvent\<Order> & { data_type: 'Order' }</pre>                                                                                                                                    | `no`       |
| `OrderRequestedShipping`                                                    | `orders.show_details`<br/>`orders.show`<br/>`packages.show`                         | <pre>type ShippingRequest = {order: Order, package: Package}<br/><br/>WebHookEvent\<ShippingRequest> & { data_type: 'ShippingRequest' }</pre>                                               | `no`       |
| `ProductCreated`<br/>`ProductUpdated`<br/>`ProductDeleted`                  | `products.show`<br/>`products.show_details`<br/>`products.show_hidden`*             | <pre>WebHookEvent\<Product> & { data_type: 'Product' }</pre>                                                                                                                                | `no`       |
| `ItemCreated`<br/>`ItemUpdated`<br/>`ItemUpdatedQuantity`<br/>`ItemDeleted` | `items.show`<br/>`items.show_details`                                               | <pre>WebHookEvent\<Item> & { data_type: 'Item' }</pre>                                                                                                                                      | `no`       |
| `PageCreated`<br/>`PageUpdated`<br/>`PageDeleted`                           | `pages.show`<br/>`pages.show_details`<br/>`pages.show_hidden`*                      | <pre>WebHookEvent\<Page> & { data_type: 'Page' }</pre>                                                                                                                                      | `no`       |
| `ProductSetCreated`<br/>`ProductSetUpdated`<br/>`ProductSetDeleted`         | `product_sets.show`<br/>`product_sets.show_details`<br/>`product_sets.show_hidden`* | <pre>WebHookEvent\<ProductSet> & { data_type: 'ProductSet' }</pre>                                                                                                                          | `no`       |
| `UserCreated`<br/>`UserUpdated`<br/>`UserDeleted`                           | `users.show`<br/>`users.show_details`                                               | <pre>WebHookEvent\<User> & { data_type: 'User' }</pre>                                                                                                                                      | `no`       |
| `DiscountCreated`<br/>`DiscountUpdated`<br/>`DiscountDeleted`               | `discounts.show`<br/>`discounts.show_details`                                       | <pre>WebHookEvent\<Discount> & { data_type: 'Discount' }</pre>                                                                                                                              | `no`       |
| `LanguageCreated`<br/>`LanguageUpdated`<br/>`LanguageDeleted`               | `languages.show_hidden`*                                                            | <pre>WebHookEvent\<Language> & { data_type: 'Language' }</pre>                                                                                                                              | `no`       |
| `TfaInit`<br/>`TfaSecurityCode`                                             | `webhooks.tfa`                                                                      | <pre>type TfaCode = { security_code: string, user: User }<br/><br/>WebHookEvent\<TfaCode> & { data_type: 'TfaCode' }</pre>                                                                  | `yes`      |
| `TfaRecoveryCodesChanged`                                                   | `webhooks.tfa`                                                                      | <pre>WebHookEvent\<User> & { data_type: 'User' }</pre>                                                                                                                                      | `yes`      |
| `PasswordReset`                                                             | `webhooks.password`                                                                 | <pre>type PasswordRecovery = { recovery_url: string, user: User, redirect_url: string }<br/><br/>WebHookEvent\<PasswordRecovery > & { data_type: 'PasswordRecovery' }</pre>                 | `yes`      |
| `AddOrderDocument`<br/>`RemoveOrderDocument`                                | `orders.show_details`                                                               | <pre>type OrderDocumentEvent = { order: Order, document: OrderDocument }<br/><br/>WebHookEvent\<OrderDocumentEvent> & { data_type: 'OrderDocument' }</pre>                                  | `no`       |
| `SendOrderDocument`                                                         | `orders.show_details`                                                               | <pre>type SendOrderDocument = { order: Order, documents: OrderDocument[] }<br/><br/>WebHookEvent\<SendOrderDocument> & { data_type: 'SendOrderDocument' }</pre>                             | `no`       |
| `NewLocalizationLoginAttempt`                                               | `users.show_details`                                                                | <pre>type LocalizedLoginAttempt = { user_agent: string, ip: string, user: User, date: string }<br/><br/>WebHookEvent\<LocalizedLoginAttempt> & { data_type: 'LocalizedLoginAttempt' }</pre> | `yes`      |
| `SuccessfullLoginAttempt`                                                   | `users.show_details`                                                                | <pre>WebHookEvent\<LocalizedLoginAttempt> & { data_type: 'LocalizedLoginAttempt' }</pre>                                                                                                    | `yes`      |
| `FailedLoginAttempt`                                                        | `users.show_details`                                                                | <pre>WebHookEvent\<LocalizedLoginAttempt> & { data_type: 'LocalizedLoginAttempt' }</pre>                                                                                                    | `yes`      |
:::
