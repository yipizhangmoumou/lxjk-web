import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: window.sessionStorage.getItem('userName') && JSON.parse(window.sessionStorage.getItem('userName'))
  },
  mutations: {
    setUserName (state, userName) {
      state.userName = userName
    }
  },
  actions: {
    setUserInfo ({commit}, info) {
      console.log(info)
      commit('setUserName', info.userName)
    }
  },
  modules: {
  }
})
