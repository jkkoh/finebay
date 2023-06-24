<template>
    <div>
        <div class="wrap" v-if="!mobileState">
            <div class="outer_wrap">
                <div class="img_box">
                    <img class="size_image" src="@/images/etc/size_guide.jpg" alt="sizeGuide">
                </div>
            </div>
        </div>    
        <div v-if="mobileState" class="m_wrap">
            <div class="m_outer_wrap">
                <div class="m_img_box">
                    <img class="m_delivery_image" src="@/images/etc/size_guide.jpg" alt="sizeGuide">
                </div>
            </div>
        </div> 
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import MobileDetect from 'mobile-detect'
export default defineComponent ({
    mounted(){
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
    methods: {
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
<style>
*{
    margin:0;
    padding:0;
}
.wrap{
    height: 1798px;
}
.size_image{
    width:1000px;
}
.img_box{
    margin-top: -200px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.m_wrap{
    width: 100%;
}
.m_delivery_image{
    width: 100%;
}
.m_img_box{
    display: flex;
    justify-content: center;
}
</style>