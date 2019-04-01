/*
 * @description:
 * @Author: 9thArts@LucasWang
 * @LastEditors: 9thArts@LucasWang
 * @Date: 2019-03-04
 * @LastEditTime: 2019-03-04
 */
import Main from '_c/main-new'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 *  自定义图标前必须加 '_' 可省去 'icon-'
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页',
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/view/single-page/home/home')
      }
    ]
  },
  {
    path: '/userManagement',
    name: 'userManagement',
    meta: {
      // access: ['用户管理'],
      icon: '_gongren',
      title: '用户管理'
    },
    component: Main,
    children: [
      {
        path: 'message',
        name: 'message',
        meta: {
          // access: ['权限信息'],
          icon: '_gongren',
          title: '权限信息'
        },
        component: () => import('@/view/userManagement/message.vue')
      }
    ]
  },
  {
    path: '/organization',
    name: '组织架构管理',
    meta: {
      // access: ['shareSource'],
      icon: '_gongren',
      title: '组织架构管理'
    },
    component: Main,
    children: [
      {
        path: 'structure',
        name: '组织架构管理',
        meta: {
          // access: ['share'],
          icon: '_gongren',
          title: '组织架构管理'
        },
        component: () => import('@/view/organization/structure.vue')
      }
    ]
  },
  {
    path: '/personnelFiles',
    name: '人事档案管理',
    meta: {
      // access: ['仓库'],
      icon: '_gongren',
      title: '人事档案管理'
    },
    component: Main,
    children: [
      {
        path: 'basisFiles',
        name: '基础档案',
        meta:{
          // access: ['仓库管理'],
          icon: '_gongren',
          title: '基础档案'
        },
        component: () => import('@/view/personnelFiles/basisFiles.vue')
      },
      {
        path: 'contractFiles',
        name: 'contractFiles',
        meta:{
          // access: ['仓库管理'],
          icon: '_gongren',
          title: '合同档案'
        },
        component: () => import('@/view/personnelFiles/contractFiles.vue')
      },
      {
        path: 'trainingFiles',
        name: 'trainingFiles',
        meta:{
          // access: ['仓库管理'],
          icon: '_gongren',
          title: '培训档案'
        },
        component: () => import('@/view/personnelFiles/trainingFiles.vue')
      }
    ]
  },
  {
    path: '/salaryManagement',
    name: '薪资管理',
    meta: {
      // access: ['shareSource'],
      icon: '_gongren',
      title: '薪资管理'
    },
    component: Main,
    children: [
      {
        path: 'salaryTable',
        name: '薪资表',
        meta: {
          // access: ['share'],
          icon: '_gongren',
          title: '薪资表'
        },
        component: () => import('@/view/salaryManagement/salaryTable.vue')
      },
      {
        path: 'customBenefits',
        name: '自定义福利',
        meta: {
          // access: ['share'],
          icon: '_gongren',
          title: '自定义福利'
        },
        component: () => import('@/view/salaryManagement/customBenefits.vue')
      },
      {
        path: 'paymentBase',
        name: '缴费基数设置',
        meta: {
          // access: ['share'],
          icon: '_gongren',
          title: '缴费基数设置'
        },
        component: () => import('@/view/salaryManagement/paymentBase.vue')
      }
    ]
  },
  {
    path: '/statistics',
    name: '报表统计',
    meta: {
      // access: ['shareSource'],
      icon: '_gongren',
      title: '报表统计'
    },
    component: Main,
    children: [
      {
        path: 'staffList',
        name: '人员清单',
        meta: {
          // access: ['share'],
          icon: '_gongren',
          title: '人员清单'
        },
        component: () => import('@/view/statistics/staffList.vue')
      },
      {
        path: 'salaryDetail',
        name: '薪资明细',
        meta: {
          // access: ['share'],
          icon: '_gongren',
          title: '薪资明细'
        },
        component: () => import('@/view/statistics/salaryDetail.vue')
      },
      {
        path: 'trainingHistory',
        name: '培训历史',
        meta: {
          // access: ['share'],
          icon: '_gongren',
          title: '培训历史'
        },
        component: () => import('@/view/statistics/trainingHistory.vue')
      },
      {
        path: 'attendance',
        name: '考勤统计',
        meta: {
          // access: ['share'],
          icon: '_gongren',
          title: '考勤统计'
        },
        component: () => import('@/view/statistics/attendance.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
