<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { useCartStore, useBuyStore } from '../stores/cartStore'
import { storeToRefs } from 'pinia'
import { computed, defineComponent } from 'vue'
import { items } from '../assets/items'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Item {
  image: string[];
  longImage: string[];
  text: string;
  itemInfo: string[];
  itemCode: string;
  color: string;
  category: string;
  material: string;
  part: string;
  price: number;
  id: number;
  stock: number;
}


const props = defineProps<{
  itemId: number
}>();

const item = computed(() => items[props.itemId])
const selectedState = ref({
    selectedA : false,
    selectedB : false,
    sizeSelected : ['',''],
    quantity : [0,0]
})
const slideData = [
    {
        img: item.value.image[0]
    },
    {
        img: item.value.image[1]
    },
    {
        img: item.value.image[2]
    },
    {
        img: item.value.image[3]
    },
    {
        img: item.value.image[4]
    },
    {
        img: item.value.image[5]
    }
]
console.log(slideData)
//size select start
function selectedSmall(){
    if(selectedState.value.selectedA == false && selectedState.value.selectedB == false){
        selectedState.value.selectedA = true
        selectedState.value.sizeSelected = ['small','']
        selectedState.value.quantity[0]++
    }else if(selectedState.value.selectedA == false && selectedState.value.selectedB == true){
        selectedState.value.selectedA = true
        selectedState.value.quantity[0]++
        selectedState.value.sizeSelected = ['small','medium']
    }else if(selectedState.value.selectedA == true && selectedState.value.selectedB == false){
        selectedState.value.selectedA = false
        selectedState.value.quantity[0] = 0
        selectedState.value.sizeSelected = ['','']
    }else if(selectedState.value.selectedA == true && selectedState.value.selectedB == true){
        selectedState.value.selectedA = false
        selectedState.value.quantity[0] = 0
        selectedState.value.sizeSelected = ['','medium']
    }
}
function selectedMedium(){
    if(selectedState.value.selectedA == false && selectedState.value.selectedB == false){
        selectedState.value.selectedB = true
        selectedState.value.sizeSelected = ['','medium']
        selectedState.value.quantity[1]++
    }else if(selectedState.value.selectedA == false && selectedState.value.selectedB == true){
        selectedState.value.selectedB = false
        selectedState.value.sizeSelected = ['','']
        selectedState.value.quantity[1] = 0
    }else if(selectedState.value.selectedA == true && selectedState.value.selectedB == false){
        selectedState.value.selectedB = true
        selectedState.value.sizeSelected = ['small','medium']
        selectedState.value.quantity[1]++
    }else if(selectedState.value.selectedA == true && selectedState.value.selectedB == true){
        selectedState.value.selectedB = false
        selectedState.value.sizeSelected = ['small','']
        selectedState.value.quantity[1] = 0
    }
}
//size select end

//quantity select start
function smallUp(){
    selectedState.value.quantity[0]++
}
function smallDown(){
    if(selectedState.value.quantity[0] >= 1){
        selectedState.value.quantity[0]--
    }
    else{
        selectedState.value.quantity[0] = 0
    }
}
function smallUnselect(){
    selectedState.value.quantity[0] = 0
    selectedState.value.selectedA = false
}
function mediumUp(){
    selectedState.value.quantity[1]++
}
function mediumDown(){
    if(selectedState.value.quantity[1] >= 1){
        selectedState.value.quantity[1]--
    }
    else{
        selectedState.value.quantity[1] = 0
    }    
}
function mediumUnselect(){
    selectedState.value.quantity[1] = 0
    selectedState.value.selectedB = false    
}
//quantity select end
const smallPrice = computed(()=>{
    return item.value.price * selectedState.value.quantity[0] * 0.95
})
const mediumPrice = computed(()=>{
    return item.value.price * selectedState.value.quantity[1] * 0.95
})
const totalPrice = computed(()=>{
    return mediumPrice.value + smallPrice.value
})

const cartStore = useCartStore()
const {cart} = storeToRefs(cartStore)
onMounted(()=>{
    cartStore.loadCartInstance()
})

const buyStore = useBuyStore()
const { buy } = storeToRefs(buyStore)

function addToCart(){
    if(totalPrice.value == 0){
        alert('상품을 선택을 해주셔야 장바구니에 담을수 있습니다')
    }else{
        cartStore.addToCart({id: item.value.id, quantity: selectedState.value.quantity, size:selectedState.value.sizeSelected})
        alert('장바구니에 물품이 담겼습니다')
    }
}  
function buyNow(){
    if(totalPrice.value == 0 || null){
        console.log('aaaa')
        alert('상품을 선택을 해주셔야 구매하실수 있습니다')
        console.log('aaaa')
    }else if(selectedState.value.sizeSelected[0] == 'small' && selectedState.value.sizeSelected[1] == ''){
        cartStore.addToCart({id: item.value.id, quantity: selectedState.value.quantity, size:selectedState.value.sizeSelected})
        buyStore.addToBuy({id: item.value.id, size: selectedState.value.sizeSelected[0]})
        alert('111111')
        router.replace({name: "buy"})
        alert('구매 페이지로 이동합니다')
        console.log('bbb')
        
    }else if(selectedState.value.sizeSelected[1] == 'medium' && selectedState.value.sizeSelected[0] == ''){
        cartStore.addToCart({id: item.value.id, quantity: selectedState.value.quantity, size:selectedState.value.sizeSelected})
        buyStore.addToBuy({id: item.value.id, size: selectedState.value.sizeSelected[1]})
        alert('11111')
        router.replace({name: "buy"})
        alert('구매 페이지로 이동합니다')
        console.log('ccc')
    }else {
        alert('모든 사이즈를 선택하셨습니다. 확인 부탁드립니다')
    }
}
</script>

<script lang="ts">
import MobileDetect from 'mobile-detect'
import ItemSlideShow from './ItemSlideShow.vue'

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
    components:{
        ItemSlideShow
    },
    unmounted() {
        window.removeEventListener("resize", this.myEventHandler);
    },
    data: () => {
        return{
            hover : 0,
            price : 0,
            selected : false,
            selectedSmall : false,
            selectedMedium : false,
            smallCount : 0,
            mediumCount : 0,
            totalCount : 0,
            mobileState : false,
            slideCounts : 6,
            currentId : 1,
            startAnime : false
        };
    },
    methods: {
        dir: function(myDir : string){
            if(myDir === "right"){
                if(this.currentId < this.slideCounts){
                    this.currentId += 1;
                } else{
                    this.currentId = 1;
                }
            } else{
                if(this.currentId > 1) {   
                    this.currentId -= 1;
                } else {
                    this.currentId = this.slideCounts;
                }
            }
        },
        imageView(index: number){
            const c = index;
            const b = index;
            const a = this.hover;
            // console.log("previous hover is " + a);
            this.hover = b;
            // console.log("current hover value is " + b);
            // console.log("index value is " + c);
            return {c , b }
        },
        myEventHandler(){
            const mobile = 800
            if(window.innerWidth < mobile ){
                this.mobileState = true;
            }else if(window.innerWidth >= mobile){
                this.mobileState = false;
            }
        },
    },
    created: function() {
        setInterval( ()=> {
            this.startAnime = true;
            this.dir("right");
        },5000)
    },
})
</script>
<template>
    <div>
        <div class="wrap" v-if="!mobileState">
            <div class="outer_a">
                <div class="main_a">
                    <div class="img_box">
                        <div class="img_layout">
                            <div v-for="(n, index) in item.image" :key="index" class="inner_img" @mouseover="imageView(index)">
                                <img :src="item.image[index]" class="innest_img"/>
                            </div>
                        </div>
                        <img v-if="hover==0" :src="item.image[0]" class="main_img"/>
                        <img v-else-if="hover==1" :src="item.image[1]" class="main_img"/>
                        <img v-else-if="hover==2" :src="item.image[2]" class="main_img"/>
                        <img v-else-if="hover==3" :src="item.image[3]" class="main_img"/>
                        <img v-else-if="hover==4" :src="item.image[4]" class="main_img"/>
                        <img v-else-if="hover==5" :src="item.image[5]" class="main_img"/>
                    </div> 
                    <div class="text_box">
                        <div class="top_text">
                            <div class="t_title">
                                <p>{{ item.text }}</p>
                            </div>
                            <div class="t_t_info">
                                <p> {{ item.itemInfo[0] }}</p>
                                <p> {{ item.itemInfo[1] }}</p>
                            </div>
                        </div>
                        <table class="bot_text">
                            <tbody>
                                <tr rel="Product" >
                                    <th scope="row" class="t_head">
                                        <span>Product</span>
                                    </th>
                                    <td class="t_body_a">
                                        <span>{{ item.text }}</span>
                                    </td>
                                </tr>
                                <tr role="Price" >
                                    <th scope="row" class="t_head">
                                        <span>Price</span>
                                    </th>
                                    <td class="t_body_a">
                                        <span class="crossed">{{item.price}}</span>
                                        <span>{{item.price * 0.95}}</span>
                                    </td>
                                </tr>
                                <tr role="Material" >
                                    <th scope="row" class="t_head">
                                        <span>Fabric(s)</span>
                                    </th>
                                    <td class="t_body_a">
                                        <span>{{item.material}}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="size_box">
                            <tbody>
                                <tr rel="Size" >
                                    <th scope="row" class="t_head">Size</th>
                                    <td>
                                        <ul class="size_ul">
                                            <li class="size_li" :class="{active: selectedState.selectedA }" @click="selectedSmall()">S</li>
                                            <li class="size_li" :class="{active: selectedState.selectedB }" @click="selectedMedium()">M</li>
                                        </ul>
                                        <span class="t_body_b">[필수] 옵션을 선택해 주세요</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="selected_size" v-show="selectedState.selectedA || selectedState.selectedB">
                            <tbody>
                                <tr rel="selectedSize">
                                    <div v-if="selectedState.selectedA" class="size_selection">
                                        <div class="size_selection_inner_top">
                                            <p>{{item.text}}</p>
                                            <p>Size - Small</p>
                                        </div>
                                        <div class="size_selection_inner_mid">
                                            <div class="size_selection_inner_mid_pos_box">
                                                <div class="size_quantity_box">
                                                    {{ selectedState.quantity[0] }}
                                                </div>
                                                <div class="updown_box">
                                                    <img class="updown_box_inner" src="@/images/etc/button_up.gif" @click="smallUp()" alt="">
                                                    <img class="updown_box_inner" src="@/images/etc/button_down.gif" @click="smallDown()" alt="">
                                                </div>
                                                <img class="delete_box" src="@/images/etc/button_delete.gif" @click="smallUnselect()" alt="">
                                            </div>
                                        </div>
                                        <div class="size_selection_inner_bot">
                                            <p> {{ smallPrice }} 원 </p>
                                        </div>
                                        
                                    </div>
                                    <div v-if="selectedState.selectedB" class="size_selection">
                                        <div class="size_selection_inner_top">
                                            <p>{{item.text}}</p>
                                            <p>Size - Medium</p>
                                        </div>
                                        <div class="size_selection_inner_mid">
                                            <div class="size_selection_inner_mid_pos_box">
                                                <div class="size_quantity_box">
                                                    {{ selectedState.quantity[1] }}
                                                </div>
                                                <div class="updown_box">
                                                    <img class="updown_box_inner" src="@/images/etc/button_up.gif" @click="mediumUp()" alt="">
                                                    <img class="updown_box_inner" src="@/images/etc/button_down.gif" @click="mediumDown()" alt="">
                                                </div>
                                                <img class="delete_box" src="@/images/etc/button_delete.gif" @click="mediumUnselect()" alt="">
                                            </div>
                                            
                                        </div>
                                        <div class="size_selection_inner_bot">
                                            <p> {{ mediumPrice }} 원 </p>
                                        </div>
                                        
                                    </div>
                                </tr>
                            </tbody>
                        </table>
                        <table class="total_price_box">
                            <tbody>
                                <tr rel="TotalPrice">
                                    <th scope="row" class="t_head">
                                        <span class="t_body_c">총 상품금액(수량):</span>
                                    </th>
                                    <td class="t_body_d">
                                        <p> {{ totalPrice }} 원 </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="buy_box">
                            <div class="buy_inner_box">
                                <span class="sub_buy" @click="buyNow()">BUY NOW</span>
                                <span class="sub_cart" @click="addToCart()">CART</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main_b">
                    <div class="b_inner_text">
                        <div class="card-body t">
                            
                        </div>
                    </div>  
                    <div class="b_inner_product_info_img_box">
                        <div class="img_position_box">
                            <div class="b_long_img_box">
                                <img :src="item.longImage[0]" class="long_image">
                                <img :src="item.longImage[1]" class="long_image">
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
        <div class="m_wrap" v-if="mobileState">
            <div class="m_outer_a">
                <div class="m_main_a">
                    <div class="m_img_box">
                            <ItemSlideShow v-for="(data, index) in slideData"
                            :key="index"
                            :img="slideData[index].img"
                            :myId="index + 1"
                            :currentId="currentId"
                            :count="slideCounts"
                            @direction="dir"
                            :startAnime="startAnime"
                            />
                    </div> 
                    <div class="m_text_box">
                        <div class="m_top_text">
                            <div class="m_t_title">
                                <p>{{ item.text }}</p>
                            </div>
                            <div class="m_t_t_info">
                                <p> {{ item.itemInfo[0] }}</p>
                                <p> {{ item.itemInfo[1] }}</p>
                            </div>
                        </div>
                        <table class="m_bot_text">
                            <tbody>
                                <tr rel="m_Product" >
                                    <th scope="row" class="m_t_head">
                                        <span>Product</span>
                                    </th>
                                    <td class="m_t_body_a">
                                        <span>{{ item.text }}</span>
                                    </td>
                                </tr>
                                <tr role="Price" >
                                    <th scope="row" class="m_t_head">
                                        <span>Price</span>
                                    </th>
                                    <td class="m_t_body_a">
                                        <span class="m_crossed">{{item.price}}</span>
                                        <span>{{item.price * 0.95}}</span>
                                    </td>
                                </tr>
                                <tr role="Material" >
                                    <th scope="row" class="m_t_head">
                                        <span>Fabric(s)</span>
                                    </th>
                                    <td class="m_t_body_a">
                                        <span>{{item.material}}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="m_size_box">
                            <tbody>
                                <tr rel="Size" >
                                    <th scope="row" class="m_t_head">Size</th>
                                    <td>
                                        <ul class="m_size_ul">
                                            <li class="m_size_li" :class="{active: selectedState.selectedA }" @click="selectedSmall()">S</li>
                                            <li class="m_size_li" :class="{active: selectedState.selectedB }" @click="selectedMedium()">M</li>
                                        </ul>
                                        <span class="m_t_body_b">[필수] 옵션을 선택해 주세요</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="m_selected_size" v-show="selectedState.selectedA || selectedState.selectedB">
                            <tbody>
                                <tr rel="m_selectedSize">
                                    <div v-if="selectedState.selectedA" class="m_size_selection">
                                        <div class="m_size_selection_inner_top">
                                            <p>{{item.text}}</p>
                                            <p>Size - Small</p>
                                        </div>
                                        <div class="m_size_selection_inner_mid">
                                            <div class="m_size_selection_inner_mid_pos_box">
                                                <div class="m_size_quantity_box">
                                                    {{ selectedState.quantity[0] }}
                                                </div>
                                                <div class="m_updown_box">
                                                    <img class="m_updown_box_inner" src="@/images/etc/button_up.gif" @click="smallUp()" alt="">
                                                    <img class="m_updown_box_inner" src="@/images/etc/button_down.gif" @click="smallDown()" alt="">
                                                </div>
                                                <img class="m_delete_box" src="@/images/etc/button_delete.gif" @click="smallUnselect()" alt="">
                                            </div>
                                        </div>
                                        <div class="m_size_selection_inner_bot">
                                            <p> {{ smallPrice }} 원 </p>
                                        </div>
                                        
                                    </div>
                                    <div v-if="selectedState.selectedB" class="m_size_selection">
                                        <div class="m_size_selection_inner_top">
                                            <p>{{item.text}}</p>
                                            <p>Size - Medium</p>
                                        </div>
                                        <div class="m_size_selection_inner_mid">
                                            <div class="m_size_selection_inner_mid_pos_box">
                                                <div class="m_size_quantity_box">
                                                    {{ selectedState.quantity[1] }}
                                                </div>
                                                <div class="m_updown_box">
                                                    <img class="m_updown_box_inner" src="@/images/etc/button_up.gif" @click="mediumUp()" alt="">
                                                    <img class="m_updown_box_inner" src="@/images/etc/button_down.gif" @click="mediumDown()" alt="">
                                                </div>
                                                <img class="m_delete_box" src="@/images/etc/button_delete.gif" @click="mediumUnselect()" alt="">
                                            </div>
                                            
                                        </div>
                                        <div class="m_size_selection_inner_bot">
                                            <p> {{ mediumPrice }} 원 </p>
                                        </div>
                                        
                                    </div>
                                </tr>
                            </tbody>
                        </table>
                        <table class="m_total_price_box">
                            <tbody class="m_totalPrice_pos_box">
                                <tr rel="m_TotalPrice">
                                    <th scope="row" class="m_price_head">
                                        <span class="m_t_body_c">총 상품금액(수량):</span>
                                    </th>
                                    <td class="m_t_body_d">
                                        <span class="m_t_body_c">{{ totalPrice }} 원</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="m_buy_box">
                            <div class="m_buy_inner_box">
                                <span class="m_sub_buy" @click="buyNow()">BUY NOW</span>
                                <span class="m_sub_cart" @click="addToCart()">CART</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m_main_b">
                    <div class="m_b_inner_text">
                        <div class="m_card-body t">
                            
                        </div>
                    </div>  
                    <div class="m_b_inner_product_info_img_box">
                        <div class="m_img_position_box">
                            <div class="m_b_long_img_box">
                                <img :src="item.longImage[0]" class="m_long_image">
                                <img :src="item.longImage[1]" class="m_long_image">
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
*{
    margin:0;
    padding: 0;
}
.wrap{
    height:100%;
}
.outer_a{
    width: 1400px;
    height: 100%;
}
/* main_a start */
.main_a{
    width: 1400px;
    /* background-color: darkblue; */
    display: flex;
    position: relative;

}
.img_layout{
    width: 130px;
    height: 800px; 
    /* background-color: grey; */
    display: flex;
    flex-direction: column;
    margin-right: 10px;
}
.inner_img{
    /* width:130px; */
    height: 158px;
    margin-bottom: 10px;
    cursor: pointer;
    /* background-color: green; */
    /* box-sizing: border-box; */
    /* border: 1px solid black; */
}
.innest_img{
    height:100%;
    
}
.img_box{
    width: 900px;
    height: 1000px;
    /* background-color: pink; */
    display: flex;
}
/* text_box start */
.text_box{
    width: 500px;
    margin-left: 25px;
    /* height: 500px; */
    display: flex;
    flex-direction: column;
}
.main_img{
    height: 100%;
}
.top_text{
    width:100%;
    height:180px;
    padding-top: 30px;
}
.t_title {
    font-size: 29px;
    font-family: "Open_Sans";
}
.t_t_info{
    margin-top: 10px;
    font-size: 20px;
    font-family: "Noto_Sans";
}
/* top text end*/
.bot_text{
    width:100%;
    height: 150px;
    /* background-color: darkgoldenrod; */
    display: flex;
    
}
.left_t{
    width:30%;
    height:100%;
    /* background-color: blanchedalmond; */
}
.right_t{
    width:70%;
    height:100%;
    /* background-color: blue; */
}
.t_head{
    width: 150px;
    /* background-color: white; */
    display: flex;
    font-size: 17px;
    font-family: "Open_Sans";
    letter-spacing: .05em;
    font-weight: 100;
    margin-bottom: 6px;
}
.t_body_a{
    font-family: "Open_Sans";
    font-size: 17px;
}
.t_body_b{
    font-family:"Noto_Sans";
    font-size: 16px;

}
.t_body_c{
    font-family: "Noto_Sans";
    font-size: 18px;
}
.t_body_d{
    font-family: "Open_Sans";
    font-size: 15px;
    
}
/* text_box end */

/* size_box start */
.size_box{
    width:500px;
    /* background-color: green; */
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid black;
    padding-bottom: 15px;
}
.size_ul{
    list-style: none;
    display: flex;
}
.size_li{
    width:35px;
    height: 35px;
    /* background-color: white; */
    box-sizing: border-box;
    border: 1px solid black;
    font-size: 15px;
    cursor: pointer;
    margin-right: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Open_Sans";
}
.active{
    background-color: grey;
}
.size_selection{
    width: 100%;
    height: 100px;
    display: flex;
}
.size_selection_inner_top{
    width: 40%;
    height: 100%;
    
}
.size_selection_inner_mid{
    width: 30%;
    height: 100%;
    
}
.size_selection_inner_mid_pos_box{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
}
.size_quantity_box{
    width:35px;
    height: 35px;
    /* background-color: white; */
    box-sizing: border-box;
    border: 1px solid black;
    font-size: 15px;
    cursor: pointer;
    margin-right: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Open_Sans";
}
.updown_box{
    width: 20px;
    height: 30px;
    display: flex;
    flex-direction: column;
}
.updown_box_inner{
    width: 100%;
    height:15px;
    cursor: pointer;
}
.delete_box{
    cursor: pointer;
    width: 15px;
    margin-left: 2px;
}
.size_selection_inner_bot{
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.size_li_selected{
    width:35px;
    height: 35px;
    /* background-color: white; */
    box-sizing: border-box;
    border: 1px solid black;
    font-size: 15px;
    cursor: pointer;
    margin-right: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Open_Sans";
    background-color: gray;
}
.total_price_box{
    width:500px;
    display: flex;
    box-sizing: border-box;
    /* border-bottom: 1px solid black; */
    padding-top: 15px;
    padding-bottom: 15px;
}
.buy_box{
    width:500px;
    /* background-color: brown; */
}
.buy_inner_box{
    width:500px;
    display: flex;
    flex-direction: column;
}
.sub_buy{
    width: 500px;
    height: 70px;
    /* background-color: green; */
    text-align: center;
    box-sizing: border-box;
    border: 1px solid black;
    font-size: 20px;
    color: black;
    text-decoration: none;
    margin-bottom: 5px;
    margin-top: 5px;
    font-family: "Noto_Sans";
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 0.3em;
    cursor: pointer;
}
.sub_cart{
    width: 500px;
    height: 70px;
    /* background-color: azure; */
    text-align: center;
    box-sizing: border-box;
    font-size: 20px;
    color: black;
    text-decoration: none;
    font-family: "Noto_Sans";
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 0.3em;
    cursor: pointer;
}
/* size_box end */
/* main_a end */
/* main_b start */
.main_b{
    width: 1400px;
    position: relative;
    /* background-color: aqua; */
}
.b_inner_text{
    width: 100%;
    /* background-color: bisque; */
}
.b_inner_product_info_img_box{
    width:100%;
    position: relative;
    margin-top: 200px;
}
.img_position_box{
    display: flex;
    justify-content: center;
}
.b_long_img_box{
    width: 1000px; 
}
.long_image{
    width:1000px;
    
}
.crossed{
    text-decoration-line: line-through;
    text-decoration-color: red;
    margin-right: 10px;
}











/*mobile start*/

.m_wrap{
    height:100%;
}
.m_outer_a{
    width: 100vw;
    height: 100%;
}
/* main_a start */
.m_main_a{
    width: 100vw;
    /* background-color: darkblue; */
    position: relative;

}
.m_img_layout{
    width: 100vw;
    height: 20vw; 
    /* background-color: grey; */
    display: flex;
    margin-top: 10px;
    margin-right: 10px;
}
.m_inner_img{
    /* width:130px; */
    height: 20vw;
    margin-right: 2px;
    cursor: pointer;
    /* background-color: green; */
    /* box-sizing: border-box; */
    /* border: 1px solid black; */
}
.m_innest_img{
    height:100%;
}
.m_img_box{
    width: 100vw;
    height: calc(133vw + 20vw + 10px);
}
/* text_box start */
.m_text_box{
    width: 100vw;
    display: flex;
    flex-direction: column;
}
.m_main_img{
    width: 100vw;
    height: 133vw;
}
.m_top_text{
    width:100%;
    height: 44vw;
    padding-top: 30px;
}
.m_t_title {
    font-size: 1.1rem;
    font-family: "Open_Sans";
}
.m_t_t_info{
    margin-top: 10px;
    font-size: 0.9rem;
    font-family: "Noto_Sans";
}
/* top text end*/
.m_bot_text{
    width:100%;
    height: 50vw;
    
    display: flex;
}
.m_left_t{
    width:20%;
    height:100%;
    /* background-color: blanchedalmond; */
}
.m_right_t{
    width:80%;
    height:100%;
    /* background-color: blue; */
}
.m_t_head{
    width: 25vw;
    display: flex;
    font-size: 0.9rem;
    font-family: "Open_Sans";
    letter-spacing: .05em;
    font-weight: 100;
}
.m_price_head{
    width: 50vw;
    display: flex;
    font-size: 0.9rem;
    font-family: "Open_Sans";
    letter-spacing: .05em;
    font-weight: 100;
}
.m_t_body_a{
    width: 75vw;
    font-family: "Open_Sans";
    font-size: 0.9rem;
}
m_t_body_a > span{

}
.m_t_body_b{
    font-family:"Noto_Sans";
    font-size: 0.9rem;
}
.m_t_body_c{
    font-family: "Noto_Sans";
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50vw;
    height: 20vw;
}
.m_t_body_d{
    width: 50vw;
    padding-left: 10px;
    font-size: 0.9rem;
    font-family: "Open_Sans";
}
/* text_box end */

/* size_box start */
.m_size_box{
    width:100vw;
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid black;
    padding-bottom: 15px;
}
.m_size_ul{
    list-style: none;
    display: flex;
}
.m_size_li{
    width:35px;
    height: 35px;
    /* background-color: white; */
    box-sizing: border-box;
    border: 1px solid black;
    font-size: 15px;
    cursor: pointer;
    margin-right: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Open_Sans";
}
.active{
    background-color: grey;
}
.m_size_selection{
    width: 100%;
    height: 100px;
    display: flex;
}
.m_size_selection_inner_top{
    width: 40%;
    height: 100%;
    
}
.m_size_selection_inner_mid{
    width: 30%;
    height: 100%;
    
}
.m_size_selection_inner_mid_pos_box{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
}
.m_size_quantity_box{
    width:35px;
    height: 35px;
    /* background-color: white; */
    box-sizing: border-box;
    border: 1px solid black;
    font-size: 15px;
    cursor: pointer;
    margin-right: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Open_Sans";
}
.m_updown_box{
    width: 20px;
    height: 30px;
    display: flex;
    flex-direction: column;
}
.m_updown_box_inner{
    width: 100%;
    height:15px;
    cursor: pointer;
}
.m_delete_box{
    cursor: pointer;
    width: 15px;
    margin-left: 2px;
}
.m_size_selection_inner_bot{
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.m_size_li_selected{
    width:35px;
    height: 35px;
    /* background-color: white; */
    box-sizing: border-box;
    border: 1px solid black;
    font-size: 15px;
    cursor: pointer;
    margin-right: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Open_Sans";
    background-color: gray;
}
.m_total_price_box{
    width: 100vw;
    margin-top: 10px;
    box-sizing: border-box;
    display: flex;
    /* border-bottom: 1px solid black; */
    padding-top: 15px;
    padding-bottom: 15px;
}

.m_buy_box{
    width:100vw;
    /* background-color: brown; */
}
.m_buy_inner_box{
    width:100vw;
    display: flex;
    flex-direction: column;
}
.m_sub_buy{
    width: 100vw;
    height: 70px;
    /* background-color: green; */
    text-align: center;
    box-sizing: border-box;
    border: 1px solid black;
    font-size: 20px;
    color: black;
    text-decoration: none;
    margin-bottom: 5px;
    margin-top: 5px;
    font-family: "Noto_Sans";
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 0.3em;
    cursor: pointer;
}
.m_sub_cart{
    width: 100vw;
    height: 70px;
    /* background-color: azure; */
    text-align: center;
    box-sizing: border-box;
    font-size: 20px;
    color: black;
    text-decoration: none;
    font-family: "Noto_Sans";
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 0.3em;
    cursor: pointer;
}
/* size_box end */
/* main_a end */
/* main_b start */
.m_main_b{
    width: 100vw;
    position: relative;
    /* background-color: aqua; */
}
.m_b_inner_text{
    width: 100%;
    /* background-color: bisque; */
}
.m_b_inner_product_info_img_box{
    width:100%;
    position: relative;
    margin-top: 200px;
}
.m_img_position_box{
    display: flex;
    justify-content: center;
}
.m_b_long_img_box{
    width: 100vw;
}
.m_long_image{
    width: 100vw;
    
}
.m_crossed{
    text-decoration-line: line-through;
    text-decoration-color: red;
    margin-right: 10px;
}


/*mobile end*/
</style>