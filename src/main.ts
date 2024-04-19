import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import svgIcon from '@/icons/svgIcon.vue'
import { setupGlobalH5Com } from '@/initCom/index'
import { setupGlobalCom } from '@/components/index'
import element from "element-plus";
import 'element-plus/dist/index.css'
import './style.css'
import { EventBus } from "@/utils/eventBus";

let eventBus = new EventBus()

let app: any;
app = createApp(App)
app.use(router)
app.use(store)
app.use(element)
app.component('svg-icon', svgIcon)
setupGlobalCom(app)
setupGlobalH5Com(app)
app.config.globalProperties.$vm = app;
app.provide("$eBus",eventBus)
app.mount('#app')
