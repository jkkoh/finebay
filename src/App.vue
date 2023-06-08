<template>
 <Header />
 <div class="container my-3">
  <router-view />
 </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './components/Header.vue'
export default defineComponent({
  components: { Header }
})
</script>

<style>
@font-face {
  font-family: 'Roboto';
  src: url('assets/fonts/Roboto/Roboto-Medium.ttf') format('truetype');
}
@font-face {
  font-family: 'Open_Sans';
  src: url('assets/fonts/Open_Sans/static/OpenSans-Regular.ttf') format('truetype');
}
@font-face {
  font-family: 'Open_Sans_I';
  src: url('assets/fonts/Open_Sans/static/OpenSans-Italic.ttf') format('truetype');
}
@font-face {
  font-family: 'Noto_Sans';
  src: url('assets/fonts/Noto_Sans/NotoSansKR-Light.otf') format('truetype');
}
</style>

