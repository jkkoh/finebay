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
            <div class="m_outer_wrap">
                <div class="m_top_wrap">
                    <div class="m_top">
                        <div class="m_top_top">
                            <div class="m_top_top_inner">
                                <HeaderLink to="/aboutBrand">About Us</HeaderLink>
                            </div>
                            <div class="m_top_top_inner">
                                <span>Customer Guide</span>
                            </div>
                            <div class="m_top_top_inner">
                                <span>Agreement</span>
                            </div>
                            <div class="m_top_top_inner">
                                <span>Privacy Policy</span>
                            </div>
                            <div class="m_top_top_inner">
                                <HeaderLink to="/deliveryGuide">Shipping & Delivery</HeaderLink>
                            </div>
                            <div class="m_top_top_inner">
                                <HeaderLink to="/sizeGuide">Size Guide</HeaderLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m_bot_wrap">
                    <div class="m_bot_bot">
                        <div class="m_bot_up">
                            <p>Customer Service</p>
                        </div>
                        <div class="m_bot_down">
                            <p>연락처 : 070-8080-4595</p>
                            <p>카카오톡 : Finebay</p>
                            <p>월요일 - 금요일 AM 11:00 - PM 5:00</p>
                            <p>토요일 일요일 공휴일 휴무</p>
                        </div>
                    </div>
                </div>
                <div class="m_bot_wrap">
                    <div class="m_bot_bot">
                        <div class="m_bot_up">
                            <p>Bank Account</p>
                        </div>
                        <div class="m_bot_down">
                            <p>국민은행 : 29030104102933</p>
                            <p>예금주 : 하우스오브코</p>
                        </div>
                    </div>
                </div>
                <div class="m_bot_wrap">
                    <div class="m_bot_bot">
                        <div class="m_bot_up">
                            <p>Follow Us</p>
                        </div>
                        <div class="m_bot_down">
                            <span class="link_tag" @click="goToInstagram()">Instagram</span>
                        </div>
                    </div>
                </div>
                <div class="m_bot_wrap">
                    <div class="m_bot_bot">
                        <div class="m_bot_up">
                            <p>Company Info</p>
                        </div>
                        <div class="m_bot_down">
                            <p>상호명 : 하우스오브코</p>
                            <p>대표자명 : 고수정</p>
                            <p>문의이메일 : shopfinebay@gmail.com</p>
                            <p>사업장주소 : 경기도 용인시 수지구 풍덕천로 30번길 20 103동 504호 finebay</p>
                            <p>사업자등록번호 : 524-64-00599</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import HeaderLink from './HeaderLink.vue'
import MobileDetect from 'mobile-detect'
export default defineComponent ({
    components:  { HeaderLink },
    mounted(){
        window.addEventListener("resize", this.myEventHandler);
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

/* mobile start*/
.m_top_wrap{
    width: 100%;
    height: 150px;
    border-top: 1px solid rgba(55, 55, 55, 0.5);
    border-bottom: 1px solid rgba(55, 55, 55, 0.5);
    margin-top: 30px;
}
.m_top{
    width: 100%;
}
.m_top_top{
    width: 100%;
    position: relative;
}
.m_top_top{
    width: 80vw;
    left: 10vw;
    top: 10vw;
    float: left;
}
.m_top_top_inner{
    display: inline-block;
}
.m_top_top_inner > div {
    padding-left: 7px;
    padding-right: 7px;
    font-size: 0.8rem;
    box-sizing: border;
    border-right: 1px solid #555;
    color: #777
}
.m_top_top_inner > span{
    padding-left: 7px;
    padding-right: 7px;
    font-size: 0.8rem;
    box-sizing: border;
    border-right: 1px solid #555;
    color: #777
}
.m_bot_wrap{
    width:100%;
    border-bottom: 1px solid #555;
}
.m_bot_bot{
    position: relative;
    width: 80%;
    left: 10vw;
    padding-top: 10vw;
    padding-bottom: 10vw;
}
.m_bot_up{
    width: 100%;
    font-size: 1.3rem;
}
.m_bot_down{
    font-size: 0.8rem;
}

/* mobile end*/

</style>