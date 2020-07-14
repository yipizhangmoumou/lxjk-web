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
        },
        {
          path: '/applyForAssess',
          name: 'applyForAssess',
          meta: { name: '评估申请管理' },
          component: () => import("views/FinancingService/ApplyForAssess")
        },
        {
          path: '/serviceAdmin',
          name: 'serviceAdmin',
          meta: { name: '融资服务管理' },
          component: () => import("views/FinancingService/ServiceAdmin")
        },
        {
          path: '/executiveProgramme',
          name: 'executiveProgramme',
          meta: { name: '融资执行方案管理' },
          component: () => import("views/FinancingService/ExecutiveProgramme")
        },
        {
          path: '/ServiceDetails/:financingCode',
          name: 'ServiceDetails',
          meta: { name: '融资服务详情' },
          component: () => import("views/FinancingService/ServiceDetails")
        },
        {
            path: '/evaluationDetails/:id',
            name: 'evaluationDetails',
            meta: {
                name: '评估详情'
            },
            component: () => import("views/FinancingService/EvaluationDetails")
        }, 
        {
            path: '/productCustomization',
            name: 'productCustomization',
            meta: {
                name: '产品定制'
            },
            component: () => import("views/FinancingService/ProductCustomization")
        },
        {
          path: '/customization/:financingCode',
          name: 'customization',
          meta: { name: '服务定制' },
          component: () => import("views/Customization")
        },
        {
          path: '/Product',
          name: 'Product',
          meta: { name: '产品管理' },
          component: () => import("views/Product/Product")
        },
        {
          path: '/ProductEdit',
          name: 'ProductEdit',
          meta: { name: '新增编辑产品' },
          component: () => import("views/Product/ProductEdit")
        },
        {
          path: '/LendingInstitutions',
          name: 'LendingInstitutions',
          meta: { name: '产品贷款机构管理' },
          component: () => import("views/Product/LendingInstitutions")
        },
        {
          path: '/DataDictionary',
          name: 'DataDictionary',
          meta: { name: '数据字典管理' },
          component: () => import("views/Setting/DataDictionary")
        },
        {
          path: '/User',
          name: 'User',
          meta: { name: '用户管理' },
          component: () => import("views/Setting/User")
        }
      ]
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("views/Login.vue")

    },
    {
        path: "*",
        redirect: "/"
    }
]

export default routes