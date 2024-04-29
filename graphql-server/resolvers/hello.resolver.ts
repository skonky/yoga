const resolverValue = "Hello from Deno and GraphQL!";

const helloResolver = {
    Query: {
        hello: () => resolverValue
    }
}

export {
    helloResolver
}