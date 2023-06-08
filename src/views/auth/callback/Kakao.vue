<template>    
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import store from 'vue';


export default defineComponent ({
    layout: 'layout_login',
    async asyncData(){
        const config = {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': 'Bearer '
            }
        };
        const param = {
            grant_type : 'authorization_code',
            client_id : '8198ec924047a3f699b762f8a8b43787'
        }
    }
})

</script>