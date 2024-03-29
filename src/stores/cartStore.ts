import { defineStore } from 'pinia'
import {v4 as uuid4} from 'uuid'
import { type Cart, type Product, type DisplayCart, type Buy, type DisplayBuy, type BuyProduct, type Inicis, type InicisProduct,type DisplayInicis} from '../types/interfaces'
import { items } from '../assets/items'

interface State{
    cart: Cart | {},
    displayCart: DisplayCart [] | {},
    buy: Buy | {},
    displayBuy: DisplayBuy [] | {},
    inicis: Inicis | {},
    displayInicis: DisplayInicis [] | {}
}

export const useBuyStore = defineStore('buy',{
    state: ()=>({buy: {}, displayBuy: []} as unknown as State),
    actions:{
        loadBuyInstance(){
            const cs = localStorage.getItem('buy')
            if(!cs)
            this.buy = {}
            this.buy = JSON.parse(cs || '{}')
        },
        addToBuy(buyProduct: BuyProduct){
            const cs = localStorage.getItem('buy')

            let isAdded = false
            if(!cs)
            this.buy = {
                cid: uuid4(),
                buyProducts:[
                    buyProduct
                ]
            }
            else {
                let buyLocalStorage = JSON.parse(cs)
                buyLocalStorage.buyProducts = buyLocalStorage.buyProducts.map((ci: BuyProduct) =>{
                    if(ci.id == buyProduct.id)
                    {
                        isAdded = true
                        return {id: ci.id, size: ci.size}
                    }
                    
                    return {id: ci.id, size: ci.size}
                })

                if(!isAdded)
                buyLocalStorage.buyProducts.push({id: buyProduct.id, size: buyProduct.size})

                this.buy = buyLocalStorage
            }
            localStorage.setItem('buy', JSON.stringify(this.buy))
        },
        removeFromBuy(id:number){
            (this.buy as Buy).buyProducts = (this.buy as Buy).buyProducts.filter(ci => ci.id != id) 
            this.displayBuyLoad()
            localStorage.setItem('buy', JSON.stringify(this.buy))
            const buyCurrentStatus = JSON.parse(localStorage.getItem('buy') as string)
            if(!buyCurrentStatus.buyProducts[0]){
                localStorage.removeItem('buy')
            }
        },
        displayBuyLoad(){
            this.displayBuy = (this.buy as Buy).buyProducts.map(ci => {
                const requiredBuy = items.filter(p => p.id == ci.id)
                return {
                    id: ci.id, size: ci.size, price: requiredBuy[0].price }
            })

        }
    }
})

export const useCartStore = defineStore('cart',{
    state: ()=>({cart: {}, displayCart: []} as unknown as State),
    actions:{
        loadCartInstance()
        {
            const cs = localStorage.getItem('cart')
            if(!cs || undefined)
            this.cart = {}
            else
            this.cart = JSON.parse(cs)
        },
        addToCart(product: Product){
            const cs = localStorage.getItem('cart')

            let isAdded = false

            if(!cs)
            this.cart = {
                cid: uuid4(),
                products:[
                    product
                ]
            }
            else {
                let cartLocalStorage = JSON.parse(cs)
                cartLocalStorage.products = cartLocalStorage.products.map((ci : Product) => {
                    if(ci.id == product.id)
                    {
                        isAdded = true
                        return {id: ci.id, quantity: ci.quantity, size: ci.size}
                    }

                    return {id: ci.id, quantity: ci.quantity, size: ci.size}
                })

                if(!isAdded)
                cartLocalStorage.products.push({id: product.id, quantity: product.quantity, size: product.size})

                this.cart = cartLocalStorage
               

            }

            localStorage.setItem('cart', JSON.stringify(this.cart))

        },
        
        removeFromCart(id:number){
                (this.cart as Cart).products = (this.cart as Cart).products.filter(ci => ci.id != id) 
                this.displayCartLoad()
                localStorage.setItem('cart', JSON.stringify(this.cart))
                const cartCurrentStatus = JSON.parse(localStorage.getItem('cart') as string)
                if(!cartCurrentStatus.products[0]){
                    localStorage.removeItem('cart')
                }
        },
        displayCartLoad(){
            const cs = localStorage.getItem('cart')
            if(!cs){
                return {}
            }else{
                this.displayCart = (this.cart as Cart).products.map(ci => {
                    const requiredProduct = items.filter(p => p.id == ci.id)
                    // if(requiredProduct[0].stock >= ci.qty)
                    return {
                        id: ci.id, name: requiredProduct[0].text, price: requiredProduct[0].price, quantity: ci.quantity, size: ci.size, color: requiredProduct[0].color,
                        inStock: requiredProduct[0].stock, image: requiredProduct[0].image[0], discount: requiredProduct[0].discount }
                })
            }

        }

    }
})

export const useInicisStore = defineStore('inicis',{
    state: ()=>({inicis: {}, displayInicis: []} as unknown as State),
    actions:{
        loadInicisInstance()
        {
            const cs = localStorage.getItem('inicis')
            if(!cs)
            this.inicis = {}
            else
            this.inicis = JSON.parse(cs)
        },
        addToInicis(inicisProduct: InicisProduct){
            const cs = localStorage.getItem('inicis')

            let isAdded = false

            if(!cs)
            this.inicis = {
                cid: uuid4(),
                products:[
                    inicisProduct
                ]
            }
            else {
                let inicisLocalStorage = JSON.parse(cs)
                inicisLocalStorage.products = inicisLocalStorage.products.map((ci : InicisProduct) => {
                    if(ci.goodname == inicisProduct.goodname)
                    {
                        isAdded = true
                        return {goodname: ci.goodname, buyername: ci.buyername, buyertel: ci.buyertel, buyeremail: ci.buyeremail, price: ci.price}
                    }

                    return {goodname: ci.goodname, buyername: ci.buyername, buyertel: ci.buyertel, buyeremail: ci.buyeremail, price: ci.price}
                })

                if(!isAdded)
                inicisLocalStorage.inicisProducts.push({goodname: inicisProduct.goodname, buyername: inicisProduct.buyername, buyertel: inicisProduct.buyertel, buyeremail: inicisProduct.buyeremail, price:inicisProduct.price})

                this.inicis = inicisLocalStorage
               

            }

            localStorage.setItem('inicis', JSON.stringify(this.inicis))

        },
        displayInicisLoad(){
            this.displayInicis = (this.inicis as Inicis).InicisProducts.map(ci => {
                return {
                    goodname: ci.goodname, buyername: ci.buyername, price: ci.price, buyertel : ci.buyertel, buyeremail:ci.buyeremail }
            })

        },
        removeFromCart(){
            localStorage.removeItem('inicis')
        }
    }
})