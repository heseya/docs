# Event bus

You can create an event bus to handle some events in your store. The main purpose of this feature is to create an abstract way to react to different actions that your client is performing in the store. For example, you can emit events to Google Analytics or to the Facebook Pixel.

[[toc]]

## Creating Event Bus

```ts
import { createHeseyaEventBusService } from '@heseya/store-core'

const eventBus = createHeseyaEventBusService()
```

## Listening and emitting events

```ts
import { HeseyaEvent } from '@heseya/store-core'

eventBus.on(HeseyaEvent.AddToCart, (product) => {
  gtm.emit('add_to_cart', { product_id: product.id })
})

eventBus.emit(HeseyaEvent.AddToCart, { id: '123' })
```

## Available events

| Event                              | Payload                                                   | Description                                                                                                           |
| ---------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `HeseyaEventType.ViewProduct`      | `Product`                                                 | View product page                                                                                                     |
| `HeseyaEventType.ViewProductList`  | `{ set?: Partial<ProductSetList>; items: ProductList[] }` | View list of the products                                                                                             |
| `HeseyaEventType.CustomizeProduct` | `CartItem`                                                | The customisation of products through a configuration tool                                                            |
| `HeseyaEventType.AddToCart`        | `CartItem`                                                | The addition of an item to a shopping cart or basket                                                                  |
| `HeseyaEventType.ViewCart`         | `CartItem[]`                                              | Show the shopping cart page                                                                                           |
| `HeseyaEventType.RemoveFromCart`   | `CartItem`                                                | Remove item from cart                                                                                                 |
| `HeseyaEventType.AddToWishlist`    | `Product`                                                 | The addition of items to a wishlist                                                                                   |
| `HeseyaEventType.InitiateCheckout` | `CartItem[]`                                              | The start of a checkout process                                                                                       |
| `HeseyaEventType.AddShippingInfo`  | `{ shipping: ShippingMethod; items: CartItem[] }`         | Add shipping information to a checkout                                                                                |
| `HeseyaEventType.Purchase`         | `{ order: OrderSummary; items: CartItem[] }`              | The completion of a purchase, usually signified by receiving order or purchase confirmation, or a transaction receipt |
| `HeseyaEventType.Search`           | `string`                                                  | A search performed on your website or app                                                                             |
| `HeseyaEventType.Register`         | `User`                                                    | A submission of information by a customer in exchange for a service provided by your business                         |
| `HeseyaEventType.Login`            | `User`                                                    | User log in.                                                                                                          |
| `HeseyaEventType.ViewContent`      | `unknown`                                                 | A visit to a web page you care about.                                                                                 |
