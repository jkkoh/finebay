<template>
  <div>
    <div id="register" v-if="!mobileState">
      <div class="container">
        <div class="card card-body mt-4">
          <h5 class="card-title">회원가입</h5> <p>* 필수 항목</p>
          <div>
            <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
            <div class="mb-3">
              <label for="email" class="form-label">이메일</label> <button @click="duplicationCheck()" class="registerBtn">중복확인</button>
              <input v-model="registerData.email" type="email" class="form-control" id="email" autocomplete="off" placeholder="*">
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">이름</label>
              <input v-model="registerData.name" type="text" class="form-control" id="first_name" autocomplete="off" placeholder="*">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">비밀번호</label>
              <input v-model="registerData.password" type="password" class="form-control" id="password" placeholder="*">
            </div>
            <div class="mb-3">
              <label for="password_confirm" class="form-label">비밀번호 확인</label>
              <input v-model="registerData.password_confirm" type="password" class="form-control" id="password_confirm" placeholder="*">
            </div>
            <div class="mb-3">
              <label for="postCode" class="form-label">우편번호</label> <button @click="sample4_execDaumPostcode()" class="registerBtn">검색</button>
              <input v-model="registerData.postCode" type="postCode" class="form-control" id="postCode" autocomplete="off" placeholder="*">
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">도로명 주소</label>
              <input v-model="registerData.address" type="address" class="form-control" id="address" autocomplete="off" placeholder="*" >
            </div>
            <div class="mb-3">
              <label for="address2" class="form-label">상세주소</label>
              <input v-model="registerData.address2" type="address2" class="form-control" id="address2" autocomplete="off">
            </div>
            <label for="authCode" class="form-label">이메일 승인 코드</label>
            <button class="registerBtn" @click="register()" style="marginLeft:5px">인증번호 받기</button>
            <button v-if="waitingForAuth" class="registerBtn" @click="resendConfirmationCode()" style="marginLeft:5px">인증번호 다시받기</button>
            <div class="auth">
              <input v-model="authenticationCode" type="authCode" class="form-control" id="authCode" autocomplete="off">
            </div>
              <div>
                <button class="registerBtn" @click="confirmSignUp()" style="width:100%; marginTop:5px; height: 50px">회원가입</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="mobileState">
      <div class="m_outest_container">
        <div class="m_inner_container">
          <div class="m_title_box">
            <p class="m_title">회원가입</p> 
          </div>
          <div>
            <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
            <div class="m_inner_box">
              <label for="email" class="form-label m_label_title">이메일 <span style="color:red;">*</span></label> <button @click="duplicationCheck()" class="m_registerBtn">중복확인</button>
              <input v-model="registerData.email" type="email" class="form-control m_input" id="email" autocomplete="off" placeholder="" style="border: none;">
            </div>
            <div class="m_inner_box">
              <label for="name" class="form-label m_label_title">이름 <span style="color:red;">*</span></label>
              <input v-model="registerData.name" type="text" class="form-control m_input" id="first_name" autocomplete="off" placeholder="" style="border: none;">
            </div>
            <div class="m_inner_box">
              <label for="password" class="form-label m_label_title">비밀번호 <span style="color:red;">*</span></label>
              <input v-model="registerData.password" type="password" class="form-control m_input" id="password" placeholder="" style="border: none;">
            </div>
            <div class="m_inner_box">
              <label for="password_confirm" class="form-label m_label_title">비밀번호 확인 <span style="color:red;">*</span></label>
              <input v-model="registerData.password_confirm" type="password" class="form-control m_input" id="password_confirm" placeholder="" style="border: none;">
            </div>
            <div class="m_inner_box">
              <label for="postCode" class="form-label m_label_title">우편번호 <span style="color:red;">*</span></label>
              <div style="display:flex">
                <input v-model="registerData.postCode" type="postCode" class="form-control m_input" id="postCode" autocomplete="off" placeholder="" style="width: 40vw; border:none; paddingRight:none;" > 
                <span class="material-icons md-48 m_search_btn"  @click="sample4_execDaumPostcode()">search</span>
              </div>
            </div>
            <div class="m_inner_box">
              <label for="address" class="form-label m_label_title">도로명 주소 <span style="color:red;">*</span></label>
              <input v-model="registerData.address" type="address" class="form-control m_input" id="address" autocomplete="off" placeholder="" style="border: none;">
            </div>
            <div class="m_inner_box">
              <label for="address2" class="form-label m_label_title">상세주소</label>
              <input v-model="registerData.address2" type="address2" class="form-control m_input" id="address2" autocomplete="off" style="border: none;">
            </div>
            <div class="m_inner_box">
              <label for="authCode" class="form-label m_label_title">이메일 승인 코드</label>
              <button class="m_registerBtn" @click="register()" style="marginLeft:5px">인증번호 받기</button>
              <button v-if="waitingForAuth" class="m_registerBtn" @click="resendConfirmationCode()" style="marginLeft:5px">인증번호 다시받기</button>
              <div class="auth">
                <input v-model="authenticationCode" type="authCode" class="form-control m_input" id="authCode" autocomplete="off" style="border: none;">
              </div>
            </div>
            <button class="m_success_btn" @click="confirmSignUp()">회원가입</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore, type RegisterData } from '../../stores/auth';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Auth } from 'aws-amplify'
const authStore = useAuthStore()
const router = useRouter()

const registerData = reactive<RegisterData>({
  email: "",
  name: "",
  password: "",
  password_confirm: "",
  postCode:"",
  address: "",
  address1: "",
  address2: "",
  address3: "",
  account_type: 1
})
const authenticationCode = ref("");

type ConfirmSignUpParameters = {
  username: string;
  code: string;
}

type ResendConfCodeParameters = {
  username: string;
}

const emailChecked = ref(false)

async function resendConfirmationCode(){
  try {
    const username = registerData.email
    await Auth.resendSignUp(username);
    alert(`${username} 으로 코드가 다시 보내졌습니다`)
    console.log('code resent successful')
  } catch (errr){
    console.log('error has occured while executing resendConfirmationCode : ' ,error)
  }
}
async function confirmSignUp(){
  try {
    const username = registerData.email
    const code = authenticationCode.value
    await Auth.confirmSignUp(username, code).then(res=>{
      router.replace({name: "login"})
    })
    alert('회원가입이 완료되었습니다')
  }catch (error){
    console.log('Error has occured while confirming signUp: ', error)
  }
}

async function duplicationCheck(){
  const email = registerData.email
  return Auth.signIn(email , '111').then(res => {
    return false;
  }).catch(error => {
    const code = error.code;
    console.log(error);
    switch(code){
      case 'UserNotFoundException':
        return usableEmail()
      case 'NotAuthorizedException':
        return alert('중복된 이메일이 있습니다. 다른 이메일을 선택하여 주세요')
      case 'PasswordResetRequiredException':
        return console.log('PasswordResetRequiredException')
      case 'UserNotConfirmedException':
        return console.log('UserNotConfirmedException')
      case 'AuthError':
        return console.log('AuthError')
      default:
        return alert('이메일을 입력해 주세요')
    }
  })
}

function usableEmail(){
  if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(registerData.email)){
    console.log('emailchecked value is ', emailChecked.value)
    emailChecked.value = true
    console.log('emailchecked value after is ', emailChecked.value)
    alert('사용 가능한 이메일 입니다')
  }
  else{
    alert('이메일 형식을 확인해 주세요')
  }
}

const waitingForAuth = ref(false);

const errorMessage = ref<string>("")

async function register(){
  if(registerData.email !== "" && registerData.name !== "" && registerData.password !== "" &&
  registerData.password_confirm !== "" && registerData.postCode !== "" && registerData.address !== ""
  && emailChecked.value == true){
    console.log('aaaa')
    await authStore.register(registerData).then(res =>{
      console.log('current waiting for auth is : ', waitingForAuth)
      waitingForAuth.value = true;
      console.log('aaaaaaaaaaaa waiting for auth is : ',waitingForAuth)
      alert(`${registerData.email} 을 확인해주세요`)
    })
    .catch(err => {
      errorMessage.value = err.message
    })
  } else{
    alert('필수 항목을 입력해 주세요')
  }
  
}

function sample4_execDaumPostcode() {
    new window.daum.Postcode({
    oncomplete: (data: any) => {
      console.log(data);
      const zoneCode : string = data.zonecode;
      const roadAdd : string = data.address;
      const jibunAdd : string = data.jibunAddress;
      const buildingAdd : string = data.buildingName;
      registerData.postCode = zoneCode;
      registerData.address = roadAdd;
      registerData.address1 = jibunAdd;
      registerData.address2 = buildingAdd;

    }
  }).open(); 
}

</script>

<script lang="ts">
import {defineComponent} from "vue";
import MobileDetect from 'mobile-detect'


export default defineComponent({
    mounted() {
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js')
        document.head.appendChild(recaptchaScript)
        const md = new MobileDetect(window.navigator.userAgent)
        if(window.innerWidth < 800  || md.mobile() || md.tablet()){
        this.mobileState = true;
        }else if(window.innerWidth >= 800){
        this.mobileState = false;
        }
    },
    unmounted(){
      window.removeEventListener("resize", this.myEventHandler);
    },
    data: () => {
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

<style scoped>
#register .card{
  max-width: 40vw;
  margin: auto;
  border: none;
}

.registerBtn{
  background-color: grey;
  color: white;
  border: none;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 2px;
  padding-left: 3px;
  padding-right: 3px;
}

.m_outest_container{
  width: 100vw;
}
.m_inner_container{
  /*background-color: aqua;*/
  display: flex;
  align-items: center;
  flex-direction: column;
}
.m_title_box{
  width: 50vw;
  height: 20vw;
  
  display: flex;
  align-items: center;
  justify-content: center;
}
.m_title{
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.m_inner_box{
  width: 90vw;
  height: 20vw;
}
.m_label_title{
  font-size: 0.8rem;
}
.m_search_btn{
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  cursor: pointer;
  background-color: white;
}
.m_success_btn{
  width: 90vw;
  height: 15vw;
  background-color: grey;
  margin-top: 20px;
  border: none;
  border-radius: 2px;
  font-size: 25px;
  font-weight: 500;
  color: white;
}
.m_input{
  background-color: #f5f5f5;
  font-size: 0.8rem;
  font-weight: 300;
}
.m_registerBtn{
  background-color: grey;
  color: white;
  border: none;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 2px;
  padding-left: 3px;
  padding-right: 3px;
  font-size: 0.8rem;
}
</style>