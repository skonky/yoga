## API
A simple Hono api running on Deno, it uses supabase as a database

`deno task dev`

To work with supabase add a .env file with

`SUPABASE_API_KEY=`

`SUPABASE_URL=`


## Client
A simple Solid.js app that uses the graphql-server

`pnpm i && pnpm dev`

## Graphql server
A simple graphql yoga server that calls the API running on Deno

`deno task dev`

