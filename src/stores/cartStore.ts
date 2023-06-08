import defineStore from 'pinia'
import items from '@/assets/items'

export const useCartStore = defineStore ('shopping', {
    state: () => {
        return {
            items,
            cartItems : []
        }
    },
    getters: {
        countCartItems(){
            return this.cartItems.length;
        },
        getCartItems(){
            return this.cartItems;
        }
    },
    actions: {
        addToCart(itemId){
            let index = this.cartItems.findIndex(product => product.id === itemId.id)
            if(index !== -1){
                this.items[index].quantity += 1;
            }else{
                item.quantity = 1;
                this.cartItems.push(itemId);
            }
        }
    }
})