#  Authorization

[[toc]]

## Basic

::: tip
We highly recommend use of [SDK](/developer/js-sdk) instead of implementing authorization yourself.
:::

Heseya uses bearer authentication.

To authenticate, the user must send an `Authorization` header with prefix `Bearer` and a token in each request:
```
Authorization: Bearer <token>
```

### Types of tokens

There are several types of tokens, used for different purposes.

- **Access Token** - Used by the User for operations on Core API. Only user permissions are checked.
- **Integration Token** - Used by application for operations on Core API.
Obtained by applications at the time of installation.
- **Identity Token** - Used by the User for operations on application.
The token would have the user's privileges for a given integration.
It is obtained by the admin dashboard for a given app.
Core API creates it (stores the app ID and user ID in it) and passes it to the dashboard.
The dashboard further passes the token to microservice or uses it itself for microservice operations.
The microservice can use this token to get the given user's permissions from Core API for the given app.

![Autrentication diagram](/auth/tokens.png)

## Permissions

To access certain endpoints, the user/application must have the proper permissions.
- Users can be assigned to roles with right permissions.
- Apps are assigned directly to permissions.

### Roles

Roles can be created without restrictions. If a user has permissions to create roles,
he can create roles and give them all the permissions that he himself has.
The same for editing and deleting, he can manage roles that have the same or lower privileges.

System have 3 build-in roles:
- **Unauthenticated** - define permissions for non-authorized users
- **Authenticated** - every logged user has this role
- **Owner** - role with every permission, can't be edited, at least one user must have it

## User authorization

User can access his token using `/auth/login` endpoint.

## App authorization

Applications use a different authorization scheme than users.

![Autrentication diagram](/auth/authentication-flow.png)
