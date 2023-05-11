import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

createApp(App).use(router).mount('#app')

axios.defaults.baseURL='http://localhost:8083'
axios.defaults.headers['Content-Type'] = 'application/json'