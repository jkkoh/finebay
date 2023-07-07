<template>
    <div>
        <div v-if="!mobileState" class="wrap">
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
        <div v-if="mobileState">
            <div class="m_wrap">
                <div class="m_outer_top">
                    <div class="m_top_inner">
                        <p class="m_top_text">CART</p>
                    </div>
                </div>
                <div class="m_outer_mid">
                    <div class="m_mid_inner_top">
                        <p class="m_mid_inner_top_text">일반상품({{ loadedAmount }})</p>
                    </div>
                    <div class="m_mid_inner_mid">
                        <div v-for="(item , index) in displayCart" :key="index">
                            <div v-if="item['quantity'][0]" class="m_mid_inner_inner">
                                <div class="m_inner_product">
                                    <div class="m_innest_left">
                                        <div class="m_check_box_pos"> <input type="checkbox" class="m_check_box" v-bind:value="item['id'] + item['size'][0]" v-model="checkedItems"></div>
                                    </div>
                                    <div class="m_innest_midleft">
                                        <div class="m_image_box_pos"> <img :src="item['image']" class="m_inner_img" alt=""> </div>
                                    </div>
                                    <div class="m_innest_midright">
                                        <div class="m_info_box_pos">
                                            <div class="m_inner_info_box"> 
                                                <div> {{item['name']}}</div> 
                                            </div>
                                            <div> <span> 사이즈 : Small </span> </div>
                                        </div>
                                        <div class="m_quantity_box_pos">
                                            <span> 수량 : {{item['quantity'][0]}}</span> 
                                        </div>
                                        <div class="m_price_box_pos">
                                            <div> ￦{{item['price']}}</div>
                                        </div>
                                    </div>
                                    <div class="m_innest_right">
                                        <div class="m_choose_box_pos">
                                            <div>
                                                <span class="material-icons md-20" style="fontSize:5vw" @click="removeItem(item['id'])">close</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="item['quantity'][1]" class="m_mid_inner_inner">
                                <div class="m_inner_product">
                                    <div class="m_innest_left">
                                        <div class="m_check_box_pos"> <input type="checkbox" class="m_check_box" v-bind:value="item['id'] + item['size'][1]" v-model="checkedItems"></div>
                                    </div>
                                    <div class="m_innest_midleft">
                                        <div class="m_image_box_pos"> <img :src="item['image']" class="m_inner_img" alt=""> </div>
                                    </div>
                                    <div class="m_innest_midright">
                                        <div class="m_info_box_pos">
                                            <div class="m_inner_info_box"> 
                                                <div> {{item['name']}}</div> 
                                            </div>
                                            <div> <span> 사이즈 : Medium </span> </div>
                                        </div>
                                        <div class="m_quantity_box_pos">
                                            <span> 수량 : {{item['quantity'][1]}}</span> 
                                        </div>
                                        <div class="m_price_box_pos">
                                            <div> ￦{{item['price']}}</div>
                                        </div>
                                    </div>
                                    <div class="m_innest_right">
                                        <div class="m_choose_box_pos">
                                            <div>
                                                <span class="material-icons md-20" style="fontSize:5vw" @click="removeItem(item['id'])">close</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m_outer_bot">

                </div>

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

const loadedAmount = computed(()=>{
    console.log('aaaaaa')
    console.log(localStorage.getItem('cart'))
    if(localStorage.getItem('cart')){
        const qwer:string = localStorage.getItem('cart') as string
        console.log('current qwer is : ', qwer)
        console.log('type of qwer is ' , typeof(qwer))
        const wert = JSON.parse(qwer)
        console.log('current wert is : ', wert)
        console.log('type of wert is ' , typeof(wert))
        const erts = wert.products
        console.log('current erts : ' , erts)
        return erts.length
    }else if (!localStorage.getItem('cart')){
        return 0
    }
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

function buyingItem(this:any){
    if(checkedItems.value.length == 0){
        alert('상품을 선택을 하셔야 합니다')
    }else{
        let ia = checkedItems.value.length
        let i = 0;
        for(i=0; i < ia; i++){
            let cde : string = checkedItems.value[i]
            let idIn = parseInt(checkedItems.value[i])
            console.log('------------------------')
            let sizeIn:string = cde.replace(/[0-9]/g, '');
            buyStore.addToBuy({id: idIn, size: sizeIn})
            console.log("buy", buy.value)
        }
        alert('구매 페이지로 이동합니다')
        router.replace({name: "buy"})
    }

}

</script>

<script lang="ts">
import { defineComponent } from 'vue';
import MobileDetect from 'mobile-detect'

export default defineComponent({
    mounted(){
        window.addEventListener("resize", this.myEventHandler);
        const md = new MobileDetect(window.navigator.userAgent)
        if(window.innerWidth < 800   || md.mobile() || md.tablet()){
        this.mobileState = true;
        }else if(window.innerWidth >= 800){
            this.mobileState = false;
        }
    },
    unmounted(){
        window.removeEventListener("resize", this.myEventHandler);
    },
    data:()=>{
        return{
            mobileState : false
        }
    },
    methods:{
        myEventHandler(){
            const mobile = 800
            if(window.innerWidth < mobile ){
                this.mobileState = true;
            }else if(window.innerWidth >= mobile){
                this.mobileState = false;
            }
        }
    }
    
})

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
    width: 15px;
    height: 15px;
    max-width: 15px;
    max-height: 15px;
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

/* mobile page start*/

.m_wrap{
    width: 100vw;
}

/* mobile outer top start*/
.m_outer_top{
    width: 100vw;
    height: 20vw;
    display: flex;
    align-items: center;
    justify-content: center;
}
.m_top_inner{
    width: 30vw;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid black;
}
.m_top_text{
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: 0;
    
}
/* mobile outer top end*/

/* mobile outer mid start*/

.m_outer_mid{
    width: 100vw;
}
.m_mid_inner_top{
    width: 90vw;
    height: 20vw;
    display: flex;
    align-items: center;
    margin-left: 5vw;
}
.m_mid_inner_top_text{
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    margin-bottom: 0;
}
.m_mid_inner_mid{
    width: 90vw;
    margin-left: 5vw;
}
.m_mid_inner_inner{
    width: 100%;
}
/*v-for start*/
.m_inner_product{
    width: 100%;
    box-sizing: border-box;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
    padding-top: 10px;
    padding-bottom: 10px;
    
    display: flex;
}
.m_innest_left{
    width: 5vw;
}
.m_check_box_pos{
    width: 5vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.m_check_box{
}
.m_innest_midleft{
    width: 20vw;
}

.m_image_box_pos{
    width: 20vw;
}
.m_inner_img{
    width: 100%;
}
.m_innest_midright{
    width: 60vw;
    display: flex;
    flex-direction: column;
    padding-left: 3vw;
    font-size: 0.8rem;
    font-family: Noto_Sans;
}

.m_info_box_pos{
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.m_inner_info_box{
    font-weight: 700;
}
.m_price_box_pos{
}
.m_quantity_box_pos{

}
.m_delievery_fee_box_pos{

}
.m_actual_price_box_pos{

}
.m_innest_right{
    width: 5vw;
}

.m_choose_box_pos{
    justify-content: center;
    align-items: center;
}

.m_delete_box{
    cursor: pointer;
    width: 5vw;
    height: 5vw;
}

/*v-for end*/

/* mobile outer mid end*/
.m_outer_bot{
    width: 100vw;
    height: 100vw;
    background-color: yellow;
}
/* mobile page end*/
</style>