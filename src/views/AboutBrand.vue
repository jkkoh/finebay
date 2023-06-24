<template>
    <div>
        <div class="wrap" v-if="!mobileState">
            <div class="main_wrap">
                <div class="image_box">
                    <img class="about_image" src="@/images/banner/about_brand_banner.jpg" alt="">
                </div>
            </div>
        </div>
        <div v-if="mobileState" class="m_wrap">
            <div class="m_outer_wrap">
                <div class="m_img_box">
                    <img class="m_delivery_image" src="@/images/banner/about_brand_banner.jpg" alt="sizeGuide">
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
    margin: 0;
    padding: 0;
}
.wrap{
    height: 100%;
    width: 100%;
    display: flex;
}
.about_image{
    margin-top: 100px;
    width:1000px;
}
.image_box{
    display: flex;
    justify-content: center;
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