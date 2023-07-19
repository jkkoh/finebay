export interface Cart{
    cid: string
    products: Array<Product>
}
export interface Buy{
    cid: string
    buyProducts: Array<BuyProduct>
}
export interface Inicis{
    cid: string
    InicisProducts: Array<InicisProduct>
}

export interface BuyProduct{id: number, size: string}

export interface Product{id: number, quantity: number[], size: string[]}

export interface InicisProduct{goodname: string, buyername: string, buyertel: string, buyeremail: string, price: string}

export interface DisplayCart {
    name: string,
    price: number,
    quantity: number[],
    inStock: boolean,
    id: number,
    color: string,
    size: string[],
    image: string,
    discount: number
}

export interface DisplayBuy {
    id: number,
    size: string,
    price: number
}

export interface DisplayInicis {
    goodname: string,
    buyername: string,
    buyertel: string,
    buyeremail: string,
    price: string
}