<script lang="ts">
import {defineComponent} from 'vue';
import SlideShow from "../components/SlideShow.vue";
import { useRouter } from 'vue-router';
import { items } from '../assets/items'
import MobileDetect from 'mobile-detect'


export default defineComponent({
    setup(){
        const router = useRouter ()
        const goToItem = (id: number) => {
            router.push({ path: `/item/${id}` })
        }
        return { items, goToItem }
    },
    components:{
        SlideShow
    },
    data:()=>{
        return{
            slideCounts : 4,
            currentId : 1,
            startAnime : false,
            mobileState : false,
            slideData: [
                {
                    img: new URL("../images/banner/homebanner_1.jpg", import.meta.url).href
                },
                {
                    img: new URL("../images/banner/homebanner_2.jpg", import.meta.url).href
                },
                {
                    img: new URL("../images/banner/homebanner_3.jpg", import.meta.url).href
                },
                {
                    img: new URL("../images/banner/homebanner_4.jpg", import.meta.url).href
                }

            ]
        }
    },
    methods:{
        dir: function(myDir : string){
            if(myDir === "right"){
                if(this.currentId < this.slideCounts){
                    this.currentId += 1;
                } else{
                    this.currentId = 1;
                }
            } else{
                if(this.currentId > 1) {   
                    this.currentId -= 1;
                } else {
                    this.currentId = this.slideCounts;
                }
            }
        },
        toSwimwear(){
            this.$router.push({name: 'swimwearAll'})
        },
        toBeachwear(){
            this.$router.push({name: 'beachwearAll'})
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
    created: function() {
        setInterval( ()=> {
            this.startAnime = true;
            this.dir("right");
        },5000)
    },
    mounted(){
        window.addEventListener("resize", this.myEventHandler);
        const md = new MobileDetect(window.navigator.userAgent)
        if(window.innerWidth < 800   || md.mobile() || md.tablet()){
        this.mobileState = true;
        }else if(window.innerWidth >= 800){
            this.mobileState = false;
        }
    },
    unmounted() {
        window.removeEventListener("resize", this.myEventHandler);
    },

})
</script>

<template>
<div class="wrap">
    <div v-if="mobileState == false">
        <div class="slide-show">
            <SlideShow v-for="(data, index) in slideData" 
            :key="index"
            :img="slideData[index].img"
            :myId="index + 1"
            :currentId="currentId"
            :count="slideCounts"
            @direction="dir"
            :startAnime="startAnime"
            />
        </div>
        <div class="text_area">
            <div class="inner_text_area">
            <h2>Sustainable Swimwear</h2>
            <br>
            <p>아름다운 바다를 위한 fine 스윔웨어 Fine Bay.</p>
            <p>산업 폐기물을 재활용한 리사이를 소재를 중심으로</p>
            <p>사람과 자연에 편안한 스윔웨어를 만듭니다.</p>
            <br>
            <br>
            <p>원자재부터 포장재까지 친환경 제품을 사용하며</p>
            <p>자연과 함께 더불어 지속가능한 패션을 추구합니다.</p>
            </div>
        </div>
        <div class="best_area">
            <div class="inner_best_area">
                <div class="best_top">
                    <span>BEST</span>
                </div>
                <div class="best_bot">
                    <div class="best_bot_inner">
                        <div class="best_bot_inner_inner">
                            <div class="inner_img_box">
                                <img :src="items[14].image[0]" alt="" class="inner_img" @click="goToItem(14)">
                            </div>
                            <div class="inner_text_box">
                                <div class="botbot_top"> {{items[14].text}} </div>
                                <div class="botbot_bot"><p style="color:#555; textDecorationLine : line-through;">{{items[14].price}}</p><p>{{items[14].price * 0.95}}</p></div>
                            </div>
                        </div>
                    </div>
                    <div class="best_bot_inner">
                        <div class="best_bot_inner_inner">
                            <div class="inner_img_box">
                                <img :src="items[0].image[0]" alt="" class="inner_img" @click="goToItem(0)">
                            </div>
                            <div class="inner_text_box">
                                <div class="botbot_top"> {{items[0].text}} </div>
                                <div class="botbot_bot"> <p style="color:#555; textDecorationLine : line-through;">{{items[0].price}}</p> <p>{{items[0].price * 0.95}}</p>  </div>
                            </div>
                        </div>
                    </div>
                    <div class="best_bot_inner">
                        <div class="best_bot_inner_inner">
                            <div class="inner_img_box">
                                <img :src="items[7].image[0]" alt="" class="inner_img" @click="goToItem(7)">
                            </div>
                            <div class="inner_text_box">
                                <div class="botbot_top"> {{items[7].text}} </div>
                                <div class="botbot_bot"><p style="color:#555; textDecorationLine : line-through;">{{items[7].price}}</p><p>{{items[7].price * 0.95}}</p></div>
                            </div>
                        </div>
                    </div>
                    <div class="best_bot_inner">
                        <div class="best_bot_inner_inner">
                            <div class="inner_img_box">
                                <img :src="items[9].image[0]" alt="" class="inner_img" @click="goToItem(9)">
                            </div>
                            <div class="inner_text_box">
                                <span class="botbot_top"> {{items[9].text}}</span>
                                <span class="botbot_bot"><p style="color:#555; textDecorationLine : line-through;">{{items[9].price}}</p><p>{{items[9].price * 0.95}}</p></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="swimwear_banner">
            <div class="inner_swimwear_banner">
                <img src="@/images/banner/swimwear_banner.jpg" alt="swimwearbanner" @click="toSwimwear()">
            </div>
        </div>
        <div class="beachwear_banner">
            <div class="inner_beachwear_banner">
                <img src="@/images/banner/beachwear_banner.jpg" alt="beachwearbanner" @click="toBeachwear()">
            </div>
        </div>
    </div>
    <div v-if="mobileState == true">
        <div>
            <div class="m_slide_show">
                <SlideShow v-for="(data, index) in slideData" 
                :key="index"
                :img="slideData[index].img"
                :myId="index + 1"
                :currentId="currentId"
                :count="slideCounts"
                @direction="dir"
                :startAnime="startAnime"
                />
            </div>
            <div class="m_text_area">
                <div class="m_inner_text_area">
                <h2>Sustainable Swimwear</h2>
                <h2></h2>
                <br>
                <p>아름다운 바다를 위한 fine 스윔웨어 Fine Bay.</p>
                <br>
                <p>산업 폐기물을 재활용한 리사이를 소재를 중심으로</p>
                <p>사람과 자연에 편안한 스윔웨어를 만듭니다.</p>
                <br>
                <p>원자재부터 포장재까지 친환경 제품을 사용하며</p>
                <p>자연과 함께 더불어 지속가능한 패션을 추구합니다.</p>
                </div>
            </div>
            <div class="m_best_area">
                <div class="m_inner_best_area">
                    <div class="m_best_top">
                        <h2>Best</h2>
                    </div>
                    <div class="m_best_bot">
                        <div class="m_best_bot_inner">
                            <div class="m_best_bot_inner_inner">
                                <div class="m_inner_img_box">
                                    <img :src="items[14].image[0]" alt="" class="inner_img" @click="goToItem(14)">
                                </div>
                                <div class="m_inner_text_box">
                                    <div class="m_botbot_top"> {{items[14].text}} </div>
                                    <span class="m_botbot_bot"><p style="color:#555; textDecorationLine : line-through;">{{items[14].price}}</p><p>{{items[14].price * 0.95}}</p></span>
                                </div>
                            </div>
                        </div>
                        <div class="m_best_bot_inner">
                            <div class="m_best_bot_inner_inner">
                                <div class="m_inner_img_box">
                                    <img :src="items[0].image[0]" alt="" class="inner_img" @click="goToItem(0)">
                                </div>
                                <div class="m_inner_text_box">
                                    <div class="m_botbot_top"> {{items[0].text}} </div>
                                    <span class="m_botbot_bot"><p style="color:#555; textDecorationLine : line-through;">{{items[0].price}}</p><p>{{items[0].price * 0.95}}</p></span>
                                </div>
                            </div>
                        </div>
                        <div class="m_best_bot_inner">
                            <div class="m_best_bot_inner_inner">
                                <div class="m_inner_img_box">
                                    <img :src="items[7].image[0]" alt="" class="inner_img" @click="goToItem(7)">
                                </div>
                                <div class="m_inner_text_box">
                                    <div class="m_botbot_top"> {{items[7].text}} </div>
                                    <span class="m_botbot_bot"><p style="color:#555; textDecorationLine : line-through;">{{items[7].price}}</p><p>{{items[7].price * 0.95}}</p></span>
                                </div>
                            </div>
                        </div>
                        <div class="m_best_bot_inner">
                            <div class="m_best_bot_inner_inner">
                                <div class="m_inner_img_box">
                                    <img :src="items[9].image[0]" alt="" class="inner_img" @click="goToItem(14)">
                                </div>
                                <div class="m_inner_text_box">
                                    <div class="m_botbot_top"> {{items[9].text}} </div>
                                    <span class="m_botbot_bot"><p style="color:#555; textDecorationLine : line-through;">{{items[9].price}}</p><p>{{items[9].price * 0.95}}</p></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    
</template>

<style>
*{
    margin: 0;
    padding: 0;
}
.wrap{

}
.slide-show{
    height: calc(100vh - 100px);   
    min-height: 800px;
}

.text_area{
    position: relative;
    width: 100%;
    height: 50vh;
    min-height: 600px;
    align-items: center;
    box-sizing: border-box;
}
.inner_text_area{
    width: 50%;
    min-width: 800px;
    height: 40vh;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.inner_text_area > h2 {
    font-size: 40px;
}
.inner_text_area > p{
    font-size: 25px;
} 
.best_area{
    width: 100%;
    position: relative;
    min-height: 500px;
}
.best_top{
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.best_top > span{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 45px;
    font-family: "Open_Sans";
}
.best_bot{
    width: 100%;
    height: 450px;
    display: flex;
    margin-bottom: 50px;
}
.best_bot_inner{
    width: 25%;
    height: 550px;
    display : flex;
    align-items: center;
    justify-content: center;
}
.best_bot_inner_inner{
    width: 80%;
    height: 80%;
}

.swimwear_banner{
    width: 100%;
    position: relative;
    height: 80vh;
    min-height: 600px;
}
.inner_swimwear_banner{
    width: 100%;
    height: 100%;
    min-height: 500px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
}
.inner_swimwear_banner > img{
    width: 100%;
    min-height: 500px;
    object-fit: cover;
    cursor: pointer;
}
.beachwear_banner{
    width: 100%;
    position: relative;
    height: 80vh;
    min-height: 600px;
    margin-top: 30px;
}

.inner_beachwear_banner{
    width: 100%;
    height: 100%;
    min-height: 500px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
}
.inner_beachwear_banner > img{
    width: 100%;
    min-height: 500px;
    cursor: pointer;
    object-fit: cover;
}
.inner_img{
    width: 100%;
    cursor: pointer;
}
.inner_text_box{
    width: 100%;
    height: 100px;
}
.botbot_top{
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.botbot_bot{
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.botbot_bot > p{
    margin-right: 10px;
}

/*mobile start*/
.m_slide_show{
    margin: 0;  
    width: 100vw;
    height: 57vw;
    min-height: 100px;
}
.m_text_area{
    position: relative;
    width: 100%;
    height: 70vh;
    align-items: center;
}
.m_inner_text_area{
    width: 90%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.m_inner_text_area > h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
}
.m_inner_text_area > p{
    font-size: 0.6rem;
} 
.m_best_area {
    width: 100%;
    position: relative;
    min-height: 500px;
}
.m_inner_best_area{
    width: 100%;
}
.m_best_top{
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.m_best_top > h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
}
.m_best_bot{
    width: 100%;
    
}
.m_best_bot_inner{
    margin-top: 20px;
    margin-bottom: 20px;
}
.m_botbot_bot{
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
}
.m_botbot_bot > p{
    margin-right: 10px;
}

/*mobile end*/
</style>