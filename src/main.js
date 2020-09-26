import Vue from 'vue'
import { mapState } from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import CopyRight from "components/CopyRight"
import ElementUI from 'element-ui';
import "assets/styl/reset.styl"
import "assets/styl/common.styl"
import 'element-ui/lib/theme-chalk/index.css';

import axiosInit from './assets/js/axiosInit.js'

import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

import {validateBase, validatePhone} from './assets/js/validate'

Vue.axios = Vue.prototype.$axios = axiosInit
Vue.msgSuccess = Vue.prototype.$msgSuccess = function (message) {
  Vue.prototype.$message({
    message: message || '成 功',
    type: 'success'
    // ,
    // center: true
  })
}

Vue.msgError = Vue.prototype.$msgError = function (message) {
  Vue.prototype.$message({
    message: message || '失 败',
    type: 'error'
    // ,
    // center: true
  })
}
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component("copyright", CopyRight);

const baseConfirm = (type = '') => {
  type = type || '确认进行此操作'
  return new Promise((resolve, reject) => {
    Vue.prototype.$confirm(type, '确认').then(() => {
      resolve()
    }).catch(() => {reject()})
  })
}
Vue.mixin({
  computed: {
    ...mapState(['loginUserInfo'])
  },
  methods: {
    validateBase,
    validatePhone,
    baseConfirm
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
