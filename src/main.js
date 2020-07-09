import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "assets/styl/reset.styl"
import CopyRight from "components/CopyRight"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component("copyright", CopyRight);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
