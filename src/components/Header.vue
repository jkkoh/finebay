<template>
    <div class="menu">
      <div v-if="!mobileState">
        <div class="top_menu">
          <div class="menu_l">
            <p>search</p>
          </div>
          <div class="menu_m">
            <HeaderLink to="/"><img src="@/images/logo/logo.png" alt="" class="logo"></HeaderLink>
          </div>
          <div class="menu_r" v-if="isAuthenticated">
              <span>{{ user.name }} </span>
              <span  @click="logout()" class="toptoptop">LOGOUT</span>
              <HeaderLink to="/cart"><span class="toptoptop">CART</span></HeaderLink>
          </div>
          <div class="menu_r" v-else-if="isKakaoAuthenticated">
              <span>{{ user.name }} </span>
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
        <div v-if="mMenuState">
          <div class="m_blur_bar">

          </div>
          <div class="m_main_menu">
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
import {computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()

const router = useRouter()

const user = computed(()=> {
  return authStore.name
})

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
      if(window.innerWidth < 800){
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
      }
    },
})
</script>
<style>
.menu {
  width: 100%;
  min-width: 350px;
  
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
  margin-right: 10px;
}
/* bot top menu end */

/*mobile start*/
.m_menu_top{
  width: 100%;
  min-width: 250px;
  height: 100px;
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
  width: 100px;
  height: 50px;
  display: flex;
  align-content: center;
  align-items: center;
}
.m_logo{
  width: 100px;
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
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
  z-index: 70;
}
.m_main_menu{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 70vw;
  min-width: calc(350px * 0.7);
  height: 100vh;
  background-color: aliceblue;
  z-index: 80;
}
.m_main_close_bar{
  position: absolute;
  width: 30px;
  height: 30px;
  top: 50%;
  left: 80%;
  transform: translate(-50%,-50%);
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
  background-color: green;
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
</style>
