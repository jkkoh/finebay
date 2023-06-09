<template>
    <div class="wrap">
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
                        <p>Instagram</p>
                    </div>
                </div>
                <div class="top_inner">
                    <div class="top_up">
                        <p>Shop Information</p>
                    </div>
                    <div class="top_bot">
                        <p>about us</p>
                        <p>customer guide</p>
                        <p>agreement</p>
                        <p>privacy policy</p>
                        <p>shipping & delivery</p>
                        <p>size guide</p>
                    </div>
                </div>
            </div>
            <div class="bot_wrap">
                <div class="bot_inner">
                    <p>COPYRIGHT © FINEBAY ALL RIGHTS RESERVED. HOSTING BY AWS AMPLIFY</p>
                </div>
                <div class="bot_inner">
                    <p>상호명 : 하우스오브코 / 대표자명 : 고수정 / 문의이메일 : shopfinebay@gmail.com</p>
                    <p>사업장주소 : 경기도 용인시 수지구 풍덕천로 30번길 20 103동 504호 finebay</p>
                    <p>사업자등록번호 : 524-64-00599</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent ({

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
/* bot end */

</style>