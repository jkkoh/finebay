<template>
  <div id="register">
    <div class="container">
      <div class="card card-body mt-4">
        <h5 class="card-title">Register</h5>
        <form @submit.prevent="submit">
          <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
          <div class="mb-3">
            <label for="email" class="form-label">이메일</label>
            <input v-model="registerData.email" type="email" class="form-control" id="email" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">이름</label>
            <input v-model="registerData.name" type="text" class="form-control" id="first_name" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">비밀번호</label>
            <input v-model="registerData.password" type="password" class="form-control" id="password">
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label">비밀번호 확인</label>
            <input v-model="registerData.password_confirm" type="password" class="form-control" id="password_confirm">
          </div>
          <div class="mb-3">
            <label for="postCode" class="form-label">우편번호</label> <button @click="sample4_execDaumPostcode()">검색</button>
            <input v-model="registerData.postCode" type="postCode" class="form-control" id="postCode" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">도로명 주소</label>
            <input v-model="registerData.address" type="address" class="form-control" id="address" autocomplete="off" >
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
          <button type="submit" class="btn btn-success">Register</button>
        </form>
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

async function submit(){
  await authStore.register(registerData)
    .then(res => {
      router.replace({name: "login"})
    })
    .catch(err => {
      errorMessage.value = err.message
    })
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



export default defineComponent({
    mounted() {
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js')
        document.head.appendChild(recaptchaScript)
    }
})
</script>

<style scoped>
#register .card{
  max-width: 40vw;
  margin: auto;
}
</style>