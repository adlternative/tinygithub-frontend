import cookie from 'vue-cookies'
import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    token: '',
    islogin: false,
  },
  getters: {
    isLogin(state) {
      return state.islogin === true
    },
    getToken(state) {
      return state.token
    },
  },
  mutations: {
    setSession(state) {
      state.token = cookie.get("tinygithub-session")
      state.islogin = true
    },
    deleteSession(state) {
      cookie.remove("tinygithub-session")
      state.token = ''
      state.islogin = false
    }
  }
})