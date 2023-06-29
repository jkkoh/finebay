<template>
    <div>
        <p>결제가 완료되었습니다</p>
        <p>{{job}}</p>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import {computed } from 'vue'


</script>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data(){
        return {
            job: {}
        }
    },
    mounted(){
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', 'https://stgstdpay.inicis.com/stdjs/INIStdPay.js')
        document.head.appendChild(recaptchaScript)
        fetch('http://127.0.0.1:5173/inicis/pay/page')
        .then(res => res.json())
        .then(data => this.job = data)
        .catch(err => console.log(err))
    }
})
</script>
