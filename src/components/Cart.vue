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
                        <!-- <input type="checkbox" class="check_box" v-model="select_all"> -->
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
                        <div class="check_box_pos"> <input type="checkbox" class="check_box" v-bind:value="item['id'] + item['size'][0]" v-model="checkedItems"></div>
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
                        <div class="check_box_pos"> <input type="checkbox" class="check_box" v-bind:value="item['id'] + item['size'][1]" v-model="checkedItems"></div>
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
            <div class="total_box">
                총 금액 {{ total }}
            </div>
            <div class="buy_box">
                <span class="buy_btn" @click="buyingItem()">구입하기</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCartStore, useBuyStore } from '../stores/cartStore'
import { storeToRefs } from 'pinia'
import { onMounted, computed, ref } from 'vue'
import { type DisplayCart, type DisplayBuy } from '../types/interfaces'
import { useRouter } from 'vue-router';
const router = useRouter()
const cartStore = useCartStore()
const buyStore = useBuyStore()
const { buy } = storeToRefs(buyStore)
const {cart, displayCart} = storeToRefs(cartStore)

const checkedItems = ref([])
let select_all = false;

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
        let i = 0
        for(i = 0; i <= checkedItems.value.length; i++){
            if(checkedItems.value[i] == item.id+'small'){
                initialSum = initialSum + (item.price * item.quantity[0])
            }
            else if(checkedItems.value[i] == item.id+'medium'){
                initialSum = initialSum + (item.price * item.quantity[1])
            }
        }
        return initialSum
    }, 0);
    return sum
})

function removeItem(id:number){
    cartStore.removeFromCart(id)
}
// function selectAll(this:any, length:number){
//     if(select_all){
//         console.log('it is now false')
//     }else if(!select_all){
//         console.log('it is now true')
//         console.log(displayCart.value.length)
//         let i = 0;
//         for(i = 0; i <= displayCart.value.length; i++){
//             console.log(i);
//             this.checkedItems.value.push(this.item[i].id)
//         }
//     }
//     console.log(checkedItems.value)
//     // this.checkedItems.value = [];
//     // if(!this.select_all){
//     //     for(let i in this.item){
//     //         this.checkedItems.value.push(this.item[i].id);
//     //     }
//     // }
// }

function buyingItem(this:any){
    console.log(checkedItems.value.length)
    console.log(checkedItems.value[1])
    if(checkedItems.value.length == 0){
        alert('상품을 선택을 하셔야 합니다')
    }else{
        let ia = checkedItems.value.length
        let i = 0;
        for(i=0; i < ia; i++){
            console.log(checkedItems.value[i])
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            let cde = checkedItems.value[i]
            let idIn = parseInt(checkedItems.value[i])
            let sizeIn:string = cde.replace(/[0-9]/g, '') as never;
            console.log('size is ' + sizeIn + ' id is ' + idIn)
            buyStore.addToBuy({id: idIn, size: sizeIn})
            console.log("buy", buy.value)
        }
        alert('구매 페이지로 이동합니다')
    }

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
.total_box{
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
}
.buy_box{
    margin-top: 10px;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.buy_btn{
    width: 200px;
    height: 100px;
    box-sizing: border-box;
    border: 1px solid black;
    background-color: grey;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    cursor: pointer;
}
</style>