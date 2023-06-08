<template>
    <div class="postcode-demo">
        <button @click="showPopup()">test button</button>
        <PostCode v-if="visible" @address="addrSelected"/>
    </div>
</template>

<script>
import PostCode from './components/PostCode.vue'
export default {
    components: {
        PostCode, 
    },
    data(){
        return {
            visible: false
        }
    },
    mounted() {
            
    },
    methods: { 
        showPopup() {
            this.visible = true;
        },
        addrSelected(detail) {
            console.log('선택된 주소', detail);
            this.visible = false;
        }
    }
}
</script>