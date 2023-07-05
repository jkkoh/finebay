<template>
  <div>
    <div id="register" v-if="!mobileState">
      <div class="container">
        <div class="card card-body mt-4">
          <h5 class="card-title">Register</h5> <p>* 필수 항목</p>
          <div>
            <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
            <div class="mb-3">
              <label for="email" class="form-label">이메일</label>
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
              <label for="postCode" class="form-label">우편번호</label> <button @click="sample4_execDaumPostcode()">검색</button>
              <input v-model="registerData.postCode" type="postCode" class="form-control" id="postCode" autocomplete="off" placeholder="*">
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">도로명 주소</label>
              <input v-model="registerData.address" type="address" class="form-control" id="address" autocomplete="off" placeholder="*" >
            </div>
            <div class="mb-3">
              <label for="address1" class="form-label">지번 주소</label>
              <input v-model="registerData.address1" type="address1" class="form-control" id="address1" autocomplete="off">
            </div>
            <div class="mb-3">
              <label for="address2" class="form-label">상세주소</label>
              <input v-model="registerData.address2" type="address2" class="form-control" id="address2" autocomplete="off">
            </div>
            <div class="mb-3">
              <label for="address3" class="form-label">참고항목</label>
              <input v-model="registerData.address3" type="address3" class="form-control" id="address3" autocomplete="off">
            </div>
            <button class="btn btn-success" @click="register()">Register</button>
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
              <label for="email" class="form-label m_label_title">이메일</label>
              <input v-model="registerData.email" type="email" class="form-control m_input" id="email" autocomplete="off" placeholder="" style="border: none;">
            </div>
            <div class="m_inner_box">
              <label for="name" class="form-label m_label_title">이름</label>
              <input v-model="registerData.name" type="text" class="form-control m_input" id="first_name" autocomplete="off" placeholder="" style="border: none;">
            </div>
            <div class="m_inner_box">
              <label for="password" class="form-label m_label_title">비밀번호</label>
              <input v-model="registerData.password" type="password" class="form-control m_input" id="password" placeholder="" style="border: none;">
            </div>
            <div class="m_inner_box">
              <label for="password_confirm" class="form-label m_label_title">비밀번호 확인</label>
              <input v-model="registerData.password_confirm" type="password" class="form-control m_input" id="password_confirm" placeholder="" style="border: none;">
            </div>
            <div class="m_inner_box">
              <label for="postCode" class="form-label m_label_title">우편번호</label> <button class="m_search_btn" @click="sample4_execDaumPostcode()">검색</button>
              <input v-model="registerData.postCode" type="postCode" class="form-control m_input" id="postCode" autocomplete="off" placeholder="" style="width: 40vw; border:none;" > 
            </div>
            <div class="m_inner_box">
              <label for="address" class="form-label m_label_title">도로명 주소</label>
              <input v-model="registerData.address" type="address" class="form-control m_input" id="address" autocomplete="off" placeholder="" style="border: none;">
            </div>
            <div class="m_inner_box">
              <label for="address1" class="form-label m_label_title">지번 주소</label>
              <input v-model="registerData.address1" type="address1" class="form-control m_input" id="address1" autocomplete="off" style="border: none;">
            </div>
            <div class="m_inner_box">
              <label for="address2" class="form-label m_label_title">상세주소</label>
              <input v-model="registerData.address2" type="address2" class="form-control m_input" id="address2" autocomplete="off" style="border: none;">
            </div>
            <div class="m_inner_box">
              <label for="address3" class="form-label m_label_title">참고항목</label>
              <input v-model="registerData.address3" type="address3" class="form-control m_input" id="address3" autocomplete="off" style="border: none;">
            </div>
            <button class="m_success_btn" @click="register()">Register</button>
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

const errorMessage = ref<string>("")

async function register(){
  if(registerData.email !== "" && registerData.name !== "" && registerData.password !== "" &&
  registerData.password_confirm !== "" && registerData.postCode !== "" && registerData.address !== ""){
    await authStore.register(registerData)
    .then(res => {
      alert('회원가입이 정상적으로 성공했습니다')
      router.replace({name: "login"})
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
  font-size: 30px;
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
  width: 15vw;
  margin-left: 10px;
  border: 1px solid black;
  font-size: 0.8rem;
}
.m_success_btn{
  width: 90vw;
  height: 15vw;
  background-color: rgba(100, 255, 71, 0.8);
  margin-top: 20px;
  border: none;
  border-radius: 30px;
  font-size: 25px;
  font-weight: 500;
  color: white;
}
.m_input{
  background-color: #f5f5f5;
  font-size: 0.8rem;
  font-weight: 300;
}
</style>