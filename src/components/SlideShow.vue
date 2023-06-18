<template>
<div>
    <div class="slide" :class="[whereAmI]">
        <img :src="img" alt="img" class="slide-img">
            <div class="slide-bullets">
                <div v-for="n in count" :key="n" class="slide-bullet" 
                :class="{'bullet-on' :n === currentId ? true : false}">
                </div>
            </div>
            <div class="bar" :class="{'bar-animation' : startAnime}">
            </div>
        <div class="right-arrow" @click="$emit('direction', 'right')">
            <div class="arrow-position-div">
                <img src="../images/logo/arrow.png" alt="arrow" class="right-arrow-pic">
            </div>
        </div>
        <div class="left-arrow" @click="$emit('direction', 'left')">
            <div class="arrow-position-div">
                <img src="../images/logo/arrow.png" alt="arrow" class="left-arrow-pic">
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "SlideShow",
    props: ["data","img","myId","currentId","count","startAnime"],
    computed: {
        whereAmI: function () {
            if(this.myId > this.currentId){
                return{
                    "slide-right" : true,
                    "slide-left" : false
                }
                
            } else if (this.myId < this.currentId) {
                return{
                    "slide-right" : false,
                    "slide-left" : true
                }
            } else {
                return{
                    "slide-right" : false,
                    "slide-left" : false
                }
            }
        }
    }
}
</script>

<style>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .slide {
        width: 100%;
        min-width: 2000px;
        position: absolute;
        top:calc(50% + 100px);
        left: 50%;
        transform: translate(-50%, -50%);
        height: calc(100vh - 115px);
        min-height: 800px;
        transition: 1s;
        overflow: hidden;
    }
    .slide-right{
        opacity: 0;
        visibility: hidden;
    }
    .slide-left{
        opacity: 0;
        visibility: hidden;
    }
    .slide-img{
        width: 100%;
        height: calc(100vh - 100);
        position: relative;
        object-fit: cover;
    }
    .right-arrow{
        position: absolute;
        right: -50px;
        top: 50%;
        height: 75px;
        width: 50px;
        
    }
    .left-arrow{
        position: absolute;
        left: 100px;
        top: 50%;
        height: 75px;
        width: 50px;
        
    }
    .arrow-position-div{
        position: relative;
        left: calc(-50% - 50px);
        top: -50%;
        width: 100%;
        height: 100%;
    }
    .right-arrow-pic{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 100%;
        height: 75px;
        opacity: 0.3;
        transition: 0.5s;
    }
    .right-arrow-pic:hover{
        opacity: 1;
    }
    .left-arrow-pic{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%)  rotate(180deg);
        width: 100%;
        height: 75px;
        opacity: 0.3;
        transition: 0.5s;
    }
    .left-arrow-pic:hover{
        opacity: 1;
    }
    .slide-bullets{
        width: 100px;
        height: 30px;
        position: absolute;
        top: calc(100% - 220px);
        left: 50%;
        transform: translate(-50%);
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .slide-bullet{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: transparent;
        border: 3px solid #fff;
        position: relative;
    }
    .slide-bullet::after{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%) scale(0);
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #fff;
        opacity: 0;
        transition: 1s;
    }
    .bullet-on::after{
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }

    @keyframes myBar{
        from{
            transform: translate(-50%, 40px) scaleX(0) scaleY(.5);
        }
        to{
            transform: translate(-50%, 40px) scaleX(1) scaleY(1);
        }
        
    }

    .bar{
        background-color: rgba(255,255,255,0.7);
        width: 90%;
        height: 3px;
        position: absolute;
        top: calc(100% - 220px);
        left: 50%;
        visibility: hidden;
    }
    .bar-animation{
        visibility: visible;
        transform-origin: 0 0;
        animation: myBar 5s infinite;
    }
</style>