import {createSchema, createYoga} from 'npm:graphql-yoga'
import {loadFiles} from 'npm:@graphql-tools/load-files'
import {useResponseCache} from 'npm:@graphql-yoga/plugin-response-cache'
import {serve} from 'https://deno.land/std@0.157.0/http/server.ts'
import {helloResolver} from "./resolvers/hello.resolver.ts";
import {productResolver} from "./resolvers/product.resolver.ts";

const yoga = createYoga({
    landingPage: false,
    schema: createSchema({
        typeDefs: await loadFiles("./typeDefs/**/*.graphql"),
        resolvers: [helloResolver, productResolver]
    }),
    plugins: [
        // https://the-guild.dev/graphql/yoga-server/docs/features/response-caching
        useResponseCache({
            // global cache
            session: () => null
        })
    ]
})

serve(yoga, {
    onListen({hostname, port}) {
        console.log(`Listening on http://${hostname}:${port}/${yoga.graphqlEndpoint}`)
    }
})