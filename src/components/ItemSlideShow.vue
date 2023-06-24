<template>
    <div>
        <div class="m_slide" v-if="mobileState" :class="[whereAmI]">
            <img :src="img" alt="img" class="m_slide-img">
                <div class="m_slide-bullets">
                    <div v-for="n in count" :key="n" class="m_slide-bullet" 
                    :class="{'m_bullet-on' :n === currentId ? true : false}">
                    </div>
                </div>
                <div class="m_bar" :class="{'m_bar-animation' : startAnime}">
                </div>
            <div class="m_right-arrow" @click="$emit('direction', 'right')">
                <div class="m_arrow-position-div">
                    <img src="../images/logo/arrow.png" alt="arrow" class="m_right-arrow-pic">
                </div>
            </div>
            <div class="m_left-arrow" @click="$emit('direction', 'left')">
                <div class="m_arrow-position-div">
                    <img src="../images/logo/arrow.png" alt="arrow" class="m_left-arrow-pic">
                </div>
            </div>
        </div>
    </div>
    </template>
    
    <script>
    import MobileDetect from 'mobile-detect'
    
    export default {
        name: "ItemSlideShow",
        props: ["data","img","myId","currentId","count","startAnime"],
        mounted(){
            window.addEventListener("resize", this.myEventHandler);
            const md = new MobileDetect(window.navigator.userAgent)
            if(window.innerWidth < 800 || md.mobile() || md.tablet()){
                this.mobileState = true;
            }else if(window.innerWidth >= 800){
                this.mobileState = false;
            }
        },
        unmounted(){
            window.removeEventListener("resize", this.myEventHandler);
        },
        methods: {
            myEventHandler(){
                const mobile = 800
                if(window.innerWidth < mobile ){
                    this.mobileState = true;
                }else if(window.innerWidth >= mobile){
                    this.mobileState = false;
                }
        },
        },
        data:()=>{
            return{
                mobileState : false
            }
        },
        computed: {
            whereAmI: function () {
                if(this.myId > this.currentId){
                    return{
                        "slide-right" : true,
                        "slide-left" : false,
                        "m_slide-right" : true,
                        "m_slide-left" : false,
                    }
                    
                } else if (this.myId < this.currentId) {
                    return{
                        "slide-right" : false,
                        "slide-left" : true,
                        "m_slide-right" : false,
                        "m_slide-left" : true,
                    }
                } else {
                    return{
                        "slide-right" : false,
                        "slide-left" : false,
                        "m_slide-right" : false,
                        "m_slide-left" : false,
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
        @keyframes mmyBar{
            from{
                transform: translate(-50%, 40px) scaleX(0) scaleY(.5);
            }
            to{
                transform: translate(-50%, 40px) scaleX(1) scaleY(1);
            }
            
        }
    
        .m_bar{
            background-color: rgba(0,0,0,0.7);
            width: 90%;
            height: 3px;
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            bottom: 50px;
            visibility: hidden;
        }
        .m_bar-animation{
            visibility: visible;
            transform-origin: 0 0;
            animation: mmyBar 5s infinite;
        }
        /*mobile start*/
        .m_slide {
            width: 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            transition: 1s;
            overflow: hidden;
        }
        .m_slide-right{
            opacity: 0;
            visibility: hidden;
        }
        .m_slide-left{
            opacity: 0;
            visibility: hidden;
        }
        .m_slide-img{
            width: 100%;
            height: inherit;
            position: relative;
            object-fit: cover;
        }
        .m_right-arrow{
            position: absolute;
            right: 10%;
            top: 50%;
            transform: translate(50%,-50%);
            height: 20px;
            width: 30px;
        }
        .m_left-arrow{
            position: absolute;
            left: 10%;
            top: 50%;
            transform: translate(-50%,-50%);
            height: 20px;
            width: 30px;
        }
        .m_arrow-position-div{
            position: relative;
            width: 100%;
            height: 100%;
        }
        .m_right-arrow-pic{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            width: 100%;
            height: 50px;
            opacity: 0.3;
            transition: 0.5s;
        }
        .m_m_right-arrow-pic:hover{
            opacity: 1;
        }
        .m_left-arrow-pic{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%)  rotate(180deg);
            width: 100%;
            height: 50px;
            opacity: 0.3;
            transition: 0.5s;
        }
        .m_left-arrow-pic:hover{
            opacity: 1;
        }
        .m_slide-bullets{
            width: 100px;
            height: 30px;
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translate(-50%);
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        .m_slide-bullet{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: transparent;
            border: 2px solid rgba(0,0,0,0.7);
            position: relative;
        }
        .m_slide-bullet::after{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%) scale(0);
            content: "";
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: rgba(0,0,0,0.7);
            opacity: 0;
            transition: 1s;
        }
        .m_bullet-on::after{
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        /*mobile end*/
    </style>