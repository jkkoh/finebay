<template>
    <div>
        <button @click="pay()"></button>
        <div><span>hihihihihihihi</span></div>
    </div>
    
</template>

<script lang="ts">

import { defineComponent } from 'vue';


export default defineComponent({
    mounted() {
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', 'https://cdn.iamport.kr/v1/iamport.js')
        document.head.appendChild(recaptchaScript)
    },
    methods: {
        async pay(){
            const IMP = window.IMP;
            const b = import.meta.env.VITE_IMP_REST_API_KEY
            console.log(typeof(b))
            console.log(b)
            // await IMP.init()
        }
    }
})

</script>