# Type definitions

SDK package contains a set of type definitions for the Heseya API, you can import them directly into your project.

Full list of exported types corresponds to the [SDK modules](#available-modules) and it is available [here](https://heseya.github.io/sdk-core/index.html).

Each of the Models in Heseya has a corresponding type definition, with different type for the Model list, details, create and update methods.
The convention is following:

- `{ModelName}List` - type for the list of models
- `{ModelName}` - type for the details of a model
- `{ModelName}CreateDto` - type for the create method of a model
- `{ModelName}UpdateDto` - type for the update method of a model

Example for product types:

```ts
import { Product, ProductList, ProductCreateDto, ProductUpdateDto } from '@heseya/store-core'

const productCreateDto: ProductCreateDto = {
  ...
}

await heseya.Products.create(productCreateDto)
```
