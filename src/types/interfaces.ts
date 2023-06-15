export interface Cart{
    cid: string
    products: Array<Product>
}

export interface Product{id: number, quantity: number[], size: string[]}

export interface DisplayCart {
    name: string,
    price: number,
    quantity: number[],
    inStock: boolean,
    id: number,
    color: string,
    size: string[]
    image: string
}