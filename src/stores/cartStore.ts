import { defineStore } from 'pinia'
import {v4 as uuid4} from 'uuid'
import { type Cart, type Product, type DisplayCart} from '../types/interfaces'
import { items } from '../assets/items'

interface State{
    cart: Cart | {},
    displayCart: DisplayCart [] | {}
}

export const useCartStore = defineStore('cart',{
    state: ()=>({cart: {}, displayCart: []} as State),
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