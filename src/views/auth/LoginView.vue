<template>
  <div id="login">
    <div class="container">
      <div class="card card-body mt-4">
        <h5 class="card-title">Login</h5>
        <form @submit.prevent="submit">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input v-model="loginData.email" type="email" class="form-control" id="email" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="loginData.password" type="password" class="form-control" id="password">
          </div>
          <button type="submit" class="btn btn-success">Login</button>
          <button @click="kakaoLogin()">
            <img src="@/images/logo/certi_kakao_login.png" width="222">
          </button>
          <button @click="kakaoLogout()">카카오로그아웃
          </button>
          <button @click="kakaoGetAddress()">
            
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore, type LoginData, type KakaoRegisterData } from '../../stores/auth';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()

const loginData = reactive<LoginData>({
  email: "",
  password: "",
})


const errorMessage = ref<string>("")

async function submit(){
  await authStore.login(loginData)
    .then(res => {
      router.replace({name: "user"})
    })
    .catch(err => {
      errorMessage.value = err
    })
}

</script>

<script lang="ts">
import {defineComponent} from "vue";
import axios from 'axios'

export default defineComponent({
  mounted() {
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', 'https://developers.kakao.com/sdk/js/kakao.min.js')
        document.head.appendChild(recaptchaScript)
    },
  methods: {
    async kakaoLogin() {
      await window.Kakao.Auth.login({
        scope: 'account_email, profile_nickname, phone_number, shipping_address, plusfriends, age_range',
        success: this.GetMe, 
      })
    },
    GetMe(authObj){
      window.Kakao.API.request({
        url:'/v2/user/me',
        success: function(response : object){
          const kakaoRegisterData = reactive<KakaoRegisterData>({
          email: "",
          name:"",
          password: "",
          account_type: 0,
          })
          const emailCheck = reactive<emailCheckData>({
            emailUnique: ""
          })
          console.log(response)
          console.log(response.kakao_account)
          const Kaccount = response.kakao_account;
          const userInfo = {
            email: Kaccount.email,
            name: Kaccount.profile.nickname,
            password: '',
            account_type: 2,
          }
          this.kakaoRegisterData.email = userInfo.email;
          this.kakaoRegisterData.name = userInfo.name;
          this.kakaoRegisterData.password = userInfo.password;
          this.kakaoRegisterData.account_type = userInfo.account_type;
          const emailUnique = userInfo.email + userInfo.account_type;
          this.emailCheck.emailUnique = emailUnique;

          try{
            authStore.kakaoRegister(kakaoRegisterData).then(()=>{
              router.replace({name:"user"}).catch(err => {
              errorMessage.value = err;})   
          })
          }catch{

          }
      }
    })},
    kakaoLogout(){
      Kakao.Auth.logout()
      try {
        
      } catch (error) {
        
      }
      },
      async kakaoGetAddress(){
        await window.Kakao.API.request({
          url:'/v1/user/shipping_address'
        }).then(function(response){
          console.log(response)
        }).catch(function(error){
          console.log(error)
        })
      },
      
    }
  })

</script>

<style scoped>
#login .card{
  max-width: 40vw;
  margin: auto;
}
</style>