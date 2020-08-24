import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginUserInfo: {
            role: window.sessionStorage.getItem('role') || '',
            userName: window.sessionStorage.getItem('userName') || ''
        }
    },
    mutations: {
        setLoginUserInfo(state, obj){
            state.loginUserInfo = obj
        }
    },
    actions: {

    },
    modules: {

    }
})
