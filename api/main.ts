import {
    Hono,
} from 'https://deno.land/x/hono@v4.2.8/mod.ts'
import { logger } from "https://deno.land/x/hono@v4.2.8/middleware.ts"
import supabase from "./supabase.ts";

const app = new Hono()
const PORT = 1337

app.use(logger())
app.get('/', (c) => {
    return c.text('GraphQL Server served by Hono on Deno!')
})
app.get('/products', async (c) => {
    const {
        data,
        error
    } = await supabase.from('product').select('name, price, image_id, id, created_at');
    if (error) {
        throw new Error(error.message)
    }
    return c.json({
        results: data
    });
})
app.get('/products/image/:id', async (c) => {
    const {id} = c.req.param()
    const {
        data,
        error
    } = await supabase.from('image').select('url, id').eq('id', id).single();

    if (error) {
        throw new Error(error.message)
    }

    return c.json({
        results: data
    })
})

Deno.serve({port: PORT}, app.fetch)