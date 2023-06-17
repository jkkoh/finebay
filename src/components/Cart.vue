<template>
    <div class="wrap">
        <div class="main_wrap">
            <div class="outer_text_area">
                <div class="top_outer_text">
                    <div class="cart_icon">
                        <span class="material-icons md-48">shopping_cart</span>
                    </div>
                    <div class="cart_text">
                        <span class="inner_text">Cart</span>
                    </div>
                </div>
                <div class="bot_outer_text">
                    <div class="check_box_pos"> 
                        <input type="checkbox" class="check_box">
                    </div>
                    <div class="image_box_pos">
                        <span>이미지</span>
                    </div>
                    <div class="info_box_pos">
                        <span>상품정보</span>
                    </div>
                    <div class="price_box_pos">
                        <span>판매가</span>
                    </div>
                    <div class="quantity_box_pos">
                        <span>수량</span>
                    </div>
                    <div class="delievery_fee_box_pos">
                        <span>배송비</span>
                    </div>
                    <div class="actual_price_box_pos">
                        <span>결제 금액</span>
                    </div>
                    <div class="choose_box_pos">
                        <span>삭제</span>
                    </div>
                </div>
            </div>
            <div v-for="(item , index) in displayCart" :key="index">
                <div v-if="item['quantity'][0]" class="outer_product">
                    <div class="inner_product">
                        <div class="check_box_pos"> <input type="checkbox" class="check_box"></div>
                        <div class="image_box_pos"> <img :src="item['image']" class="inner_img" alt=""> </div>
                        <div class="info_box_pos">
                            <div class="inner_info_box"> 
                                <div> {{item['name']}} </div> 
                            </div>
                            <div> <span> Small </span> </div>
                        </div>
                        <div class="price_box_pos">
                            <div> {{item['price']}}</div>
                        </div>
                        <div class="quantity_box_pos">
                            <span>{{item['quantity'][0]}}</span> 
                        </div>
                        <div class="delievery_fee_box_pos">
                            <span>무료</span>
                        </div>
                        <div class="actual_price_box_pos">
                            <span>{{item['price'] * item['quantity'][0]}}</span>
                        </div>
                        <div class="choose_box_pos">
                            <div>
                                <span></span>
                                <img src="@/images/etc/button_delete.gif" class="delete_box" alt="delete button" @click="removeItem(item['id'])">
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="item['quantity'][1]" class="outer_product">
                    <div class="inner_product">
                        <div class="check_box_pos"> <input type="checkbox" class="check_box"></div>
                        <div class="image_box_pos"> <img :src="item['image']" class="inner_img" alt=""> </div>
                        <div class="info_box_pos">
                            <div class="inner_info_box"> 
                                <div> {{item['name']}}</div> 
                            </div>
                            <div> <span> Medium </span> </div>
                        </div>
                        <div class="price_box_pos">
                            <div> {{item['price']}}</div>
                        </div>
                        <div class="quantity_box_pos">
                            <span>{{item['quantity'][1]}}</span> 
                        </div>
                        <div class="delievery_fee_box_pos">
                            <span>무료</span>
                        </div>
                        <div class="actual_price_box_pos">
                            <span>{{item['price'] * item['quantity'][1]}}</span>
                        </div>
                        <div class="choose_box_pos">
                            <div>
                                <span></span>
                                <img src="@/images/etc/button_delete.gif" class="delete_box" alt="delete button" @click="removeItem(item['id'])">
                            </div>
                        </div>
                    </div>
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
import { onMounted, computed, ref } from 'vue'
import { type DisplayCart } from '../types/interfaces'

const cartStore = useCartStore()
const {cart, displayCart} = storeToRefs(cartStore)

type Item = {
    name: string,
    price: number,
    quantity: number[],
    inStock: boolean,
    id: number,
    color: string,
    size: string[],
    image: string
}
const item: Item = {
    name: '',
    price: 0,
    quantity: [],
    inStock: false,
    id: 0,
    color: '',
    size: [],
    image: ''
}
let index = 0

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
    width: 1100px;
    
    margin-top: 100px;
}
/* outer text area start*/
.outer_text_area{
    width: 100%;
    display: flex;
    flex-direction: column;
}
.material-icons.md-48{
    font-size: 48px;
}
.top_outer_text{
    width: 100%;
    display: flex;
}
.bot_outer_text{
    width: 100%;
    height: 40px;
    display: flex;
}
/* outer text area end*/
.inner_text{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
    font-size: 24px;
}
.inner_product{
    width: 100%;
    box-sizing: border-box;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
    padding-top: 10px;
    padding-bottom: 10px;
    
    display: flex;
}
.inner_img{
    box-sizing: border-box;
    width: 100%;
}
/*pos boxes start*/
.check_box_pos{
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.image_box_pos{
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.info_box_pos{
    width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.inner_info_box{
    display: flex;
    justify-content: center;
    margin-right: 30px;
    align-items: center;
}
.price_box_pos{
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.quantity_box_pos{
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
.delievery_fee_box_pos{
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.actual_price_box_pos{
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.choose_box_pos{
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
/*pos boxes end*/
.check_box{
}
.delete_box{
    cursor: pointer;
}
.cart_icon{
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.cart_text{
    margin-left: 10px;
    display: flex;
    align-items: center;
}
</style>