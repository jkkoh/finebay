<template>
    <div>
        <div class="wrap" v-if="!mobileState">
            <div class="main_wrap">
                <div class="inner_wrap">
                    <div class="customer_info">
                        <div class="top">
                            <span class="inner_top">주문정보</span>
                        </div>
                        <div class="customer_bot">
                            <div class="reglar_size_box">
                                <div class="customer_bot_left">
                                    <span>주문자</span>
                                </div>
                                <div class="customer_bot_right">
                                    <input type="text" class="regular_input" v-model="buyData['customerName']">
                                </div>
                            </div>
                            <div class="reglar_size_box">
                                <div class="customer_bot_left">
                                    <span>이메일</span>
                                </div>
                                <div class="customer_bot_right">
                                    <input type="text" class="regular_input" v-model="buyData['customerEmail']">
                                </div>
                            </div>
                            <div class="phone_size_box">
                                <div class="customer_bot_left">
                                    <span>전화번호</span>
                                </div>
                                <div class="phone_number_bot_right">
                                    <input type="tel" class="phone" pattern="[0-9]" v-model="buyData['customerPhoneNumber']">
                                </div>
                            </div>
                            <div class="large_size_box">
                                <div class="customer_bot_left">
                                    <span>주소</span>
                                </div>
                                <div class="address_bot_right">
                                    <div class="top_address_box">
                                        <div class="post_code_box">
                                            <input type="text" placeholder="우편번호" class="address_1" v-model="buyData['customerPostCode']">
                                        </div>
                                        <div class="address_search_box">
                                            <span class="search_btn" @click="execDaumPostcode()">주소검색</span>
                                        </div>
                                    </div>
                                    <div class="mid_address_box">
                                        <input type="text" placeholder="기본 주소" class="address_2" v-model="buyData['customerAddress']">
                                    </div>
                                    <div class="bot_address_box">
                                        <input type="text" placeholder="나머지 주소" class="address_2" v-model="buyData['customerAddress1']">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="delivery_info">
                        <div class="top">
                            <span class="inner_top">배송지</span>
                        </div>
                        <div class="delivery_bot">
                            <div class="regular_size_box">
                                <div class="delivery_check">
                                    <div class="checked1">
                                        <input type="radio" name="check" @click="deliveryCheck()" v-model="deliveryChecked">
                                        <span>주문자 정보와 동일</span>
                                    </div>
                                    <div class="checked2">
                                        <input type="radio" name="check" @click="deliveryCheck1()" v-model="deliveryChecked1">
                                        <span>새로운 배송지</span>
                                    </div>
                                </div>
                            </div>
                            <div class="reglar_size_box">
                                <div class="customer_bot_left">
                                    <span>받는사람</span>
                                </div>
                                <div class="customer_bot_right">
                                    <input type="text" class="regular_input" v-model="buyData['deliveryName']">
                                </div>
                            </div>
                            <div class="large_size_box">
                                <div class="customer_bot_left">
                                    <span>주소</span>
                                </div>
                                <div class="address_bot_right">
                                    <div class="top_address_box">
                                        <div class="post_code_box">
                                            <input type="text" placeholder="우편번호" class="address_1" v-model="buyData['deliveryPostCode']">
                                        </div>
                                        <div class="address_search_box">
                                            <span class="search_btn" @click="execDaumPostcode1()">주소검색</span>
                                        </div>
                                    </div>
                                    <div class="mid_address_box">
                                        <input type="text" placeholder="기본 주소" class="address_2" v-model="buyData['deliveryAddress']">
                                    </div>
                                    <div class="bot_address_box">
                                        <input type="text" placeholder="나머지 주소" class="address_2" v-model="buyData['deliveryAddress1']">
                                    </div>
                                </div>
                            </div>
                            <div class="phone_size_box">
                                <div class="customer_bot_left">
                                    <span>전화번호</span>
                                </div>
                                <div class="phone_number_bot_right">
                                    <input type="tel" class="phone" pattern="[0-9]" v-model="buyData['deliveryPhoneNumber']">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product_info">
                        <div class="top">
                            <span class="inner_top">주문상품</span>
                        </div>
                        <div class="product_bot">
                            <div v-for="(item, index) in displayCart" :key="index" >
                                <div v-for="(aitem, aindex) in displayBuy" :key="aindex">
                                    <div v-if="item['id'] == aitem['id'] && item['size'][0] == aitem['size']">
                                        <div v-if="item['quantity'][0]" class="for_box">
                                            <div class="for_pos_box">
                                                <div class="img_box">
                                                    <img :src="item['image']" alt="" class="item_image">
                                                </div>
                                                <div class="info_box">
                                                    <span> 상품명 : {{item['name']}}</span>
                                                    <span> 사이즈 : {{item['size'][0]}}</span>
                                                    <span> 수량 : {{item['quantity'][0]}}</span>
                                                    <div v-if="item['discount'] !== 0 "> <span>가격 :</span> <span class="crossed"> {{ item['price'] }} </span> <span>-{{ item['discount'] }}% 할인 =></span> <span>{{ item['price'] * ((100 - item['discount']) / 100) }}</span> </div>
                                                    <div v-if="item['discount'] == 0 "> <span>가격 :</span><span>{{ item['price'] }}</span></div>
                                                </div>
                                                <div class="deletea_box">
                                                    <span>삭제</span>
                                                    <span @click="removeItem(item['id'])">X</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="item['id'] == aitem['id'] && item['size'][1] == aitem['size']">
                                        <div v-if="item['quantity'][1]" class="for_box">
                                            <div class="for_pos_box">
                                                <div class="img_box">
                                                    <img :src="item['image']" alt="" class="item_image">
                                                </div>
                                                <div class="info_box">
                                                    <span> 상품명 : {{item['name']}}</span>
                                                    <span> 사이즈 : {{item['size'][1]}}</span>
                                                    <span> 수량 : {{item['quantity'][1]}}</span>
                                                    <div v-if="item['discount'] !== 0 "> <span>가격 :</span> <span class="crossed"> {{ item['price'] }} </span> <span>-{{ item['discount'] }}% 할인 =></span> <span>{{ item['price'] * ((100 - item['discount']) / 100) }}</span> </div>
                                                    <div v-if="item['discount'] == 0 "> <span>가격 :</span><span>{{ item['price'] }}</span></div>
                                                </div>
                                                <div class="deletea_box">
                                                    <span>삭제</span>
                                                    <img src="@/images/etc/button_delete.gif" alt="delete_item" @click="removeItem(item['id'])" class="delete_btn">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sales_info">
                        <div class="top">
                            <span class="inner_top">할인정보</span>
                        </div>
                        <div class="sales_bot">
                            <div class="customer_bot_left">
                                <span>할인코드</span>
                            </div>
                            <div class="sales_bot_right">
                                <input type="text" class="sales_input_box"><button class="apply_btn">적용</button>
                            </div>
                        </div>
                        <div class="sales_applied">
                            <div class="customer_bot_left">
                                <span>적용금액</span>
                            </div>
                            <div class="discounted_price_box">
                                <span class="red_discounted">-0</span>
                            </div>
                        </div>
                    </div>
                    <div class="price_info">
                        <div class="top">
                            <span class="inner_top">결제정보</span>
                        </div>
                        <div class="price_info_bot">
                            <div class="price_info_bot_left">
                                <div class="inner_info_bot_left">
                                    <span class="price_info_left1">주문상품</span>
                                    <span class="price_info_left1">배송비</span>
                                    <span class="price_info_left1">기본할인</span>
                                    <span class="price_info_left1">추가할인</span>
                                </div>
                                <span class="price_info_left2">최종 결제 금액</span>
                            </div>
                            <div class="price_info_bot_right">
                                <div class="inner_info_bot_right">
                                    <div class="cart_addition_box">
                                        <div v-for="(item, index) in displayCart" :key="index">
                                            <div v-for="(aitem, aindex) in displayBuy" :key="aindex">
                                                <div v-if="item['id'] == aitem['id'] && item['size'][0] == aitem['size']">
                                                    <span class="price_info_right1"> {{ item['price'] * item['quantity'][0] }} </span>
                                                </div>
                                                <div v-if="item['id'] == aitem['id'] && item['size'][1] == aitem['size']">
                                                    <span class="price_info_right1"> {{ item['price'] * item['quantity'][1] }} </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <span class="price_info_right1">무료</span>
                                    <span class="price_info_right1">-5%</span>
                                </div>
                                <div class="inner_info_final_price">
                                    <span class="price_info_right2">{{ total1 }} - {{ total2 }} = {{ total }}</span>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="payment_info">
                        <div class="top">
                            <span class="inner_top">결제수단</span>
                        </div>
                        <div class="payment_info_bot">
                            <div class="payment_card">
                                <input type="radio" class="card_checked" name="payment">
                                <span>카드 결제</span>
                            </div>
                            <div class="payment_kakao">
                                <input type="radio" class="kakao_checked" name="payment">
                                <span>카카오페이</span>
                            </div>
                        </div>
                    </div>
                    <div class="buy">
                        <button @click="buyzzz()" class="buy_btn">{{ total }}원 결제하기</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="mobileState" class="m_wrap">
            <div class="m_main_wrap">
                <div class="m_inner_wrap">
                    <div class="m_customer_info">
                        <div class="mo_top">
                            <span class="m_inner_top">주문자 정보</span>
                        </div>
                        <div class="m_customer_bot">
                            <div class="m_reglar_size_box">
                                <div class="m_customer_bot_left">
                                    <span>주문자</span>
                                </div>
                                <div class="m_customer_bot_right">
                                    <input type="text" class="m_regular_input" v-model="buyData['customerName']">
                                </div>
                            </div>
                            <div class="m_reglar_size_box">
                                <div class="m_customer_bot_left">
                                    <span>이메일</span>
                                </div>
                                <div class="m_customer_bot_right">
                                    <input type="text" class="m_regular_input" v-model="buyData['customerEmail']">
                                </div>
                            </div>
                            <div class="m_phone_size_box">
                                <div class="m_customer_bot_left">
                                    <span>전화번호</span>
                                </div>
                                <div class="m_phone_number_bot_right">
                                    <input type="tel" class="m_phone" pattern="[0-9]" v-model="buyData['customerPhoneNumber']" placeholder="-제외">
                                </div>
                            </div>
                            <div class="m_large_size_box">
                                <div class="m_add_pos_box">
                                    <div class="m_add_bot_left">
                                        <span>주소</span>
                                    </div>
                                </div>
                                <div class="m_address_bot_right">
                                    <div class="m_top_address_box">
                                        <div class="m_post_code_box">
                                            <input type="text" placeholder="우편번호" class="m_address_1" v-model="buyData['customerPostCode']">
                                        </div>
                                        <div class="m_address_search_box">
                                            <span class="material-icons md-20 m_search_btn"  @click="execDaumPostcode()">search</span>
                                        </div>
                                    </div>
                                    <div class="m_mid_address_box">
                                        <input type="text" placeholder="기본 주소" class="m_address_2" v-model="buyData['customerAddress']">
                                    </div>
                                    <div class="m_bot_address_box">
                                        <input type="text" placeholder="나머지 주소" class="m_address_2" v-model="buyData['customerAddress1']">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="m_delivery_info">
                        <div class="mo_top">
                            <span class="m_inner_top">배송지</span>
                        </div>
                        <div class="m_delivery_bot">
                            <div class="m_regular_size_box">
                                <div class="m_delivery_check">
                                    <div class="m_checked1">
                                        <input type="radio" name="check" @click="deliveryCheck()" v-model="deliveryChecked">
                                        <span>주문자 정보와 동일</span>
                                    </div>
                                    <div class="m_checked2">
                                        <input type="radio" name="check" @click="deliveryCheck1()" v-model="deliveryChecked1">
                                        <span>새로운 배송지</span>
                                    </div>
                                </div>
                            </div>
                            <div class="m_reglar_size_box">
                                <div class="m_customer_bot_left">
                                    <span>받는사람</span>
                                </div>
                                <div class="m_customer_bot_right">
                                    <input type="text" class="m_regular_input" v-model="buyData['deliveryName']">
                                </div>
                            </div>
                            <div class="m_phone_size_box">
                                <div class="m_customer_bot_left">
                                    <span>전화번호</span>
                                </div>
                                <div class="m_phone_number_bot_right">
                                    <input type="tel" class="m_phone" pattern="[0-9]" v-model="buyData['deliveryPhoneNumber']"  placeholder="-제외">
                                </div>
                            </div>
                            <div class="m_large_size_box">
                                <div class="m_add_pos_box">
                                    <div class="m_add_bot_left">
                                        <span>주소</span>
                                    </div>
                                </div>
                                <div class="m_address_bot_right">
                                    <div class="m_top_address_box">
                                        <div class="m_post_code_box">
                                            <input type="text" placeholder="우편번호" class="m_address_1" v-model="buyData['deliveryPostCode']">
                                        </div>
                                        <div class="m_address_search_box">
                                            <span class="material-icons md-20 m_search_btn"  @click="execDaumPostcode1()">search</span>
                                        </div>
                                    </div>
                                    <div class="m_mid_address_box">
                                        <input type="text" placeholder="기본 주소" class="m_address_2" v-model="buyData['deliveryAddress']">
                                    </div>
                                    <div class="m_bot_address_box">
                                        <input type="text" placeholder="나머지 주소" class="m_address_2" v-model="buyData['deliveryAddress1']">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="m_product_info">
                        <div class="mo_top">
                            <span class="m_inner_top">주문상품</span>
                        </div>
                        <div class="m_product_bot">
                            <div v-for="(item, index) in displayCart" :key="index" >
                                <div v-for="(aitem, aindex) in displayBuy" :key="aindex">
                                    <div v-if="item['id'] == aitem['id'] && item['size'][0] == aitem['size']">
                                        <div v-if="item['quantity'][0]" class="m_for_box">
                                            <div class="m_for_pos_box">
                                                <div class="m_img_box">
                                                    <img :src="item['image']" alt="" class="m_item_image">
                                                </div>
                                                <div class="m_info_box">
                                                    <span> 상품명 : {{item['name']}}</span>
                                                    <span> 사이즈 : {{item['size'][0]}}</span>
                                                    <span> 수량 : {{item['quantity'][0]}}</span>
                                                    <div v-if="item['discount'] !== 0"> <span>￦</span> <span class="crossed"> {{ item['price'] }} </span> <span>-{{ item['discount'] }}% </span> <span>￦ </span> <span>{{ item['price'] * ((100 - item['discount']) / 100) }}</span> </div>
                                                    <div v-if="item['discount'] == 0"> <span>￦</span>{{ item['price'] }}</div>
                                                </div>
                                                <div class="m_deletea_box">
                                                    <span class="material-icons md-20" @click="removeItem(item['id'])" style="fontSize:30px">close</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="item['id'] == aitem['id'] && item['size'][1] == aitem['size']">
                                        <div v-if="item['quantity'][1]" class="m_for_box">
                                            <div class="m_for_pos_box">
                                                <div class="m_img_box">
                                                    <img :src="item['image']" alt="" class="m_item_image">
                                                </div>
                                                <div class="m_info_box">
                                                    <span>{{item['name']}}</span>
                                                    <span>{{item['size'][1]}}</span>
                                                    <span> 수량 : {{item['quantity'][1]}}</span>
                                                    <div v-if="item['discount'] !== 0" style="color:red;"> 
                                                        <span>[{{ item['discount'] }}%] </span>
                                                        <span>￦</span>
                                                        <span>{{ item['price'] * ((100 - item['discount']) / 100) }}</span> 
                                                    </div>
                                                    <div v-if="item['discount'] == 0">
                                                        <span>￦</span>{{ item['price'] }}
                                                    </div>
                                                    <div v-if="selectedCoupon['discount']" style="color:red;">
                                                        <p>쿠폰가: ￦{{ (item['price'] * ((100 - item['discount']) / 100)) * (1 - (selectedCoupon['discount'] / 100)) }}</p>
                                                    </div>
                                                </div>
                                                <div class="m_deletea_box">
                                                    <span class="material-icons md-20" @click="removeItem(item['id'])" style="fontSize:30px">close</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="m_sales_info">
                        <div class="mo_top">
                            <span class="m_inner_top">쿠폰/포인트</span>
                        </div>
                        <div class="m_sales_bot" >
                            <div class="m_reglar_size_box">
                                <div class="m_customer_bot_left">
                                    <span>쿠폰</span>
                                </div>
                                <div v-if="userCouponState.length !== 0 " class="m_customer_bot_right">
                                    <select v-model="selectedCoupon" class="m_coupon_select">
                                        <option value="">선택 안함</option>
                                        <option v-for="(option , index) in userCouponState" :value="{'discount': option.discount, 'maximum' : option.maximum}" :key="index">
                                            {{ option.description }}
                                        </option>
                                    </select>
                                </div>
                                <div v-if="userCouponState.length == 0 ">
    
                                </div>
                            </div>
                            <!-- <div class="m_reglar_size_box">
                                <div class="m_customer_bot_left">
                                    <span>할인률</span>
                                </div>
                                <div class="m_sales_bot_right">
                                    <span>{{ selectedCoupon.discount }}% </span>
                                    <input type="text" class="m_sales_input_box"><button class="apply_btn" @click="aaaaa()">적용</button>
                                    <input type="text" class="m_sales_input_box"><button class="apply_btn" @click="bbbbb()">만들기</button>
                                </div>
                            </div> -->
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

import { useAuthStore, type BuyData } from '../stores/auth';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBuyStore, useCartStore, useInicisStore } from '../stores/cartStore'
import { storeToRefs } from 'pinia'
import { onMounted, computed } from 'vue'
import { type DisplayCart, type DisplayBuy} from '../types/interfaces'
import { items } from '../assets/items'
import { API, Auth } from 'aws-amplify'
import axios from 'axios'
import dayjs from 'dayjs'


const authStore = useAuthStore()
const router = useRouter()
const cartStore = useCartStore()
const buyStore = useBuyStore()
const inicisStore = useInicisStore()
const {buy, displayBuy } = storeToRefs(buyStore)
const {cart, displayCart} = storeToRefs(cartStore)

onMounted(()=>{
    cartStore.loadCartInstance()
    cartStore.displayCartLoad()
    buyStore.loadBuyInstance()
    buyStore.displayBuyLoad()
    inicisStore.loadInicisInstance()
    aaaaa()
})


function removeItem(id:number){
    cartStore.removeFromCart(id)
    buyStore.removeFromBuy(id)
}

const buyData = reactive<BuyData>({
    customerName: "",
    customerEmail: "",
    customerPhoneNumber: "",
    customerPostCode:"",
    customerAddress:"",
    customerAddress1:"",
    deliveryEmail: "",
    deliveryName:"",
    deliveryPostCode:"",
    deliveryAddress:"",
    deliveryAddress1:"",
    deliveryPhoneNumber:"",
    productInfo:"",
    salesInfo:[],
    priceInfoActualPrice:[],
    priceInfoDeliveryFee:0,
    priceInfoDiscount:0,
    priceInfoFinalPrice:0,
    paymentInfoType:""
})
interface CouponType {
    code : string
    description : string
    discount : number
    maximum : number
    used : boolean
    expires : string
}
const userCouponState = ref<Array<CouponType>>([])
let deliveryChecked = false;
let deliveryChecked1 = false;
const selectedCoupon = ref({})
const couponForNum = ref(1)

function deliveryCheck(){
    console.log('abc')
    console.log(deliveryChecked)
    if(!deliveryChecked){
        console.log('1234')
        deliveryChecked1 = false;
        buyData.deliveryPostCode = buyData.customerPostCode 
        buyData.deliveryEmail = buyData.customerEmail 
        buyData.deliveryAddress = buyData.customerAddress
        buyData.deliveryAddress1 = buyData.customerAddress1
        buyData.deliveryName = buyData.customerName
        buyData.deliveryPhoneNumber = buyData.customerPhoneNumber
    }
}
function deliveryCheck1(){
    console.log('abc')
    console.log(deliveryChecked1)
    if(!deliveryChecked1){
        console.log('5678')
        deliveryChecked = false;
        buyData.deliveryPostCode = ""
        buyData.deliveryEmail = ""
        buyData.deliveryAddress = ""
        buyData.deliveryAddress1 = ""
        buyData.deliveryName = ""
        buyData.deliveryPhoneNumber = ""
    }
}

function execDaumPostcode() {
    new window.daum.Postcode({
    oncomplete: (data: any) => {
      const zoneCode : string = data.zonecode;
      const roadAdd : string = data.address;
      const buildingAdd : string = data.buildingName;
      buyData.customerPostCode = zoneCode;
      buyData.customerAddress = roadAdd;
      buyData.customerAddress1 = buildingAdd;
    }
  }).open(); 
}
function execDaumPostcode1() {
    new window.daum.Postcode({
    oncomplete: (data: any) => {
      const zoneCode : string = data.zonecode;
      const roadAdd : string = data.address;
      const buildingAdd : string = data.buildingName;
      buyData.deliveryPostCode = zoneCode;
      buyData.deliveryAddress = roadAdd;
      buyData.deliveryAddress1 = buildingAdd;
    }
  }).open(); 
}

async function aaaaa(){
    const aaa = await Auth.currentUserInfo().then(res=>{
        const userCoupon = res.attributes['custom:coupon']
        console.log('without jsonparse : ',userCoupon)
        console.log('with jsonparse : ', JSON.parse(userCoupon))
        return JSON.parse(userCoupon)
    })
    console.log('userCouponState before change is ', userCouponState.value)
    console.log('userCouponState type before change is ', typeof(userCouponState.value))
    console.log('current aaaa is : ', aaa)
    userCouponState.value = aaa
    // let i = 0;
    // for(i = 0; i < aaa.length; i++){
    //     console.log(i)
    //     console.log('the aaa value is : ', aaa[i])
    // }
}
async function bbbbb(){
    let user = await Auth.currentAuthenticatedUser();
    console.log(user)
    const currentTime = dayjs()
    console.log('current time is : ', currentTime.format("YYYY.MM.DD HH:mm:ss"))
    const addedTime = currentTime.add(6, "M")
    console.log('added time is : ',addedTime.format("YYYY.MM.DD HH:mm:ss"))
    const qwert = [{
        code : 'abcdefgh',
        description : 'WebPage Open 20% coupon',
        discount : 20,
        maximum : 50000,
        used : false,
        expires : addedTime.format("YYYY.MM.DD HH:mm:ss")
    },
    {
        code : 'wwwwwwwwwww',
        description : 'ddddddddddddddd Open 20% coupon',
        discount : 20,
        maximum : 50000,
        used : false,
        expires : addedTime.format("YYYY.MM.DD HH:mm:ss")
    },
    {
        code : 'ssssssssssssssssssss',
        description : 'eeeeeeeeeee Open 20% coupon',
        discount : 20,
        maximum : 50000,
        used : false,
        expires : addedTime.format("YYYY.MM.DD HH:mm:ss")
    }]
    console.log('the type of qwert is : ', typeof(qwert))
    console.log(qwert)
    const wert = JSON.stringify(qwert)
    console.log('the type of wert is : ', typeof(wert))
    console.log(wert)
    Auth.updateUserAttributes(user,{
        'custom:coupon': wert
    })
}

const total = computed(()=>{

    let sum = (displayCart.value as DisplayCart[]).reduce((initialSum: number, item:DisplayCart)=>{
        let i = 0;
        let aitem = displayBuy.value as DisplayBuy[]

        for(i = 0; i < aitem.length; i++){
                if(aitem[i].id == item.id && item.size[0] == 'small'){
                initialSum =  initialSum + (item.price * item.quantity[0] * 0.95)
            }
            else if(aitem[i].id == item.id && item.size[1] == 'medium'){
                initialSum =  initialSum + (item.price * item.quantity[1] * 0.95)
            }
        }
        return initialSum   
    },0);
    return sum
})

const total1 = computed(()=>{

let sum = (displayCart.value as DisplayCart[]).reduce((initialSum: number, item:DisplayCart)=>{
    let i = 0;
    let aitem = displayBuy.value as DisplayBuy[]

    for(i = 0; i < aitem.length; i++){
            if(aitem[i].id == item.id && item.size[0] == 'small'){
            initialSum =  initialSum + (item.price * item.quantity[0])
        }
        else if(aitem[i].id == item.id && item.size[1] == 'medium'){
            initialSum =  initialSum + (item.price * item.quantity[1])
        }
    }
    return initialSum   
},0);
return sum
})

const total2 = computed(()=>{

let sum = (displayCart.value as DisplayCart[]).reduce((initialSum: number, item:DisplayCart)=>{
    let i = 0;
    let aitem = displayBuy.value as DisplayBuy[]

    for(i = 0; i < aitem.length; i++){
            if(aitem[i].id == item.id && item.size[0] == 'small'){
            initialSum =  initialSum + (item.price * item.quantity[0] * (1 - (item.discount / 100)))
        }
        else if(aitem[i].id == item.id && item.size[1] == 'medium'){
            initialSum =  initialSum + (item.price * item.quantity[1] * (1 - (item.discount / 100)))
        }
    }
    return initialSum   
},0);
return sum
})

async function buyEvent(){
    buyData.priceInfoFinalPrice = total.value
    const sendPrice = total.value.toString()
    let aitem = displayBuy.value as DisplayBuy[]
    let i = 0;
    for(i = 0; i < aitem.length; i++){
        console.log(aitem[i].id)
        console.log(items[aitem[i].id].text)
        buyData.productInfo = buyData.productInfo + items[aitem[i].id].text + ' '
        console.log(buyData.productInfo)
    }
    inicisStore.addToInicis({goodname: buyData.productInfo, buyername: buyData.deliveryName, buyertel: buyData.deliveryPhoneNumber, buyeremail: buyData.deliveryEmail, price: sendPrice})
    
    router.push({name: "/inicis/pay/page"})



    // alert('구매가 완료되었습니다')
    // router.replace({name: "home"})
}
async function buyzzz(){
    buyData.priceInfoFinalPrice = total.value
    const sendPrice = total.value.toString()
    let aitem = displayBuy.value as DisplayBuy[]
    let i = 0;
    for(i = 0; i < aitem.length; i++){
        console.log(aitem[i].id)
        console.log(items[aitem[i].id].text)
        buyData.productInfo = buyData.productInfo + items[aitem[i].id].text + ' '
        console.log(buyData.productInfo)
    }

    if(buyData.deliveryEmail !== '' && buyData.deliveryPhoneNumber !== ''
    && buyData.deliveryAddress !== '' && buyData.deliveryPostCode !== ''
    && sendPrice !== '' && buyData.productInfo !== ''){
        const IMP = window.IMP;
        const aaa = Math.random()*10000000
        const n_id = parseInt(aaa.toString()) 
        const m_id = n_id.toString()
        const priceToBePaid = parseInt(sendPrice)
        console.log(m_id)
        IMP.init("imp75261015");
        axios({
            url: "https://pb52jtpjg2.execute-api.ap-northeast-2.amazonaws.com/payment/precheck",
            method: "post",
            headers: {"Content-Type": "application/json"},
            data: {
                merchant_uid: m_id,
                amount : priceToBePaid
            }
        });
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        IMP.request_pay({
            pg : "html5_inicis.INIpayTest",
            pay_method : "card",
            merchant_uid : m_id,
            name: buyData.productInfo,
            amount : priceToBePaid,
            buyer_email : buyData.deliveryEmail,
            buyer_name : buyData.deliveryName,
            buyer_tel: buyData.deliveryPhoneNumber,
            buyer_addr: buyData.deliveryAddress,
            buyer_postcode: buyData.deliveryPostCode
        }, function (rsp){
            if (rsp.success){
                console.log('success')
                axios({
                    url:"https://pb52jtpjg2.execute-api.ap-northeast-2.amazonaws.com/payment/check",
                    method: "post",
                    headers: {"Content-Type":"application/json"},
                    data: {
                        imp_uid : rsp.imp_uid,
                        merchant_uid : rsp.merchant_uid,
                    }
                }).then((data)=> {
                    console.log(data)
                })
            }else{
                alert(`결제에 실패하였습니다. 에러네용 :  ${rsp.error_msg}`)
            }
        })
    }else{
        alert('모든 구매 항목을 확인해주세요')
    }
}


</script>

<script lang="ts">
import { defineComponent } from 'vue';
import MobileDetect from 'mobile-detect';
export default defineComponent({
    mounted() {
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js')
        document.head.appendChild(recaptchaScript)
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
            mobileState : false,
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
.inner_wrap{
    width:1000px;
    margin-top: 50px;
}
.customer_info{
    width: 100%;
    height: 600px;
    box-sizing: border-box;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
}
.delivery_info{
    width: 100%;
    height: 600px;
    box-sizing: border-box;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
}
.product_info{
    width: 100%;
    box-sizing: border-box;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
}
.sales_info{
    width: 100%;
    height: 600px;
    box-sizing: border-box;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
}
.price_info{
    width: 100%;
    height: 600px;
    box-sizing: border-box;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
}
.payment_info{
    width: 100%;
    height: 600px;
    box-sizing: border-box;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
}
.buy{
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 45px;
    cursor: pointer;
}
.top{
    width: 100%;
    height: 70px;
    background-color: #595959;
    display: flex;
    align-items: center;
    color: white;
}
.inner_top{
    font-size: 24px;
    margin-left: 25px;
}
.customer_bot{
    width: 100%;
    display: flex;
    flex-direction: column;
}
.reglar_size_box{
    width: 100%;
    height: 100px;
    display: flex;
}
.large_size_box{
    width: 100%;
    height: 200px;
    display: flex;
}
.customer_bot_left{
    width: 20%;
    height: 100%;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.customer_bot_right{
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
}
.regular_input{
    margin-left: 2.5%;
    font-size: 40px;
    border-radius: 10px;
    border: 0.2px solid rgba(100, 100, 100, 0.5);
    width: 95%;
    height: 50%;
    padding-left: 20px;
}
.left_phone{
    width: 100px;
}
.mid_phone{
    width: 100px;
}
.right_phone{
    width: 100px;
}
.dash_box{
    font-size: 30px;
    margin-left: 3px;
    margin-right: 3px;
}

.phone_size_box{
    width: 100%;
    height: 100%;
    display: flex;
}
.phone_number_bot_right{
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 20px;
}

.sales_bot{
    display: flex;
}
.sales_input_box{
    width:500px;
    height: 100%;
    margin-left: 10px;
}
.apply_btn{
    width:50px;
    height: 100%;
    margin-left: 2px;
}
.sales_applied{
    display: flex;
    justify-content: space-between;
}
.red_discounted{
    margin-right: 10px;
    font-size: 24px;
}


.top_address_box{
    display: flex;
    height: 60px;
    width: 100%;
    align-items: center;
}
.mid_address_box{
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
}
.bot_address_box{
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
}
.search_btn{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 50px;
    background-color: darkkhaki;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid black;
    cursor: pointer;
}

.delivery_check{
    display: flex;
}
.checked1{
    margin-left: 10px;
    font-size: 20px;
}
.checked2{
    margin-left: 10px;
    font-size: 20px;
}

.address_bot_right{
    margin-left: 2.5%;
    width: 80%;
    display: flex;
    flex-direction: column;
}
.address_1{
    height: 50px;
    width: 100%;
    font-size: 20px;
    border-radius: 10px;
    border: 0.2px solid rgba(100, 100, 100, 0.5);
}
.address_2{
    height: 50px;
    width: 100%;
    font-size: 20px;
    border-radius: 10px;
    border: 0.2px solid rgba(100, 100, 100, 0.5);
    margin-right: 2.5%;
}

.product_bot{
    width: 100%;
    display: flex;
    flex-direction: column;
}
.for_box{
    display: flex;
    width: 1000px;
    flex-direction: column;
    box-sizing: border-box;
    border: 1px solid black;
}
.img_box{
    width: 150px;
    height: 200px;
    margin-left: 10px;
    margin-top: 10px;
}
.item_image{
    width: 150px;
}
.for_pos_box{
    display: flex;
}
.info_box{
    width: 650px;
    height: 200px;
    margin-top: 10px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.deletea_box{
    width: 150px;
    height: 200px;
    margin-top: 10px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}


.sales_bot_right{
    width: 100%;
}
.price_info_bot{
    display: flex;
    justify-content: space-between;
}
.price_info_bot_left{
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 300px;
    justify-content: space-between;
}
.price_info_left1{
    width: 120px;
    height: 40px;
    font-size: 20px;
    display: flex;
    align-items: center;
    margin-left: 10px;
}
.price_info_left2{
    width: 250px;
    height: 60px;
    font-size: 30px;
    margin-left: 10px;
}
.price_info_bot_right{
    display: flex;
    flex-direction: column;
    width: 300px;
    justify-content: space-between;
}
.inner_info_bot_right{
    display: flex;
    flex-direction: column;
    align-items: end;
}
.price_info_right1{
    width: 120px;
    height: 40px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: end;
    margin-right: 10px;
}
.price_info_right2{
    width: 400px;
    height: 60px;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: end;
    margin-right: 10px;
}
.inner_info_final_price{
    display: flex;
    flex-direction: column;
    align-items: end;
}

.payment_info_bot{
    width: 100%;
    height: 150px;
}
.payment_card{
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
    font-size: 30px;
    margin-left: 10px;
}
.payment_kakao{
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
    font-size: 30px;
    margin-left: 10px;
}
.card_checked{
    width: 15px;
    height: 15px;
    margin-right: 10px;
}
.kakao_checked{
    width: 15px;
    height: 15px;
    margin-right: 10px;
}
.crossed{
    text-decoration-line: line-through;
    text-decoration-color: red;
}
.cart_addition_box{
    width: 700px;
    display: flex;
    justify-content: end;
}
.delete_btn{
    cursor: pointer;
    width: 15px;
    margin-left: 3px;
}
.buy_btn{
    width : 100%;
    height: 100%;
    border: 1px solid black;
    border-top: none;
    background-color: #595959;
    color: white;
}

/*mobile start*/
.m_customer_info{
}
.mo_top{
    color: black;
    font-weight: 550;
    font-size: 18px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 65px;
    box-sizing: border-box;
    border-top: 2px solid black;
    border-bottom: 1px solid rgba(100, 100, 100, 0.5);
    padding-left: 10px;
}
.m_customer_bot{
    width: 95%;
    margin-left: 2.5%;
}
.m_customer_bot_left{
    width: 25%;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 400;
}
.m_customer_bot_right{
    width: 75%;
    display: flex;
    align-items: center;
    height: 40px;
}
.m_regular_input{
    width: 100%;
    height: 100%;
    padding-left: 10px;
    font-size: 14px;
}
.m_reglar_size_box{
    width:100%;
    display: flex;
    height: 55px;
    align-items: center;
}
.m_phone_size_box{
    width: 100%;
    display: flex;
    height: 55px;
    align-items: center;
}
.m_phone_number_bot_right{
    width: 75%;
    height: 40px;
    display: flex;
    align-items: center;
}
.m_phone{
    width: 100%;
    height: 100%;
    padding-left: 10px;
    font-size: 14px;
}
.m_large_size_box{
    width: 100%;
    display: flex;
}
.m_address_bot_right{
    width: 75%;
}
.m_add_pos_box{
    width: 25%;
    height: 55px;
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 400;
}
.m_add_bot_left{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 400;
}
.m_top_address_box{
    width: 100%;
    display: flex;
    height: 55px;
    align-items: center;
}
.m_post_code_box{
    width: calc(100% - 40px);
    height: 40px;
}
.m_address_search_box{
    width: 40px;
    height: 40px;
}
.m_address_1{
    width: 100%;
    height: 100%;
    padding-left: 10px;
    font-size: 14px;
}
.m_search_btn{
    width: 40px;
    height: 40px;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.m_mid_address_box{
    width: 100%;
    display: flex;
    height: 55px;
    align-items: center;
}
.m_address_2{
    width: 100%;
    height: 40px;
    padding-left: 10px;
    font-size: 14px;
}
.m_bot_address_box{
    width: 100%;
    display: flex;
    height: 55px;
    align-items: center;
}
.m_delivery_info{
    margin-top: 10px;
}
.m_delivery_bot{
    width:95%;
    margin-left: 2.5%;
}
.m_delivery_check{
    display: flex;
    margin-top:10px;
}
.m_checked2{
    margin-left: 10px;
}
.m_product_info{
    width: 100%;
    margin-top: 10px;
}
.m_for_box{
    width: 100%;
    margin-top: 10px;
}
.m_for_pos_box{
    width: 95%;
    margin-left: 2.5%;
    display: flex;
}
.m_img_box{
    width: 40%;
}
.m_info_box{
    width:50%;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    justify-content: space-evenly;
    padding-left: 5px;
}
.m_deletea_box{
    width: 10%;
    display: flex;
    justify-content: end;
}
.m_item_image{
    width:100%;
}
.mo_bot{
    width: 95%;
    margin-left: 2.5%;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
}
.m_sales_info{
    width: 100%;
    margin-top: 10px;
}
.m_sales_bot{
    width: 95%;
    margin-left: 2.5%;
    margin-top: 10px;
}
.m_sales_bot_add_delete_box{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.m_coupon_select{
    width: 100%;
    height: 100%;
}
.m_sales_bot_right{
    width: 75%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
}
/*mobile end*/
</style>