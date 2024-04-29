import './App.css'
import {createGraphQLClient, gql} from '@solid-primitives/graphql';
import {Show} from "solid-js";

export const newQuery = createGraphQLClient("http://0.0.0.0:8000/graphql");

function App() {
    const [products, {refetch}] = newQuery<{
        products: {
            name: string,
            price: number;
            createdAt: string;
            image: {
                url: string,
                id: string
            }
        }[]
    }>(
        gql`
            query products {
                products {
                    id
                    name
                    createdAt
                    price
                    image {
                        url
                        id
                    }
                }
            }
        `,
        // no variables
        undefined,
        // resource options with the initial value
        {
            initialValue: {products: []},
        },
    )

    return (
        <>
            <h1 class="font-extrabold mb-20">Products:</h1>
            <Show when={products.state !== "pending"}
                  fallback={<p>Loading...</p>}>
                <div class="flex gap-8 flex-wrap items-center justify-center">
                    {products()?.products
                        .map(product => (
                            <div class="flex flex-col items-center flex-wrap">
                                <p>{product.name} -
                                    ${product.price.toFixed(2)}</p>
                                <img width={80} style="margin:8px;"
                                     alt={product.name}
                                     src={product.image.url}/>
                            </div>
                        ))}
                </div>
                <button
                    class="mt-20 px-8 py-1 rounded-full bg-lime-300 text-lime-950"
                    onClick={refetch}
                    type="button">
                    Refetch
                </button>
            </Show>
        </>
    )
}

export default App
