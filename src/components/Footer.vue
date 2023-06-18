<template>
    <div class="wrap">
        <div v-if="!mobileState">
            <div class="outer_wrap">
                <div class="top_wrap">
                    <div class="top_inner">
                        <div class="top_up">
                            <p>Customer Service</p>
                        </div>
                        <div class="top_bot">
                            <p>070-8080-4595</p>
                            <p>카카오톡 : Finebay</p>
                            <p>월요일 - 금요일 AM 11:00 - PM 5:00</p>
                            <p>토요일 일요일 공휴일 휴무</p>
                        </div>
                    </div>
                    <div class="top_inner">
                        <div class="top_up">
                            <p>Bank Account</p>
                        </div>
                        <div class="top_bot">
                            <p>국민은행 29030104102933</p>
                            <p>예금주 하우스오브코</p>
                        </div>
                    </div>
                    <div class="top_inner">
                        <div class="top_up">
                            <p>Follow us</p>
                        </div>
                        <div class="top_bot">
                            <span class="link_tag" @click="goToInstagram()">Instagram</span>
                        </div>
                    </div>
                    <div class="top_inner">
                        <div class="top_up">
                            <p>Shop Information</p>
                        </div>
                        <div class="top_bot">
                            <HeaderLink to="aboutBrand"><a>about us</a></HeaderLink>
                            <p>customer guide</p>
                            <p>agreement</p>
                            <p>privacy policy</p>
                            <HeaderLink to="deliveryGuide"><a>shipping & delivery</a></HeaderLink>
                            <HeaderLink to="sizeGuide"><a>size guide</a></HeaderLink>
                        </div>
                    </div>
                </div>
                <div class="bot_wrap">
                    <div class="bot_inner">
                        <p>COPYRIGHT © FINEBAY ALL RIGHTS RESERVED. HOSTING BY AWS AMPLIFY</p>
                    </div>
                    <div class="bot_inner bot_inner_a">
                        <p class="bot_inner_text_a">상호명 : 하우스오브코 / 대표자명 : 고수정 / 문의이메일 : shopfinebay@gmail.com</p>
                        <p class="bot_inner_text_a">사업장주소 : 경기도 용인시 수지구 풍덕천로 30번길 20 103동 504호 finebay</p>
                        <p class="bot_inner_text_a">사업자등록번호 : 524-64-00599</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="mobileState">
            <div>
                <p>aaaaaaaaa</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import HeaderLink from './HeaderLink.vue'
export default defineComponent ({
    components:  { HeaderLink },
    mounted(){
        window.addEventListener("resize", this.myEventHandler);
        if(window.innerWidth < 800){
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
        goToInstagram(){
            window.open("https://www.instagram.com/finebay_official/","_blank")
        },
        myEventHandler(){
            const mobile = 800
            if(window.innerWidth < mobile ){
                this.mobileState = true;
            }else if(window.innerWidth >= mobile){
                this.mobileState = false;
            }
        }
    },
})
</script>
<style>
*{
    margin: 0;
    padding:0;
}
.outer_wrap{
    margin-top: 300px;
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    min-width: 1300px;
    height: 500px;
}
.top_wrap{
    width: 100%;
    height: 70%;
    display: flex;
}
.top_inner{
    width: 25%;
    height: 100%;
}
.top_up{
    width: 100%;
    height: 60px;
    color: rgb(100, 100, 100);
}
.link_tag{
    font-style: none;
    color: black;
    cursor: pointer;
}
/* top end */
/* bot start */
.bot_wrap{
    width: 100%;
    height: 30%;
    display: flex;
    color: rgb(100, 100, 100);
}
.bot_inner{
    width: 50%;
    height: 100%;
}
.bot_inner_text_a{
    width: 100%;
    display: flex;
    justify-content: end;
}
/* bot end */

</style>