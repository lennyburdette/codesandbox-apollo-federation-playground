# Apollo Federation Playground

Run it in [codesandbox.io](https://codesandbox.io/s/github/lennyburdette/codesandbox-apollo-federation-playground).

To add a service to the federated service to the gateway:

1. Add a JavaScript file in the `src/services` directory.
2. Ensure the JavaScript file exports three properties:
    1. A unique `name`.
    2. A GraphQL schema called `typeDefs`.
    3. A GraphQL `resovlers` object.
