import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main/Main.vue'),
    children: [
      {
        path: '/Product',
        name: 'Product',
        component: () => import('../views/Product/Product.vue')
      }, {
        path: '/ProductEdit',
        name: 'ProductEdit',
        component: () => import('../views/Product/ProductEdit.vue')
      }
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, form, next) => {
  if(to.name !== 'Login' && !store.state.userName){
    return  next({path: '/Login'})
  }
  next()
})

export default router
