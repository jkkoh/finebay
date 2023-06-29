<template>
    <p>결제가 완료되었습니다</p>
</template>

<script setup lang="ts">
import axios from 'axios'
import {computed } from 'vue'

const data = computed(()=>{
    axios.get('/inicis/pay/page').then((response)=>{
        console.log(response)
    })
})
console.log('111111111111111')
console.log(data)
</script>
