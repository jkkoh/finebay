<template>
  <div class="menu">
    <div v-if="!mobileState" class="pc_pos_box">
      <div class="top_menu">
        <div class="menu_l">
          
        </div>
        <div class="menu_m">
          <HeaderLink to="/"><img src="@/images/logo/logo.png" alt="" class="logo"></HeaderLink>
        </div>
        <div class="menu_r" v-if="isLoggedIn">
            <span  @click="logout()" class="toptoptop">LOGOUT</span>
            <HeaderLink to="/cart"><span class="toptoptop">CART</span></HeaderLink>
        </div>
        <div class="menu_r" v-else-if="isKakaoAuthenticated">
            <span> </span>
            <span> ON KAKAO </span>
            <span @click="kakaoLogout()" class="toptoptop">LOGOUT</span>
            <HeaderLink to="/cart"><span class="toptoptop">CART</span></HeaderLink>
        </div>
        <div class="menu_r" v-else>
            <HeaderLink to="/register"><span class="toptoptop">REGISTER</span></HeaderLink>
            <HeaderLink to="/login"><span class="toptoptop">LOGIN</span></HeaderLink>
            <HeaderLink to="/cart"><span class="toptoptop">CART</span></HeaderLink>
        </div>
      </div>
      <div class="bot_menu">
          <div class="bot_top_menu">
            <!-- <ul class="menu_a">
              <li class="menu_d">
                <HeaderLink to="/" class="menu_b" exact>
                  <p class="top_m">New Arrival</p>
                </HeaderLink>
                <ul v-if="bot_menu_hover" class="menu_c">
                </ul>
              </li>
            </ul> -->
            <ul class="menu_a" @mouseover="m_menu_hover_t_0()" @mouseleave="m_menu_hover_f_0()">
              <li class="menu_d">
                <HeaderLink to="/swimwearAll" class="menu_b" exact>
                  <p class="top_m">Swimwear</p>
                </HeaderLink>
                <ul v-if="bot_menu_hover_0" class="menu_c">
                  <div class="menu_e">
                    <HeaderLink to="/swimwearTop"><li class="top_b">Top</li></HeaderLink>
                    <HeaderLink to="/swimwearBot"><li class="top_b">Bottom</li></HeaderLink>
                    <HeaderLink to="/swimwearMono"><li class="top_b">Monokini</li></HeaderLink>
                  </div>
                </ul>
              </li>
            </ul>
            <ul class="menu_a" @mouseover="m_menu_hover_t_1()" @mouseleave="m_menu_hover_f_1()">
              <li class="menu_d">
                <HeaderLink to="/beachwearAll" class="menu_b" exact>
                  <p class="top_m">Beachwear</p>
                </HeaderLink>
                <ul v-if="bot_menu_hover_1" class="menu_c">
                  <li class="top_b">Top</li>
                  <li class="top_b">Bottom</li>
                </ul>
              </li>
            </ul>
            <ul class="menu_a" @mouseover="m_menu_hover_t_2()" @mouseleave="m_menu_hover_f_2()">
              <li class="menu_d">
                <HeaderLink to="/aboutBrand" class="menu_b" exact>
                  <p class="top_m">About</p>
                </HeaderLink>
                <ul v-if="bot_menu_hover_2" class="menu_c">
                  <HeaderLink to="/aboutBrand"><li class="top_b">Brand</li> </HeaderLink>
                </ul>
              </li>
            </ul>
            <ul class="menu_a" @mouseover="m_menu_hover_t_3()" @mouseleave="m_menu_hover_f_3()">
              <li class="menu_d">
                <HeaderLink to="/customer" class="menu_b" exact>
                  <p class="top_m">Customer</p>
                </HeaderLink>
                <ul v-if="bot_menu_hover_3" class="menu_c">
                  <HeaderLink to="sizeGuide"><li class="top_b">Size</li></HeaderLink>
                  <HeaderLink to="deliveryGuide"><li class="top_b">Order & Delivery</li></HeaderLink>
                  <li class="top_b">Contact</li>
                </ul>
              </li>
            </ul>
          </div>
      </div>
    </div>
    <div v-if="mobileState">
      <div class="m_menu_top">
        <div class="m_menu_mid">
          <div class="m_menu_inner_left">
            <div class="m_menu_left_inner_inner" @click="m_menu_show()">
              <span class="m_line"></span>
              <span class="m_line"></span>
              <span class="m_line"></span>
            </div>
          </div>
          <div class="m_menu_inner_mid">
            <HeaderLink to="/"><img src="@/images/logo/logo.png" alt="" class="m_logo"></HeaderLink>
          </div>
          <div class="m_menu_inner_right">
            <div class="m_menu_right_inner_inner">
              <HeaderLink to="/cart"><span class="material-icons md-20">shopping_cart</span></HeaderLink>
            </div>
          </div>
        </div>
      </div>
      <div v-if="mMenuState"  class="mobile_pos_box">
        <div class="m_blur_bar">

        </div>
        <div class="m_main_menu">
          <div class="m_main_margin_m">
            <div class="m_top_main_menu">
              <HeaderLink to="/"><span class="m_main_header" @click="m_menu_hide()">Finebay</span></HeaderLink>
            </div>
            <div class="m_mid_main_menu">
              <div class="m_mid_btn_main">
                <HeaderLink to="/login"><span class="m_lc_btn" @click="m_menu_hide()">LOGIN</span></HeaderLink>
              </div>
              <div class="m_mid_btn_main">
                <HeaderLink to="/register"><span class="m_lc_btn" style="backgroundColor : yellow" @click="m_menu_hide()">CREATE ACCOUNT</span></HeaderLink>
                
              </div>
            </div>
            <div class="m_bot_main_menu">
              <div class="m_bot_main_menu_sub_start">
                <div class="m_bot_main_menu_sub_top">
                  <span>CATEGORY</span>
                </div>
                <div class="m_bot_main_menu_sub_bot">
                  <ul class="m_bot_main_menu_sub_bot_catList">
                    <div class="m_bot_main_menu_sub_bot_catList_inner" @click="mob_menu_click_0()">
                      <div class="m_bot_main_menu_sub_bot_catList_inner_state_box">
                        <span class="cartList_top_span" v-bind:style="{ transform : `rotate(${mm_0_top}deg)` }"></span>
                        <span class="cartList_bot_span" v-bind:style="{ transform : `rotate(${mm_0_bot}deg)` }"></span>
                      </div>
                      <li class="m_mm_list">Swimwear</li>
                    </div>
                    <div class="m_bot_main_menu_sub_bot_catList_innest" v-if="mobile_menu_click_0">
                      <div class="m_bot_main_menu_sub_bot_catList_innest_in">
                        <HeaderLink to="/swimwearAll" @click="m_menu_hide()">ALL</HeaderLink>
                      </div>
                      <div class="m_bot_main_menu_sub_bot_catList_innest_in">
                        <HeaderLink to="/swimwearTop" @click="m_menu_hide()">TOP</HeaderLink>
                      </div>
                      <div class="m_bot_main_menu_sub_bot_catList_innest_in">
                        <HeaderLink to="/swimwearBot" @click="m_menu_hide()">BOTTOM</HeaderLink>
                      </div>
                      <div class="m_bot_main_menu_sub_bot_catList_innest_in">
                        <HeaderLink to="/swimwearMono" @click="m_menu_hide()">MONOKINI</HeaderLink>
                      </div>
                    </div>
                  </ul>
                  <ul class="m_bot_main_menu_sub_bot_catList">
                    <div class="m_bot_main_menu_sub_bot_catList_inner" @click="mob_menu_click_1()">
                      <div class="m_bot_main_menu_sub_bot_catList_inner_state_box">
                        <span class="cartList_top_span" v-bind:style="{ transform : `rotate(${mm_1_top}deg)` }"></span>
                        <span class="cartList_bot_span" v-bind:style="{ transform : `rotate(${mm_1_bot}deg)` }"></span>
                      </div>
                      <li class="m_mm_list">Beachwear</li>
                    </div>    
                    <div class="m_bot_main_menu_sub_bot_catList_innest" v-if="mobile_menu_click_1">
                      <div class="m_bot_main_menu_sub_bot_catList_innest_in">
                        <HeaderLink to="/beachwearAll" @click="m_menu_hide()">ALL</HeaderLink>
                      </div>
                      <div class="m_bot_main_menu_sub_bot_catList_innest_in">
                        <HeaderLink to="/beachwearTop" @click="m_menu_hide()">TOP</HeaderLink>
                      </div>
                      <div class="m_bot_main_menu_sub_bot_catList_innest_in">
                        <HeaderLink to="/beachwearBot" @click="m_menu_hide()">BOTTOM</HeaderLink>
                      </div>
                      <div class="m_bot_main_menu_sub_bot_catList_innest_in">
                        <HeaderLink to="/beachwearMono" @click="m_menu_hide()">MONOKINI</HeaderLink>
                      </div>
                    </div>                  
                  </ul>
                  <ul class="m_bot_main_menu_sub_bot_catList">
                    <div class="m_bot_main_menu_sub_bot_catList_inner" @click="mob_menu_click_2()">
                      <div class="m_bot_main_menu_sub_bot_catList_inner_state_box">
                        <span class="cartList_top_span" v-bind:style="{ transform : `rotate(${mm_2_top}deg)` }"></span>
                        <span class="cartList_bot_span" v-bind:style="{ transform : `rotate(${mm_2_bot}deg)` }"></span>
                      </div>
                      <li class="m_mm_list">About</li>
                    </div>    
                    <div class="m_bot_main_menu_sub_bot_catList_innest" v-if="mobile_menu_click_2">
                      <div class="m_bot_main_menu_sub_bot_catList_innest_in">
                        <HeaderLink to="/aboutBrand" @click="m_menu_hide()">BRAND</HeaderLink>
                      </div>
                    </div>                  
                  </ul>
                  <ul class="m_bot_main_menu_sub_bot_catList">
                    <div class="m_bot_main_menu_sub_bot_catList_inner" @click="mob_menu_click_3()">
                      <div class="m_bot_main_menu_sub_bot_catList_inner_state_box">
                        <span class="cartList_top_span" v-bind:style="{ transform : `rotate(${mm_3_top}deg)` }"></span>
                        <span class="cartList_bot_span" v-bind:style="{ transform : `rotate(${mm_3_bot}deg)` }"></span>
                      </div>
                      <li class="m_mm_list">Customer</li>
                    </div>       
                    <div class="m_bot_main_menu_sub_bot_catList_innest" v-if="mobile_menu_click_3">
                      <div class="m_bot_main_menu_sub_bot_catList_innest_in">
                        <HeaderLink to="/sizeGuide" @click="m_menu_hide()">SIZE</HeaderLink>
                      </div>
                      <div class="m_bot_main_menu_sub_bot_catList_innest_in">
                        <HeaderLink to="/deliveryGuide" @click="m_menu_hide()">ORDER & DELIVERY</HeaderLink>
                      </div>
                      <div class="m_bot_main_menu_sub_bot_catList_innest_in">
                        <HeaderLink to="/contactGuide" @click="m_menu_hide()">CONTACT</HeaderLink>
                      </div>
                    </div>               
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="m_main_close_bar">
          <img src="@/images/etc/button_delete.gif" alt="" class="m_delete_btn" @click="m_menu_hide()">
        </div>
      </div>  
    </div>
</div>
</template>

<script setup lang="ts">

import { useAuthStore } from '../stores/auth';
import {computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Authenticator } from '@aws-amplify/ui-vue';
import { useUser } from '../stores/loggedAuth'
import { Hub, Auth } from 'aws-amplify'
import { storeToRefs } from 'pinia';
import MobileDetect from 'mobile-detect'


const authStore = useAuthStore()

const router = useRouter()

const eee = ref({
name: '',
email: ''
})

const userStore = useUser()
const { isLoggedIn } = storeToRefs(userStore)

watch(
  () => userStore.isLoggedIn,
  () => {
if(userStore.isLoggedIn == true || localStorage.getItem('amplify-signin-with-hostedUI') !== null){
  getUserInfo()
}else{
  console.log('loggedin')
}
},
)

onMounted(()=>{
if(userStore.isLoggedIn == true){
  getUserInfo()
}else if(localStorage.getItem('amplify-signin-with-hostedUI') !== null && userStore.isLoggedIn == false){
  userStore.login()
  getUserInfo
}
else{
  console.log('not logged in')
}
})

const uuserInfo = getUserInfo()



async function getUserInfo(){
const Awsuser = await Auth.currentAuthenticatedUser();
const attributes = await Auth.userAttributes(Awsuser);
const userInfo = {
      user : attributes[8].Value,
      name: attributes[2].Value
}
eee.value.name = userInfo.name
eee.value.email = userInfo.user
}

const isAuthenticated = computed(()=>{
return authStore.isAuthenticated
})
const isKakaoAuthenticated = computed(()=>{
return authStore.isKakaoAuthenticated
})
async function logout(){
await authStore.logout()
  .then( res => {
    router.replace({name: 'home'})
    userStore.logout()
  })
  .catch(err => {
    console.log(err.message)
  })
}
async function kakaoLogout(){
await authStore.kakaoLogout()
.then( res => {
  router.replace({name: 'home'})
})
.catch(err => {
  console.log(err.message)
})

}

</script>

<script lang ="ts">

import { defineComponent } from 'vue'
import HeaderLink from './HeaderLink.vue'

export default defineComponent ({ 
  components:  { HeaderLink },
  mounted() {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://developers.kakao.com/sdk/js/kakao.min.js')
    document.head.appendChild(recaptchaScript)
    window.addEventListener("resize", this.myEventHandler);
    const md = new MobileDetect(window.navigator.userAgent)
    if(window.innerWidth < 800 || md.mobile() || md.tablet()){
      this.mobileState = true;
    }else if(window.innerWidth >= 800){
      this.mobileState = false;
    }
  },
  unmounted() {
      window.removeEventListener("resize", this.myEventHandler);
  },
  data: () => {
    return {
      bot_menu_hover_0 : false,
      bot_menu_hover_1 : false,
      bot_menu_hover_2 : false,
      bot_menu_hover_3 : false,
      mobile_menu_click_0 : false,
      mobile_menu_click_1 : false,
      mobile_menu_click_2 : false,
      mobile_menu_click_3 : false,
      mm_0_top : 0,
      mm_0_bot : 90,
      mm_1_top : 0,
      mm_1_bot : 90,
      mm_2_top : 0,
      mm_2_bot : 90,
      mm_3_top : 0,
      mm_3_bot : 90,
      mobileState : false,
      mMenuState : false,
    }
  },
  methods: {
    m_menu_hover_t_0() {
      this.bot_menu_hover_0 = true;
    },
    m_menu_hover_f_0() {
      this.bot_menu_hover_0 = false;
    },
    m_menu_hover_t_1() {
      this.bot_menu_hover_1 = true;
    },
    m_menu_hover_f_1() {
      this.bot_menu_hover_1 = false;
    },
    m_menu_hover_t_2() {
      this.bot_menu_hover_2 = true;
    },
    m_menu_hover_f_2() {
      this.bot_menu_hover_2 = false;
    },
    m_menu_hover_t_3() {
      this.bot_menu_hover_3 = true;
    },
    m_menu_hover_f_3() {
      this.bot_menu_hover_3 = false;
    },
    mob_menu_click_0(){
      if(this.mobile_menu_click_0 == false){
        this.mobile_menu_click_0 = true;
        this.mm_0_top = 45;
        this.mm_0_bot = 135;
      }else if(this.mobile_menu_click_0 == true){
        this.mobile_menu_click_0 = false;
        this.mm_0_top = 0;
        this.mm_0_bot = 90;
      }
    },
    mob_menu_click_1(){
      if(this.mobile_menu_click_1 == false){
        this.mobile_menu_click_1 = true;
        this.mm_1_top = 45;
        this.mm_1_bot = 135;
      }else if(this.mobile_menu_click_1 == true){
        this.mobile_menu_click_1 = false;
        this.mm_1_top = 0;
        this.mm_1_bot = 90;
      }
    },
    mob_menu_click_2(){
      if(this.mobile_menu_click_2 == false){
        this.mobile_menu_click_2 = true;
        this.mm_2_top = 45;
        this.mm_2_bot = 135;
      }else if(this.mobile_menu_click_2 == true){
        this.mobile_menu_click_2 = false;
        this.mm_2_top = 0;
        this.mm_2_bot = 90;
      }
    },
    mob_menu_click_3(){
      if(this.mobile_menu_click_3 == false){
        this.mobile_menu_click_3 = true;
        this.mm_3_top = 45;
        this.mm_3_bot = 135;
      }else if(this.mobile_menu_click_3 == true){
        this.mobile_menu_click_3 = false;
        this.mm_3_top = 0;
        this.mm_3_bot = 90;
      }
    },
    myEventHandler(){
          const mobile = 800
          if(window.innerWidth < mobile ){
              this.mobileState = true;
          }else if(window.innerWidth >= mobile){
              this.mobileState = false;
              this.mMenuState = false;
          }
    },
    m_menu_show(){
      this.mMenuState = true;
    },
    m_menu_hide(){
      this.mMenuState = false;
      if(this.mobile_menu_click_0){
        this.mob_menu_click_0()
      }
      if(this.mobile_menu_click_1){
        this.mob_menu_click_1()
      }
      if(this.mobile_menu_click_2){
        this.mob_menu_click_2()
      }
      if(this.mobile_menu_click_3){
        this.mob_menu_click_3()
      }
    },
  }
})
</script>
<style>
.menu {
  width: 100%;
  top: 0;
  position: sticky;
  z-index: 100;
}
.pc_pos_box{
  
}
.top_menu{
position: relative;
width: 100%;
min-width: 350px;
height: 100px;
display: flex;
align-items: center;
justify-content: space-between;
z-index: 100;
background-color: rgba(255,255,255,0.5);
}
.top_menu > div{
width: 33%;

}
/* ------------------------------------------ */
.top_m {
 font-family: "Open_Sans";
 color: black;
 text-decoration: none;
 text-decoration-line: none;
 font-size: 20px;
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 width: 250px;
 top: 50%;
 transform: translateY(-50%);
}
.menu_r{
display: flex;
align-items: center;
justify-content: flex-end;

}
.menu_m{
text-align: center;
}
.menu_l{
display: flex;
align-items: center;
justify-content: flex-start;
}
.bot_menu{
  width: 2500px;
  position: relative;
  transform: translate(-50%);
  height: 50px;
  left:50%;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  background-color: rgba(255,255,255,0.5);
}
/* bot top menu start */
.bot_top_menu{
width: 100%;
height: 100%;
display: flex;
justify-content: center;
text-align: center;
}
.menu_a{
position: relative;
width: 250px;
height: 100%;
list-style: none;
}
.menu_a > p {
font-family: "Open_Sans";
}
.menu_b{
  width: 250px;
  height: 50px;
  text-decoration: none;
  text-align: center;
  
}
.menu_b > a {
text-decoration: none;
}
.menu_c{
position: fixed;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 250px;

}
.top_b{
margin-left: -33px;
width: 250px;
display: flex;
align-items: center;
justify-content: center;
height:50px;
font-family: "Open_Sans_I";
color: black;
text-decoration: none;
font-size: 20px;
background-color: rgba(255, 255, 255, 0.7);
list-style: none;
}
.menu_e{
}
.logo {
width: 200px;
}
.toptoptop{
cursor: pointer;
margin-right: 10px;
}
/* bot top menu end */

/*mobile start*/
.m_menu_top{
width: 100vw;
min-width: 280px;
height: 60px;
background-color: green;
}
.m_menu_mid{
width: 100%;
height: 100%;
position: relative;
background-color: antiquewhite;
display: flex;
justify-content: space-between;
align-items: center;
}
.m_menu_inner_left{
width: 50px;
height: 50px;
margin-left: 20px;
display: flex;
justify-content: center;
align-items: center;
}
.m_menu_left_inner_inner{
width: 20px;
height: 20px;
display: flex;
flex-direction: column;
justify-content: space-between;
cursor: pointer;
}
.m_line{
display: block;
width : 20px;
height: 3px;
background-color: black;
}
.m_menu_inner_mid{
width: 40vw;
height: 50px;
display: flex;
align-content: center;
align-items: center;
}
.m_logo{
width: 40vw;
}
.m_menu_inner_right{
width: 50px;
height: 50px;
margin-right: 20px;
display: flex;
align-items: center;
justify-content: center;
}
.m_menu_right_inner_inner{
width: 20px;
height: 20px;
display: flex;
align-items: center;
justify-content: center;
}
.material-icons.md-16{
font-size: 16px;
}
.m_blur_bar{
position: absolute;
top: -60px;
width: 100vw;
height: 100vh;
background-color: black;
opacity: 0.5;
z-index: 70;
}
.m_main_menu{
position: absolute;
display: flex;
justify-content: center;
top: 0;
width: 70vw;
min-width: calc(350px * 0.7);
height: 100vh;
background-color: aliceblue;
z-index: 80;
}
.m_main_margin_m{
width: 95%;
height: 100%;
}
.m_main_close_bar{
position: absolute;
width: 30px;
height: 30px;
left: 70%;
top: 0;
background-color: black;
z-index: 80;
}
.m_delete_btn{
width: 30px;
height: 30px;
cursor: pointer;
}
.m_top_main_menu{
width: 100%;
height: 100px;
display: flex;
align-items: center;
justify-content: center;
}
.m_top_main_menu > div{
width : 100%;
height : 100%;
}
.m_top_main_menu > div > a {
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height: 100%;
}
.m_main_header {
width: 100%;
height: 100%;
font-size: 30px;
display: flex;
align-items: center;
justify-content: center;
}
.m_mid_main_menu{
width: 100%;
height: 75px;
background-color: aqua;
display: flex;
}
.m_mid_btn_main{
width: 50%;
height: 100%;
background-color: gold;
display: flex;
justify-content: center;
align-items: center;
}
.m_mid_btn_main > div {
width: 100%;
height: 100%;
}
.m_mid_btn_main > div > a{
display: block;
width: 100%;
height: 100%;
}
.m_lc_btn{
display: block;
width: 100%;
height: 100%;
background-color: grey;
display: flex;
align-items: center;
justify-content: center;
font-size: 13px;
cursor: pointer;
}
.m_bot_main_menu{
width:100%;
height:600px;
}
.m_bot_main_menu_sub_top{
width: 100%;
height: 60px;
display: flex;
align-items: end;
box-sizing: border-box;
border-bottom: 1px solid black;
}
.m_bot_main_menu_sub_top > span{
font-size: 24px;
margin-left: 10px;
margin-bottom:10px;
}
.m_bot_main_menu_sub_bot{
width: 100%;
}
.m_mm_list{
margin-left: 5px;
list-style: none;
font-size: 15px;
}
.m_bot_main_menu_sub_bot_catList{
list-style: none;
margin-bottom: 0;
padding-left: 0;
}
.m_bot_main_menu_sub_bot_catList_inner{
display: flex;
align-items: center;
width: 100%;
height: 40px;
cursor: pointer;
}
.m_bot_main_menu_sub_bot_catList_inner_state_box{
position: relative;
width: 20px;
height: 20px;
}
.m_bot_main_menu_sub_bot_catList_innest{
display: block;
width: 100%;
}
.m_bot_main_menu_sub_bot_catList_innest_in{
display: block;
width: 100%;
height: 40px;
box-sizing: border-box;
border-bottom: 0.2px solid rgba(0, 0, 0, 0.2);
}
.m_bot_main_menu_sub_bot_catList_innest_in > div {
display: flex;
align-items: center;
width: 100%;
height: 100%;
}
.m_bot_main_menu_sub_bot_catList_innest_in > div > a {
margin-left: 30px;
}
.cartList_top_span{
display: block;
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%,-50%);
transition-duration: 0.5s;
width: 12px;
height: 1px;
background-color: black;
}
.cartList_bot_span{
display: block;
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%,-50%) rotate(90deg);
transition-duration: 0.5s;
width: 12px;
height: 1px;
background-color: black;
}
</style>
