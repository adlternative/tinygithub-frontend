import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueCookies from 'vue-cookies';
import store from './store'
import VueVirtualScroller from 'vue-virtual-scroller'

createApp(App).use(router).use(VueCookies).use(store).use(VueVirtualScroller).mount('#app')

axios.defaults.baseURL = process.env.VUE_APP_BASE_HOST
axios.defaults.headers['Content-Type'] = 'application/json'

window.GitCloneURL = process.env.VUE_APP_GIT_CLONE_URL