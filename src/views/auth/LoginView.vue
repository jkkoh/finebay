<template>
  <div>
    <div v-if="!mobileState" id="login">
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
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="mobileState">
      <div class="mobile_container">
        <div class="mob_con_inner">
          <div class="mob_con_inner_top">
            <h2>Login</h2>
          </div>
          <div class="mob_con_inner_bot">
            <div class="mob_con_inner_bot_top">
              <div class="mob_log_top">
                <div class="mob_log_top_top">
                  <input v-model="loginData.email" type="email" class="mob_email_input" id="email" autocomplete="off" placeholder="아이디">
                </div>
                <div class="mob_log_top_bot">
                  <input v-model="loginData.password" type="password" class="mob_pass_input" id="password" placeholder="비밀번호">
                </div>
              </div>
              <div class="mob_log_bot">
                <div class="mobile_register" @click="toRegister()">
                  <span>회원가입</span>
                </div>
                <div class="mobile_submit" @click="submit()">
                  <span>로그인</span>
                </div>
              </div>
            </div>
            <div class="mob_con_inner_bot_bot">

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useAuthStore, type LoginData, type KakaoRegisterData, type emailCheckData } from '../../stores/auth';
import { useUser } from '../../stores/loggedAuth'
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Auth } from 'aws-amplify'

const authStore = useAuthStore()
const userStore = useUser()
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
  await Auth.signIn(loginData.email, loginData.password)
    .then(res => {
      userStore.login()
      router.replace({name: "home"})
    })
    .catch(err => {
      alert('이메일 혹은 비밀번호를 확인해주세요')
    })
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
function toRegister(){
  router.replace({name: "register"})
}
</script>

<script lang="ts">
import {defineComponent} from "vue";
import MobileDetect from 'mobile-detect'

export default defineComponent({
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
  methods: {
    myEventHandler(){
            const mobile = 800
            if(window.innerWidth < mobile ){
                this.mobileState = true;
            }else if(window.innerWidth >= mobile){
                this.mobileState = false;
            }
    },
  },
    
  data: ()=>{
    return {
      mobileState : false,
    }
  }
  })

</script>

<style scoped>
#login .card{
  top: 75px;
  width: 400px;
  margin: auto;
  border: none;
}
.login_outer{
  display: flex;
}
.login_button{
  width: 100%;
  height: 65px;
}
.kakao_img{
  width: 100%;
  cursor: pointer;
}



/*mobile css start*/

.mobile_container{
  width: 100%;

}
.mob_con_inner{
  width: 80%;
  margin-left: 10%;
  margin-top: 50px;
}
.mob_con_inner_top{
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
/*mob_con_inner_bot start*/
.mob_con_inner_bot{
  width: 100%;
}
.mob_con_inner_bot_top{
  width: 100%;
  height: 300px;
}
.mob_log_top{
  width: 100%;
}
.mob_log_top_top{
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
}
.mob_email_input{
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border-radius: 50px;
  padding-left: 20px;
}

.mob_log_top_bot{
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
}
.mob_pass_input{
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border-radius: 50px;
  padding-left: 20px;
}
.mob_log_bot{
  width: 100%;
  height: 100px;
}
.mob_con_inner_bot_bot{
  width: 100%;
  height: 300px;
}
.mobile_register{
  width: 100%;
  height: 50px;
  background-color : #874;
  border: 1px solid #131719;
  border-bottom: none;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.mobile_submit{
  width: 100%;
  height: 50px;
  background-color : #555;
  border: 1px solid #131719;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
/*mob_con_inner_bot end*/



/*mobile css end*/
</style>