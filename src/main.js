import './assets/style/common.less'
import 'element-ui/lib/theme-chalk/index.css'

import ElementUI from 'element-ui'
import axiosInit from './assets/js/axiosInit.js'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(ElementUI)
Vue.axios = Vue.prototype.$axios = axiosInit

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
