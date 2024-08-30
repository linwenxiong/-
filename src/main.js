import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css';
import './assets/main.css'
import color from './plugins/color'
const app = createApp(App)
app.use(createPinia())
app.use(Antd)
app.use(color)


app.use(router)
app.mount('#app')
