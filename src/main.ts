import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { authentication } from './plugins/authentication'
import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports.js'
import router from './router'
import VueCookies from 'vue-cookies'
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap"
import App from './App.vue'

Amplify.configure(awsExports);
declare var require: any

window.Kakao.init("45d12f55b95977d3c49c0c268eb3437a");


const app = createApp(App)

app.use(createPinia()).use(VueCookies,{expires: "1d",secure: true})

authentication.install().then(()=>{
  app.use(router)
  app.mount('#app') 
})

