<template>
  <div id="login">
    <div class="container">
      <div class="card card-body mt-4">
        <h5 class="card-title">로그인</h5>
        <form @submit.prevent="submit">
          <div class="mb-3">
            <label for="email" class="form-label">이메일 주소</label>
            <input v-model="loginData.email" type="email" class="form-control" id="email" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">비밀번호</label>
            <input v-model="loginData.password" type="password" class="form-control" id="password">
          </div>
          <div class="login_outer">
            <button type="submit" class="login_button">Login</button>
            <div @click="kakaoLogin()" class="login_button">
              <img src="@/images/logo/certi_kakao_login.png" class="kakao_img">
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore, type LoginData, type KakaoRegisterData, type emailCheckData } from '../../stores/auth';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()

const loginData = reactive<LoginData>({
  email: "",
  password: "",
})

const kakaoRegisterData = reactive<KakaoRegisterData>({
  email: "",
  name:"",
  password: "",
  account_type: 2,
})

const emailCheck = reactive<emailCheckData>({
  emailUnique: ""
})

const errorMessage = ref<string>("")


async function submit(){
  fetch("https://www.shopfineday.com/api/auth/login",{
    method:'POST',
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify({
      email: loginData.email,
      password: loginData.password
    })
  }).then((response) => response.json())
  .then((data) => console.log(data));
  // await authStore.login(loginData)
  //   .then(res => {
  //     router.replace({name: "home"})
  //   })
  //   .catch(err => {
  //     alert('이메일 혹은 비밀번호를 확인해주세요')
  //   })
}

async function kakaoLogin(){
    await authStore.kakaoRegister(kakaoRegisterData)
    .then(res =>{
      router.replace({name: "home"})
    })
    .catch(err =>{
      errorMessage.value = err
    })
}
</script>

<script lang="ts">
import {defineComponent} from "vue";
import axios from 'axios'
import { react } from '@babel/types';

export default defineComponent({
  mounted() {
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', 'https://developers.kakao.com/sdk/js/kakao.min.js')
        document.head.appendChild(recaptchaScript)
    },
  methods: {
    }
  })

</script>

<style scoped>
#login .card{
  top: 75px;
  width: 700px;
  margin: auto;
}
.login_outer{
  display: flex;
}
.login_button{
  width: 50%;
  height: 65px;
}
.kakao_img{
  width: 100%;
  cursor: pointer;
}
</style>