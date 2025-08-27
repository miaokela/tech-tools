import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css'
import 'virtual:uno.css'
import './styles/global.css'

const app = createApp(App)
app.use(Antd)
app.mount('#app')