# Utility functions

Beside SDK, `@heseya/store-core` package includes a set of utility functions to help you create a store using Heseya API. They can simply be imported from the `@heseya/store-core` package.

## Format Api errors

Returns an error message from any given error with more detailed information when `AxiosError` is passed into it

```ts
formatApiError(error: any):
  { title: string, key?: HeseyaErrorCode, text: string }
```

## Permissions

Returns the function, tha checks if given permissions match the permission passed into the function

```ts
hasAccess(required: Permission | Permission[], anyOfRequired = false):
  (userPermissions: Permission[]) => boolean
```

## Restore cart

Recreates `CartItem` classes from its simplified objects created by the `CartItem.toJSON` method

```ts
restoreCart(savedCart: SavedCartItem[]): CartItem[]
```

## SEO

Creates head metatags from the given Heseya SEO object

```ts
createSeoMetatags(...seoMetadatas: SeoMetadata[])
```

## Schemas

Changes raw `Schema` objects into the `CartItemSchema` objects, which holds the values of the schema. It uses schema default values.

```ts
parseSchemasToValues(schemas: Schema[]): CartItemSchema[]
```

Calculates the price of the given `CartItemSchema` objects

```ts
calcSchemasPrice(schemas: CartItemSchema[]): number
```
