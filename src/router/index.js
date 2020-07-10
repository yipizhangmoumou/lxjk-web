import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    redirect: '/Product',
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
      }, {
        path: '/User',
        name: 'User',
        component: () => import('../views/User/User.vue')
      }, {
        path: '/LoanAssistanceInstitutions',
        name: 'LoanAssistanceInstitutions',
        component: () => import('../views/LoanAssistanceInstitutions/LoanAssistanceInstitutions.vue')
      }, {
        path: '/LoanAssistanceInstitutionsEdit',
        name: 'LoanAssistanceInstitutionsEdit',
        component: () => import('../views/LoanAssistanceInstitutions/LoanAssistanceInstitutionsEdit.vue')
      }, {
        path: '/LoanAssistanceInstitutionsUser',
        name: 'LoanAssistanceInstitutionsUser',
        component: () => import('../views/LoanAssistanceInstitutionsUser/LoanAssistanceInstitutionsUser.vue')
      }, {
        path: '/DataDictionary',
        name: 'DataDictionary',
        component: () => import('../views/DataDictionary/DataDictionary.vue')
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
