import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./routes"

Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  // let isLogin = sessionStorage.token ? true : false
  // if (to.path == '/login') {
  //   next()
  // } else {
  //   isLogin ? next() : router.push('/login');
  // }
  next();
})

export default router
