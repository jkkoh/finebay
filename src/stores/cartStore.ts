import { defineStore } from 'pinia'
import {v4 as uuid4} from 'uuid'
import { type Cart, type Product, type DisplayCart, type Buy, type DisplayBuy, type BuyProduct} from '../types/interfaces'
import { items } from '../assets/items'

interface State{
    cart: Cart | {},
    displayCart: DisplayCart [] | {},
    buy: Buy | {},
    displayBuy: DisplayBuy [] | {}
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
            const buyCurrentStatus = JSON.parse(localStorage.getItem('buy'))
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
            if(!cs)
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
                const cartCurrentStatus = JSON.parse(localStorage.getItem('cart'))
                if(!cartCurrentStatus.products[0]){
                    localStorage.removeItem('cart')
                }
        },
        displayCartLoad(){
            this.displayCart = (this.cart as Cart).products.map(ci => {
                const requiredProduct = items.filter(p => p.id == ci.id)
                // if(requiredProduct[0].stock >= ci.qty)
                return {
                    id: ci.id, name: requiredProduct[0].text, price: requiredProduct[0].price, quantity: ci.quantity, size: ci.size, color: requiredProduct[0].color,
                    inStock: requiredProduct[0].stock, image: requiredProduct[0].image[0] }
            })

        }

    }
})