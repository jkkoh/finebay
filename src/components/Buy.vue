<template>
    <div class="wrap">
        <div class="main_wrap">
            <div class="inner_wrap">
                <div class="customer_info">
                    <div class="top">
                        <span class="inner_top">주문정보</span>
                    </div>
                    <div class="customer_bot">
                        <div class="reglar_size_box">
                            <div class="customer_bot_left">
                                <span>주문자</span>
                            </div>
                            <div class="customer_bot_right">
                                <input type="text" class="regular_input">
                            </div>
                        </div>
                        <div class="reglar_size_box">
                            <div class="customer_bot_left">
                                <span>이메일</span>
                            </div>
                            <div class="customer_bot_right">
                                <input type="text" class="regular_input">
                            </div>
                        </div>
                        <div class="phone_size_box">
                            <div class="customer_bot_left">
                                <span>전화번호</span>
                            </div>
                            <div class="phone_number_bot_right">
                                <input type="tel" class="left_phone" pattern="[0-9]{3}"> <span class="dash_box"> - </span> <input type="tel" class="mid_phone" pattern="[0-9]{4}"> <span class="dash_box"> - </span> <input type="tel" class="right_phone" pattern="[0-9]{4}">
                            </div>
                        </div>
                        <div class="large_size_box">
                            <div class="customer_bot_left">
                                <span>주소</span>
                            </div>
                            <div class="address_bot_right">
                                <div class="top_address_box">
                                    <div class="post_code_box">
                                        <input type="text" placeholder="우편번호" class="address_1">
                                    </div>
                                    <div class="address_search_box">
                                        <span class="search_btn">주소검색</span>
                                    </div>
                                </div>
                                <div class="mid_address_box">
                                    <input type="text" placeholder="기본 주소" class="address_2">
                                </div>
                                <div class="bot_address_box">
                                    <input type="text" placeholder="나머지 주소" class="address_2">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="delivery_info">
                    <div class="top">
                        <span class="inner_top">배송지</span>
                    </div>
                    <div class="delivery_bot">
                        <div class="regular_size_box">
                            <div class="delivery_check">
                                <div class="checked1">
                                    <input type="radio" name="check">
                                    <span>주문자 정보와 동일</span>
                                </div>
                                <div class="checked2">
                                    <input type="radio" name="check">
                                    <span>새로운 배송지</span>
                                </div>
                            </div>
                        </div>
                        <div class="reglar_size_box">
                            <div class="customer_bot_left">
                                <span>받는사람</span>
                            </div>
                            <div class="customer_bot_right">
                                <input type="text" class="regular_input">
                            </div>
                        </div>
                        <div class="large_size_box">
                            <div class="customer_bot_left">
                                <span>주소</span>
                            </div>
                            <div class="address_bot_right">
                                <div class="top_address_box">
                                    <div class="post_code_box">
                                        <input type="text" placeholder="우편번호" class="address_1">
                                    </div>
                                    <div class="address_search_box">
                                        <span class="search_btn">주소검색</span>
                                    </div>
                                </div>
                                <div class="mid_address_box">
                                    <input type="text" placeholder="기본 주소" class="address_2">
                                </div>
                                <div class="bot_address_box">
                                    <input type="text" placeholder="나머지 주소" class="address_2">
                                </div>
                            </div>
                        </div>
                        <div class="phone_size_box">
                            <div class="customer_bot_left">
                                <span>전화번호</span>
                            </div>
                            <div class="phone_number_bot_right">
                                <input type="tel" class="left_phone" pattern="[0-9]{3}"> <span class="dash_box"> - </span> <input type="tel" class="mid_phone" pattern="[0-9]{4}"> <span class="dash_box"> - </span> <input type="tel" class="right_phone" pattern="[0-9]{4}">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="product_info">
                    <div class="top">
                        <span class="inner_top">주문상품</span>
                    </div>
                    <div class="product_bot">
                        <div class="for_box">
                            <div class="img_box">
                                <span>사진들어감</span>
                            </div>
                            <div class="info_box">
                                <span>상품 이름</span>
                                <span>상품 사이즈</span>
                                <span>상품 수량</span>
                            </div>
                            <div class="delete_box">
                                <span>삭제</span>
                                <span>X</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sales_info">
                    <div class="top">
                        <span class="inner_top">할인정보</span>
                    </div>
                    <div class="sales_bot">
                        <div class="customer_bot_left">
                            <span>할인코드 적용</span>
                        </div>
                        <div class="sales_bot_right">
                            <input type="text" class="sales_input_box"><button class="apply_btn">적용</button>
                        </div>
                    </div>
                    <div class="sales_applied">
                        <div class="customer_bot_left">
                            <span>적용금액</span>
                        </div>
                        <div class="discounted_price_box">
                            <span class="red_discounted">-0</span>
                        </div>
                    </div>
                </div>
                <div class="price_info">
                    <div class="top">
                        <span class="inner_top">결제정보</span>
                    </div>
                    <div class="price_info_bot">
                        <div class="price_info_bot_left">
                            <div class="inner_info_bot_left">
                                <span class="price_info_left1">주문상품</span>
                                <span class="price_info_left1">배송비</span>
                                <span class="price_info_left1">할인</span>
                            </div>
                            <span class="price_info_left2">최종 결제 금액</span>
                        </div>
                        <div class="price_info_bot_right">
                            <div class="inner_info_bot_right">
                                <span class="price_info_right1">49000</span>
                                <span class="price_info_right1">무료</span>
                                <span class="price_info_right1">-0</span>
                            </div>
                            <div class="inner_info_final_price">
                                <span class="price_info_right2">49000</span>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="payment_info">
                    <div class="top">
                        <span class="inner_top">결제수단</span>
                    </div>
                    <div class="payment_info_bot">
                        <div class="payment_card">
                            <input type="radio" class="card_checked" name="payment">
                            <span>카드 결제</span>
                        </div>
                        <div class="payment_kakao">
                            <input type="radio" class="kakao_checked" name="payment">
                            <span>카카오페이</span>
                        </div>
                    </div>
                </div>
                <div class="buy">
                    <span>50000원 결제하기</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">

</script>
<style>
.inner_wrap{
    width:1000px;
    margin-top: 50px;
}
.customer_info{
    width: 100%;
    height: 600px;
    box-sizing: border-box;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
}
.delivery_info{
    width: 100%;
    height: 600px;
    box-sizing: border-box;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
}
.product_info{
    width: 100%;
    height: 600px;
    box-sizing: border-box;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
}
.sales_info{
    width: 100%;
    height: 600px;
    box-sizing: border-box;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
}
.price_info{
    width: 100%;
    height: 600px;
    box-sizing: border-box;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
}
.payment_info{
    width: 100%;
    height: 600px;
    box-sizing: border-box;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
}
.buy{
    width: 100%;
    height: 100px;
    background-color: indianred;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 45px;
    cursor: pointer;
}
.top{
    width: 100%;
    height: 100px;
    background-color: indianred;
    display: flex;
    align-items: center;
}
.inner_top{
    font-size: 24px;
    margin-left: 25px;
}
.customer_bot{
    width: 100%;
    display: flex;
    flex-direction: column;
}
.reglar_size_box{
    width: 100%;
    height: 100px;
    display: flex;
}
.large_size_box{
    width: 100%;
    height: 200px;
    display: flex;
}
.customer_bot_left{
    width: 20%;
    height: 100%;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.customer_bot_right{
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
}
.regular_input{
    margin-left: 2.5%;
    font-size: 40px;
    border-radius: 10px;
    border: 0.2px solid rgba(100, 100, 100, 0.5);
    width: 95%;
    height: 50%;
    padding-left: 20px;
}
.left_phone{
    width: 100px;
}
.mid_phone{
    width: 100px;
}
.right_phone{
    width: 100px;
}
.dash_box{
    font-size: 30px;
    margin-left: 3px;
    margin-right: 3px;
}

.phone_size_box{
    width: 100%;
    height: 100%;
    display: flex;
}
.phone_number_bot_right{
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 20px;
}

.sales_bot{
    display: flex;
}
.sales_input_box{
    width:500px;
    height: 100%;
    margin-left: 10px;
}
.apply_btn{
    width:50px;
    height: 100%;
    margin-left: 2px;
}
.sales_applied{
    display: flex;
    justify-content: space-between;
}
.red_discounted{
    margin-right: 10px;
    font-size: 24px;
}


.top_address_box{
    display: flex;
    height: 60px;
    width: 100%;
    align-items: center;
}
.mid_address_box{
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
}
.bot_address_box{
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
}
.search_btn{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 50px;
    background-color: darkkhaki;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid black;
    cursor: pointer;
}

.delivery_check{
    display: flex;
}
.checked1{
    margin-left: 10px;
    font-size: 20px;
}
.checked2{
    margin-left: 10px;
    font-size: 20px;
}

.address_bot_right{
    margin-left: 2.5%;
    width: 80%;
    display: flex;
    flex-direction: column;
}
.address_1{
    height: 50px;
    width: 100%;
    font-size: 20px;
    border-radius: 10px;
    border: 0.2px solid rgba(100, 100, 100, 0.5);
}
.address_2{
    height: 50px;
    width: 100%;
    font-size: 20px;
    border-radius: 10px;
    border: 0.2px solid rgba(100, 100, 100, 0.5);
    margin-right: 2.5%;
}

.product_bot{
    width: 100%;
    display: flex;
}
.for_box{
    display: flex;
}
.img_box{
    width: 150px;
    height: 200px;
    background-color: blueviolet;
    margin-left: 10px;
    margin-top: 10px;
}
.info_box{
    width: 650px;
    height: 200px;
    background-color: darkcyan;
    margin-top: 10px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.delete_box{
    width: 150px;
    height: 200px;
    background-color: darkorange;
    margin-top: 10px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}


.sales_bot_right{
    width: 100%;
}
.price_info_bot{
    display: flex;
    justify-content: space-between;
}
.price_info_bot_left{
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 300px;
    justify-content: space-between;
}
.price_info_left1{
    width: 120px;
    height: 40px;
    font-size: 20px;
    display: flex;
    align-items: center;
    margin-left: 10px;
}
.price_info_left2{
    width: 250px;
    height: 60px;
    font-size: 30px;
    margin-left: 10px;
}
.price_info_bot_right{
    display: flex;
    flex-direction: column;
    width: 300px;
    justify-content: space-between;
}
.inner_info_bot_right{
    display: flex;
    flex-direction: column;
    align-items: end;
}
.price_info_right1{
    width: 120px;
    height: 40px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: end;
    margin-right: 10px;
}
.price_info_right2{
    width: 250px;
    height: 60px;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: end;
    margin-right: 10px;
}
.inner_info_final_price{
    display: flex;
    flex-direction: column;
    align-items: end;
}

.payment_info_bot{
    width: 100%;
    height: 150px;
}
.payment_card{
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
    font-size: 30px;
    margin-left: 10px;
}
.payment_kakao{
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
    font-size: 30px;
    margin-left: 10px;
}
.card_checked{
    width: 15px;
    height: 15px;
    margin-right: 10px;
}
.kakao_checked{
    width: 15px;
    height: 15px;
    margin-right: 10px;
}
</style>