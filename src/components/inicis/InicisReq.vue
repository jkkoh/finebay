<template>

<div>
    <form  id="sendPayForm_id" action="" method="post" >
        <input type="hidden" name="version" value="1.0">
        <input type="hidden" name="gopaymethod" value="Card:Directbank:vbank">
        <input type="hidden" name="mid" :value="mid">
        <input type="hidden" name="oid" :value="oid">
        <input type="text" name="price" :value="price">
        <input type="hidden" name="timestamp" :value="timestamp">
        <input type="hidden" name="signature" :value="signature">
        <input type="hidden" name="mKey" :value="mKey">
        <input type="hidden" name="currency" :value="currency">
        <input type="text" name="goodname" :value="goodname">
        <input type="text" name="buyername" :value="buyername">
        <input type="text" name="buyertel" :value="buyertel">
        <input type="text" name="buyeremail" :value="buyeremail">
        <input type="hidden" name="returnUrl" :value="returnUrl">
        <input type="hidden" name="closeUrl" :value="closeUrl">
    </form>
    <button @click="paybtn()">결제</button>
</div>

</template>

<script setup lang="ts">
import CryptoJs from 'crypto-js'
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia';
import { useInicisStore } from '@/stores/cartStore'
import { type DisplayInicis } from '@/types/interfaces';
import { onMounted } from 'vue'
const inicisStore = useInicisStore()
const { displayInicis } = storeToRefs(inicisStore)

onMounted(()=>{
    inicisStore.loadInicisInstance()
    inicisStore.displayInicisLoad()
})
const aaa = localStorage.getItem('inicis') as string
const bbb = JSON.parse(aaa)
console.log(aaa)
console.log('111111')
console.log(bbb.products[0])
const version = '1.0'
const gopaymethod = 'VBank'
const mid = import.meta.env.VITE_PG_MID
const oid = '12532512612342152136324'
const timestamp = dayjs().valueOf();
const price = bbb.products[0].price
const signature = CryptoJs.SHA256(`oid=${oid}&price=${price}&timestamp=${timestamp}`).toString();
const mKey = CryptoJs.SHA256(import.meta.env.VITE_PG_SIGN_KEY).toString();
const currency = 'WON'
const goodname = bbb.products[0].goodname
const buyername = bbb.products[0].buyername
const buyertel = bbb.products[0].buyertel
const buyeremail = bbb.products[0].buyeremail
const returnUrl = 'https://www.finebay.co.kr/inicis/pay/after'
const closeUrl = 'https://www.finebay.co.kr/inicis/pay/close'
console.log(mid)

function paybtn(){
    window.INIStdPay.pay('sendPayForm_id')
}

</script>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    mounted(){
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', 'https://stgstdpay.inicis.com/stdjs/INIStdPay.js')
        document.head.appendChild(recaptchaScript)
    },
})
</script>
<style>
.inipay_modal.fade{
    opacity: 1;
}


</style>