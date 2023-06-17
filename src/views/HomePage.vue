<script lang="ts">
import {defineComponent} from 'vue';
import SlideShow from "../components/SlideShow.vue";
import { useRouter } from 'vue-router';
const router = useRouter()

export default defineComponent({
    components:{
        SlideShow
    },
    data:()=>{
        return{
            slideCounts : 4,
            currentId : 1,
            startAnime : false,
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
        }
    },
    created: function() {
        setInterval( ()=> {
            this.startAnime = true;
            this.dir("right");
        },5000)
    },


})
</script>

<template>
<div class="wrap">
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
        <p>Everyday is fineday</p>
        <p>당신의 편안한 fine day를 위한 fine 스윔웨어, fineday.</p>
        <p>산업 폐기물을 재활용한 리사이를 소재를 중심으로</p>
        <p>사람과 자연에 편안한 스윔웨어를 만듭니다</p>
        <br>
        <br>
        <p>원자재부터 포장재까지 친환경 제품을 사용하며</p>
        <p>자연과 함께 더불어 지속가능한 패션을 추구합니다.</p>
        </div>
    </div>
    <div class="best_area">
        <div class="inner_best_area"></div>
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
}

.text_area{
    position: relative;
    width: 100%;
    height: 50vh;
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
    height: 50vh;
    background-color: aqua;
}
.swimwear_banner{
    width: 100%;
    position: relative;
    height:80vh;
}
.inner_swimwear_banner{
    width: 100%;
    height: 100%;
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
    object-fit: cover;
    cursor: pointer;
}
.beachwear_banner{
    width: 100%;
    position: relative;
    height: 80vh;
    margin-top: 30px;
}

.inner_beachwear_banner{
    width: 100%;
    height: 100%;
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
    cursor: pointer;
    object-fit: cover;
}

</style>