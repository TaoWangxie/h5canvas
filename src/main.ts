import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import { setupGlobalH5Com } from '@/initCom/index'
import { setupGlobalCom } from '@/components/index'
import element from "element-plus";
import 'element-plus/dist/index.css'
import './style.css'




let app: any;
app = createApp(App)
app.use(router)
app.use(store)
app.use(element)
setupGlobalCom(app)
setupGlobalH5Com(app)
app.config.globalProperties.$vm = app;
app.mount('#app')
