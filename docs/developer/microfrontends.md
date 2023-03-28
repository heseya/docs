# Micro-frontends

[[toc]]

## Introduction

### What are micro-frontends?

A micro-frontend is a separate frontend application that runs simultaneously within another web application.
Multiple micro-frontends can run simultaneously on a single site,
which together create a full interface and user experience.

A good analogy here is backend microservices,
where instead of writing all the functionality in one application (monolith),
we can break it up into many, separate applications, developed by different teams.

Microservices are characterized by the fact that each of them can be written in a different technology,
and yet they will still be able to communicate and collaborate with each other.

### Micro-fronts in Heseya Dashboard

In our system, the main use of microservices is to allow applications
to create any user interface available directly in our panel.

For example, suppose there is a app for importing products from a CSV file,
and it needs a user interface so that the user can upload the file
and then match the column names in the file with the corresponding fields in the API.
With a micro-frontend, such an interface can be created independently of the main panel and just be embedded on it.

## Implementation

### Home application

Each micro-front requires that there be an application that will embed it.
It is not possible for a standalone micro-front to exist without a home application.
To link a microservice to a micro-front, the app must return
a link to the built micro-front in the `microfrontend_url` field on the application information path (`[GET] /`).

### Micro-front architecture

The microservice to work properly must meet the following assumptions:

- Must be written in JavaScript technology
- Must be written in [Vue](https://vuejs.org/) framework version 3 or higher
- Must use the [Bout](https://github.com/heseya/bout) library to embed and communicate with the admin panel,
and meet [its requirements](https://github.com/heseya/bout#child-app)
- Must be built with static files only.

### Registration of a micro-front

To add a micro-front, it must register with the parent application.
It does this using the [Bout](https://github.com/heseya/bout) library as follows:

```ts
import { createApp } from 'vue'
import { createVue3MicroApp, registerMicroApp } from 'bout'
import App from './App.vue'

const appFactory = () => {
  return createApp(App)
}

const microApp = createVue3MicroApp('Example', appFactory)
registerMicroApp(microApp)
```

### Dashboard handling of micro-front
The admin dashboard installs the microservice as follows:

- A Shadow DOM with the basic structure of the HTML document is created.
- An asset file of the built micro-front is added to the Shadow DOM,
which is linked on the app path at `/asset-manifest.json`.
- Calling the scripts found in the assets, should register the presence of the micro-front in the admin dashboard
- The panel calls the `app.mount(container)` method from the Bout library,
which will assemble the micro-front in the Shadow DOM

## Communication with panel

The panel provides a communication channel called `Main`,
on which an init event with basic information about the environment is sent every time the micro-front is mounted.

An example of receiving this event on the micro-frontend side:
```ts
import { openCommunicationChannel } from 'bout'

const mainChannel = openCommunicationChannel('Main')

mainChannel.on<{ coreUrl: string; token: string; user: User; uiLanguage: string }>(
  'init',
  ({ coreUrl, token, user, uiLanguage }) => {
    store.setUser(user)
    store.setCoreUrl(coreUrl)
    store.setToken(token)
    store.setUiLangiage(uiLanguage)
  }
)
```

### Authorization

The panel provides an additional `Token` communication channel
for sending the `IdentityToken` token to the micro-frontend.
The micro-frontend **never** has access to the user's full `AccessToken`,
it can only communicate with the home app via `IdentityToken`.

#### Setting the IdentityToken

The panel emits a `set` event, every time the microservice is mounted, and every time the token is refreshed.

An example of receiving a token on the microservice side:
```ts
import { openCommunicationChannel } from 'bout'

const tokenChannel = openCommunicationChannel('Token')
tokenChannel.on('set', (token: string) => {
  this.token = token
})
```

#### IdentityToken token refresh

The app can send a `refresh` event, and in response to it,
the Panel will automatically refresh the token and return it.

An example of refreshing a token on the microservice side:
```ts
import { openCommunicationChannel } from 'bout'

const tokenChannel = openCommunicationChannel('Token')
const newIdentityToken: string | undefined = await tokenChannel.request('refresh')
```
