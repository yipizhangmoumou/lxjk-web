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
        },
        {
          path:'/addOrganization',
          name: 'addOrganization',
          meta: { name: '新增助贷机构' },
          component: () => import("views/AddOrganization.vue")
        },
        {
          path:'/addAndEditEmployee/:type',
          name: 'addAndEditEmployee',
          meta: { name: '机构自行新增员工' },
          component: () => import("views/AddAndEditEmployee.vue")
        },
        {
          path:'/log',
          name: 'log',
          meta: { name: '日志' },
          component: () => import("views/Log.vue")
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

export default routes