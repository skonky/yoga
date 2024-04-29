type ProductDto = {
    id: number
    name: string
    price: number
    image_id: number
    created_at: string
}

const productResolver = {
    Query: {
        products: getProducts
    },
    Product: {
        image: async (product: ProductDto) => {
            return await getProductImage(product.image_id)
        },
        createdAt: (product: ProductDto) => {
            return product.created_at
        }
    },
}

async function getProducts() {
    const res = await fetch('http://localhost:1337/products');
    const data = await res.json();
    return data.results
}

async function getProductImage(id: number) {
    const res = await fetch(`http://localhost:1337/products/image/${id}`);
    const data = await res.json();
    return data.results
}

export {
    productResolver
}