import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authReady: false
  },
  mutations: {
    setAuthReady(state, ready){
      state.authReady = ready
    }
  },
  actions: {
  },
  modules: {
  }
})