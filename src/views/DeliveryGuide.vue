<template>
    <div class="wrap">
        <div class="outer_wrap">
            <div class="img_box">
                <img class="delivery_image" src="@/images/etc/delivery_guide.jpg" alt="sizeGuide">
            </div>
        </div>
    </div>    
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent ({

})
</script>
<style>
*{
    margin:0;
    padding:0;
}
.wrap{
    height: 1798px;
}
.delivery_image{
    width:1000px;
}
.img_box{
    display: flex;
    justify-content: center;
}
</style>