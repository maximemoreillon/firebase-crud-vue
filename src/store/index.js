import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    authReady: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setAuthReady(state) {
      state.authReady = true
    },
  },
  actions: {
  },
  modules: {
  }
})