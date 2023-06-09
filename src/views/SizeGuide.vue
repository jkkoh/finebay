<template>
    <div class="wrap">
        <div class="outer_wrap">
            <div class="img_box">
                <img class="size_image" src="@/images/etc/size_guide.jpg" alt="sizeGuide">
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
.size_image{
    width:1000px;
}
.img_box{
    display: flex;
    justify-content: center;
}
</style>