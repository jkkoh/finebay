<template>
    <div class="wrap">
        <div class="main_wrap">
            <div class="image_box">
                <img class="about_image" src="@/images/banner/about_brand_banner.jpg" alt="">
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
    margin: 0;
    padding: 0;
}
.wrap{
    height: 100%;
    width: 100%;
    display: flex;
}
.about_image{
    margin-top: 100px;
    width:1000px;
}
.image_box{
    display: flex;
    justify-content: center;
}
</style>