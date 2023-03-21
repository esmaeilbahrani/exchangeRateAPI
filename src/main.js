//------------------------------------
//1. initialize
import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/sass/style.scss'

//------------------------------------
//2. components
import VueSvgInlinePlugin from "vue-svg-inline-plugin";
import "vue-svg-inline-plugin/src/polyfills";
import VueCookies from 'vue3-cookies'


//------------------------------------
//3. create app
const app = createApp(App)

//------------------------------------
//4. use
app.use(VueSvgInlinePlugin);
app.use(createPinia())
app.use(router)
app.use(VueSvgInlinePlugin, {
    attributes: {
        data: ["src"],
        remove: ["alt"]
    }
});
app.use(VueCookies, {
    expireTimes: "3d",
    path: "/",
    domain: "",
    secure: true,
    sameSite: "None"
});

//------------------------------------
//5. mount
app.mount('#app')
