import './assets/style/common.less'
import 'element-ui/lib/theme-chalk/index.css'
import mixin from './assets/js/mixin/dicMixin'

import ElementUI from 'element-ui'
import axiosInit from './assets/js/axiosInit.js'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(ElementUI)
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

Vue.mixin(mixin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
