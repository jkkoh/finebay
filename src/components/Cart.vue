<template>
    <div class="wrap">
        <div class="main_wrap">
            <div class="outer_text_area">
                <span class="material-icons md-48">shopping_cart</span> <p class="inner_text">Cart</p>
            </div>
            <div v-for="(item, index) in displayCart" :key="index">
                <div v-if="item.quantity[0]" class="outer_product">
                    <div class="inner_product">
                        <div class="check_box_pos"> <input type="checkbox" class="check_box"></div>
                        <div class="image_box_pos"> <img :src="item.image" class="inner_img" alt=""> </div>
                        <div class="info_box_pos">
                            <div> {{item.name}}</div>
                            <div>  {{item.size[0]}}</div>
                            <div> {{item.quantity[0]}}</div>
                        </div>
                        <div class="price_box_pos">
                            <div> {{item.price}}</div>
                        </div>
                    </div>
                    <button @click="removeItem(item.id)"></button>
                </div>
                <div v-if="item.quantity[1]" class="outer_product">
                    <div class="inner_product">
                        <div class="check_box_pos"> <input type="checkbox" class="check_box"></div>
                        <div> <img :src="item.image" class="inner_img" alt=""> </div>
                        <div> {{item.name}}</div>
                        <div> {{item.price}}</div>
                        <div> {{item.quantity[1]}}</div>
                        <div> {{item.size[1]}}</div>
                    </div>
                    <button @click="removeItem(item.id)"></button>
                </div>
            </div>
            <div>
                Total {{ total }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'
import { storeToRefs } from 'pinia'
import { onMounted, computed } from 'vue'
import { type DisplayCart } from '../types/interfaces'

const cartStore = useCartStore()
const {cart, displayCart} = storeToRefs(cartStore)

onMounted(()=>{
    cartStore.loadCartInstance()
    cartStore.displayCartLoad()
})

const total = computed(()=>{

    let sum = (displayCart.value as DisplayCart[]).reduce((initialSum:number, item:DisplayCart)=>{
        if(item.inStock)
        initialSum = initialSum + (item.price * item.quantity[0] + item.price * item.quantity[1])
        return initialSum
    }, 0);
    return sum
})

function removeItem(id:number){
    cartStore.removeFromCart(id)
}

</script>

<style>
.wrap{
    display: flex;
    align-items: center;
    justify-content: center;
}
.main_wrap{
    width: 1000px;
    background-color: green;
    margin-top: 100px;
}
.outer_text_area{
    width: 100%;
    display: flex;
}
.material-icons.md-48{
    font-size: 48px;
}
.inner_text{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
    font-size: 24px;
}
.inner_product{
    width: 100%;
    background-color: brown;
    display: flex;
}
.inner_img{
    width: 100px;
}
.check_box_pos{
    display: flex;
}
.check_box{
    margin-left: 2px;
    margin-right: 2px;
}
</style>