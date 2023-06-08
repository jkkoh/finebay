<template>
    <div>
        
    </div>
</template>

<script lang="ts">
import { defineComponent, DefineComponent } from 'vue';

export default defineComponent({
    layout: 'layout_login',
    mounted() {
        const naverLogin = new naver.LoginWithNaverID({
            clientId: '3yiRIiZEM6RhVCIR03u8'
        })
        naverLogin.init()
        naverLogin.getLoginStatus(function(status){
            if(status) {
                const info ={
                    id: naverLogin.user.id,
                    age: naverLogin.user.age,
                    gender: naverLogin.user.gender,
                    nickname: naverLogin.user.nickname,
                }
                console.log(info)
            }else{
                console.log('Access Token 이 올바르지 않습니다')
            }
        })
    }
})

</script>