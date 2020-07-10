import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component:() => import("views/Home.vue"),
    redirect: '/organizationAdmin',
    children: [
      {
        path: '/organizationAdmin',
        name: 'OrganizationAdmin',
        meta: { name: '助贷机构管理' },
        component: () => import("views/LoansHelp/OrganizationAdmin.vue")
      },
      {
        path: '/postAdmin',
        name: 'PostAdmin',
        meta: { name: '机构岗位管理' },
        component: () => import("views/LoansHelp/PostAdmin.vue")
      },
      {
        path: '/employeeAdmin',
        name: 'EmployeeAdmin',
        meta: { name: '助贷机构员工管理' },
        component: () => import("views/LoansHelp/EmployeeAdmin.vue")
      },
      {
        path: '/checkEmployee',
        name: 'CheckEmployee',
        meta: { name: '待审核员工' },
        component: () => import("views/LoansHelp/CheckEmployee.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component:() => import("views/Login.vue")

  },
  {
    path: "*",
    redirect: "/"
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

export default router
