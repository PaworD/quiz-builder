import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: { isLoggedIn: false },
  mutations: {
    SET_LOGGED_IN (state, value) {
      state.isLoggedIn = value
    }
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn
  }
})
