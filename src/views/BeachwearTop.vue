<script lang="ts">
import { defineComponent } from 'vue'
import { items } from '../assets/items'
import { useRouter } from 'vue-router'
import MobileDetect from 'mobile-detect'

export default defineComponent({
    setup() {
        const router = useRouter ()
        const goToItem = (id: number) => {
            router.push({ path: `/item/${id}` })
        }
        return { items, goToItem }
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
    methods: {
        mouseTrue (id: number,a: boolean){
            //console.log('1 ' + a);
            var mouse = [false,false,false,false,false,false,false,false,false];
            a = true;
            mouse[id] = a;
            //mouse = true;
            //console.log('11111');
            //console.log(id);
            //console.log('a ' + mouse[id]);
            //console.log('c ' + mouse);
            this.mouse = mouse;
            
            return {mouse}
        },
        mouseFalse(id: number,a: boolean){
            //console.log('2 ' + a);
            var mouse = [false,false,false,false,false,false,false,false,false];
            a = false;
            mouse[id] = a;
            //mouse = false;
            //console.log('22222');
            //console.log(id);
            //console.log('b ' + mouse[id]);
            //console.log('c ' + mouse);
            this.mouse = mouse;
            
            return {mouse}
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
    data() {
        var mouse = [false,false,false,false,false,false,false,false,false];
        return {
            mouse,
            mobileState : false,
        }
    },
})

</script>

<template>
    <div>
        <div class="mainA" v-if="!mobileState">
            <div 
            v-for="(item, i) in items" 
            :key="i"
            >
            <div class="mainB" v-if="item.part === 'Top' && item.category === 'Beachwear' ">
                <div class="mainC">
                    <div class="subA clickable" @click="goToItem(i)" @mouseover="mouseTrue(i,mouse[i])" @mouseleave="mouseFalse(i,mouse[i])">
                        <div class="discount_box" v-if="item.discount !==0 ">-{{ item.discount }}%</div>
                        <div v-if="mouse[i]"><img :src="item.image[4]" class="subImage"/></div>
                        <div v-else><img :src="item.image[0]" class="subImage"/></div>
                    </div>
                    <div class="subB">
                        <p class="subTextA">{{ item.text }}</p>
                        <div class="subC">
                            <p class="subTextB crossed">{{ item.price }}원 </p>  <p class="subTextB" style="color: #d44511;">{{ item.price * 0.95 }}원 </p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div class="m_mainA" v-if="mobileState">
            <div 
            v-for="(item, i) in items" 
            :key="i"
            >
                <div class="m_mainB" v-if="item.part === 'Top' && item.category === 'Beachwear' ">
                    <div class="m_mainC">
                        <div class="m_subA clickable" @click="goToItem(i)" @mouseover="mouseTrue(i,mouse[i])" @mouseleave="mouseFalse(i,mouse[i])">
                            <div class="m_discount_box" v-if="item.discount !==0 ">-{{ item.discount }}%</div>
                            <div><img :src="item.image[0]" class="m_subImage"/></div>
                        </div>
                        <div class="m_subB">
                            <p class="m_subTextA">{{ item.text }}</p>
                            <div class="m_subC">
                                <p class="m_subTextB crossed">{{ item.price }}원 </p>  <p class="m_subTextB" style="color: #d44511;">{{ item.price * 0.95 }}원 </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.mainA {
    box-sizing: border-box;
    width: 90%;
    min-width: 1400px;
    position: relative;
    left: 5%;
}
.mainB {
    width: 33.33%;
    min-height: 700px;
    
    box-sizing: border-box;
    padding: 20px;
    
    float: left;
}
.mainC {
    width: 100%;
    height: 100%;
    
}
.subA {
    width: 100%;
    height: 100%;
    min-height: 600px;
    cursor: pointer;
    position: relative;
}
.discount_box{
    position: absolute;
    width: 50px;
    height: 30px;
    right: 15px;
    top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    font-weight: 700;
}
.subB {
    width: 100%;
    height: 100%;
    min-height: 100px;
    
}
.subC{
    width : 100%;
    display: flex;

}
.subTextA {
    margin-top: 7px;
    font-family: "Open_Sans";
    font-size: 22px;
}
.subTextB{
    font-family: "Open_Sans";
    font-size: 22px;
}
.crossed{
    text-decoration-line: line-through;
    text-decoration-color: black;
    margin-right: 10px;
}
.subImage{
    width: 100%;
}
/*mobile start*/
.m_mainA {
    box-sizing: border-box;
    width: 90%;
    position: relative;
    left: 5%;
}
.m_mainB {
    width: 50%;
    height: 80vw;
    box-sizing: border-box;
    padding: 3px;
    float: left;
}
.m_mainC {
    width: 100%;
}
.m_subA {
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: relative;
}
.m_discount_box{
    position: absolute;
    width: 30px;
    height: 18px;
    right: 5px;
    top: 5px;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    font-weight: 700;
}
.m_subB {
    width: 100%;
    height: 100%;
}
.m_subTextA {
    margin-top: 5px;
    font-family: "Open_Sans";
    margin-bottom: 0;
    font-size: 13px;
}
.m_subC{
    width : 100%;
    display: flex;

}
.m_subTextB{
    font-family: "Open_Sans";
    font-size: 13px;
}
.m_crossed{
    text-decoration-line: line-through;
    text-decoration-color: black;
    margin-right: 10px;
}
.m_subImage{
    width: 100%;
}
/*mobile end*/
</style>