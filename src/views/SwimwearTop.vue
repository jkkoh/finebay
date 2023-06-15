<script lang="ts">
import { defineComponent } from 'vue'
import { items } from '../assets/items'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const router = useRouter ()
        const goToItem = (id: number) => {
            router.push({ path: `/item/${id}` })
        }
        return { items, goToItem }
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
        }
    },
    data() {
        var mouse = [false,false,false,false,false,false,false,false,false];
        return {
            mouse
        }
    },
})

</script>

<template>
    <div class="mainA">
        <div 
        v-for="(item, i) in items" 
        :key="i"
        >
        <div class="mainB" v-if="item.part === 'Top'">
            <div class="mainC">
                <div class="subA clickable" @click="goToItem(i)" @mouseover="mouseTrue(i,mouse[i])" @mouseleave="mouseFalse(i,mouse[i])">
                    <div v-if="mouse[i]"><img :src="item.image[4]" class="subImage"/></div>
                    <div v-else><img :src="item.image[0]" class="subImage"/></div>
                </div>
                <div class="subB">
                    <p class="subTextA">{{ item.text }}</p>
                    <div class="subC">
                        <p class="subTextB crossed">{{ item.price }} </p>  <p class="subTextB">{{ item.price * 0.95 }} </p>
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
    text-decoration-color: red;
    margin-right: 10px;
}
.subImage{
    width: 100%;
}
</style>