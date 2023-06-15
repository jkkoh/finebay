<template>
    <div class="menu">
    <div class="top_menu">
      <div class="menu_l">
        <p>search</p>
      </div>
      <div class="menu_m">
        <HeaderLink to="/"><img src="@/images/logo/logo.png" alt="" class="logo"></HeaderLink>
      </div>
      <div class="menu_r" v-if="isAuthenticated">
          <span>{{ user.name }} 님 환영합니다</span>
          <button  @click="logout()">로그아웃</button>
          <HeaderLink to="/cart"><button>쇼핑카트</button></HeaderLink>
      </div>
      <div class="menu_r" v-else-if="isKakaoAuthenticated">
          <span>{{ user.name }} 님 환영합니다</span>
          <span>카카오로그인 되있음</span>
          <button @click="kakaoLogout()">로그아웃</button>
          <HeaderLink to="/cart"><button>쇼핑카트</button></HeaderLink>
      </div>
      <div class="menu_r" v-else>
          <HeaderLink to="/register"><button>회원가입</button></HeaderLink>
          <HeaderLink to="/login"><button>로그인</button></HeaderLink>
          <HeaderLink to="/cart"><button>쇼핑카트</button></HeaderLink>
      </div>
    </div>
    <div class="bot_menu" @mouseover="m_menu_hover_t()" @mouseleave="m_menu_hover_f()">
        <div class="bot_top_menu">
          <ul class="menu_a">
            <li class="menu_d">
              <HeaderLink to="/" class="menu_b" exact>
                <p class="top_m">New Arrival</p>
              </HeaderLink>
              <ul v-if="bot_menu_hover" class="menu_c">
              </ul>
            </li>
          </ul>
          <ul class="menu_a">
            <li class="menu_d">
              <HeaderLink to="/swimwearAll" class="menu_b" exact>
                <p class="top_m">Swimwear</p>
              </HeaderLink>
              <ul v-if="bot_menu_hover" class="menu_c">
                <div class="menu_e">
                  <HeaderLink to="/swimwearTop"><li class="top_b">Top</li></HeaderLink>
                  <HeaderLink to="/swimwearBot"><li class="top_b">Bottom</li></HeaderLink>
                  <HeaderLink to="/swimwearMono"><li class="top_b">Monokini</li></HeaderLink>
                </div>
              </ul>
            </li>
          </ul>
          <ul class="menu_a">
            <li class="menu_d">
              <HeaderLink to="/beachwearAll" class="menu_b" exact>
                <p class="top_m">Beachwear</p>
              </HeaderLink>
              <ul v-if="bot_menu_hover" class="menu_c">
                <li class="top_b">Top</li>
                <li class="top_b">Bottom</li>
              </ul>
            </li>
          </ul>
          <ul class="menu_a">
            <li class="menu_d">
              <HeaderLink to="/aboutBrand" class="menu_b" exact>
                <p class="top_m">About</p>
              </HeaderLink>
              <ul v-if="bot_menu_hover" class="menu_c">
                <HeaderLink to="/aboutBrand"><li class="top_b">Brand</li> </HeaderLink>
              </ul>
            </li>
          </ul>
          <ul class="menu_a">
            <li class="menu_d">
              <HeaderLink to="/customer" class="menu_b" exact>
                <p class="top_m">Customer</p>
              </HeaderLink>
              <ul v-if="bot_menu_hover" class="menu_c">
                <HeaderLink to="sizeGuide"><li class="top_b">Size</li></HeaderLink>
                <HeaderLink to="deliveryGuide"><li class="top_b">Order & Delivery</li></HeaderLink>
                <li class="top_b">Contact</li>
              </ul>
            </li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useAuthStore } from '@/stores/auth';
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
    },
    data: () => {
      return {
        bot_menu_hover : false,
      }
    },
    methods: {
      m_menu_hover_t() {
        this.bot_menu_hover = true;
      },
      m_menu_hover_f() {
        this.bot_menu_hover = false;
      }
    },
})
</script>
<style>
.menu {
  width: 100%;
  
}
.top_menu{
  position: relative;
  width: 100%;
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
/* bot top menu end */

</style>
