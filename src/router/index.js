import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '乡村振兴', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/poverty',
    component: Layout,
    name: 'poverty',
    redirect: '/poverty/poverty1',
    meta: { title: '贫困现状', icon: 'dashboard' },
    children: [
      // {
      //   path: 'poverty1',
      //   component: () => import('@/views/poverty/poverty1'),
      //   name: 'poverty1',
      //   meta: { title: '贫困现状1', icon: 'dashboard' }
      // },
      {
        path: 'new-poverty',
        component: () => import('@/views/poverty/new-poverty'),
        name: 'new-poverty',
        meta: { title: '贫困现状', icon: 'dashboard' }
      }

    ]

  },
  // {
  //   path: '/poverty1',
  //   component: () => import('@/views/poverty/index'),
  //   name: 'poverty1'
  // },
  {
    path: '/poor',
    component: Layout,
    redirect: '/poor/PovertyNum',
    name: 'poor',
    meta: {
      title: '贫困户帮扶',
      icon: 'star',
    },
    children: [
      {
        path: 'PovertyNum',
        component: () => import('@/views/poor/PovertyNum'),
        name: 'PovertyNum',
        meta: { title: '贫困人口统计', icon: 'dashboard' }
      },
      {
        path: 'PovertyInfo',
        component: () => import('@/views/poor/PovertyInfo'),
        name: 'PovertyInfo',
        meta: { title: '贫困人口信息', icon: 'dashboard' }
      },
      {
        path: 'PovertyInfo-detail',
        component: () => import('@/views/poor/PovertyInfo-detail'),
        name: 'PovertyInfo-detail',
        hidden: true,
        meta: { title: '贫困人口信息详情', icon: 'dashboard' }
      },
      {
        path: 'PovertyManage',
        component: () => import('@/views/poor/PovertyManage'),
        name: 'PovertyManage',
        meta: { title: '帮扶主体管理', icon: 'dashboard' }
      },
      {
        path: 'audit-information',
        name: 'audit-information',
        component: () => import('@/views/poor/audit-information/index'),

        meta: {
          title: '信息审核',
          icon: 'form'
        }
      },

    ]

  },

  {
    path: '/force',
    component: Layout,
    redirect: '/force/InfoManagement',
    name: 'force',
    meta: {
      title: '驻村工作队',
      icon: 'peoples'
    },
    children: [

      {
        path: 'InfoManagement',
        component: () => import('@/views/force/InfoManagement'),
        name: 'InfoManagement',
        meta: { title: '工作队信息管理', icon: 'dashboard' }
      },
      {
        path: 'notify',
        component: () => import('@/views/force/notify'),
        name: 'notify',
        meta: { title: '通知发布及跟踪', icon: 'dashboard' }
      },
      {
        path: 'TheWorkLog',
        component: () => import('@/views/force/TheWorkLog'),
        name: 'TheWorkLog',
        meta: { title: '工作日志', icon: 'dashboard' }
      }
      // {
      //   path: 'MetricDetection',
      //   component: () => import('@/views/force/MetricDetection'),
      //   name: 'MetricDetection',
      //   meta: { title: '项目指标监测', icon: 'dashboard' }
      // }
    ]

  },

  {
    path: '/engineering',
    component: Layout,
    redirect: '/engineering/rain-falls',
    alwaysShow: true, // will always show the root menu
    name: 'engineering',
    meta: {
      title: '扶贫措施',
      icon: 'star',

    },
    children: [

      {
        path: 'PolicyAdvocacy',
        component: () => import('@/views/engineering/PolicyAdvocacy/NationalNews'),
        name: 'PolicyAdvocacy',
        meta: {
          title: '政策宣传',
          icon: 'star'
        }

      },
      {
        path: 'rain-falls',
        component: () => import('@/views/engineering/rain-falls/index'),
        alwaysShow: true,
        name: 'rain-falls',
        meta: {
          title: '扶贫措施',
          icon: 'star'
        },
        children: [
          {
            path: 'technology',
            component: () => import('@/views/engineering/rain-falls/technology'),
            name: 'technology',
            meta: {
              title: '科技骨干培训班',
              icon: 'star'
            }
          },
          {
            path: 'business',
            component: () => import('@/views/engineering/rain-falls/business'),
            name: 'business',
            meta: {
              title: '帮扶措施管理',
              icon: 'star'
            }
          }
        ]
      },

      {
        path: 'Anti-povertyPlan',
        component: () => import('@/views/engineering/Anti-povertyPlan'),
        name: 'Anti-povertyPlan',
        meta: {
          title: '脱贫计划',
          icon: 'star'
        }
      },
      {
        path: 'TaskNotifications',
        component: () => import('@/views/engineering/TaskNotifications'),
        name: 'TaskNotifications',
        meta: {
          title: '任务查询',
          icon: 'star'
        }

      }
    ]
  },

  {
    path: '/project-engineering',
    component: Layout,
    redirect: '/project-engineering/poverty-crucial',
    alwaysShow: true,
    name: 'project-engineering',
    meta: {
      title: '资金使用',
      icon: 'money',
      noCache: true

    },
    children: [
      {
        path: 'poverty-crucial',
        alwaysShow: true,
        component: () => import('@/views/project-engineering/poverty-crucial/index'),
        name: 'poverty-crucial',
        meta: {
          title: '脱贫攻坚项目部',

        },
        children: [
          {
            path: 'first-project',
            component: () => import('@/views/project-engineering/poverty-crucial/first-project'),
            name: 'first-project',
            meta: {
              title: '2018脱贫攻坚项目部',

            }
          }
        ]
      },
      {
        path: 'project-management',
        alwaysShow: true,
        component: () => import('@/views/project-engineering/project-management/index'),
        name: 'project-management',
        meta: {
          title: '项目库管理',

        },
        children: [
          {
            path: 'reporting-guidelines',
            component: () => import('@/views/project-engineering/project-management/reporting-guidelines'),
            name: 'reporting-guidelines',
            meta: {
              title: '申报指南',

            }
          }
        ]
      },
      {
        path: 'money-issue',
        alwaysShow: true,
        component: () => import('@/views/project-engineering/money-issue/index'),
        name: 'money-issue',
        meta: {
          title: '资金发放',

        },
        children: [
          {
            path: 'money-issue1',
            component: () => import('@/views/project-engineering/money-issue/money-issue1'),
            name: 'money-issue1',
            meta: {
              title: '资金发放',

            }
          }
        ]
      }
    ]
  },
  {
    path: '/support-effect',
    component: Layout,
    redirect: '/support-effect/support-effect1',
    name: 'support-effect',
    meta: {
      title: '扶贫成效',
      icon: 'star'
    },
    children: [
      {
        path: 'support-effect1',
        component: () => import('@/views/support-effect/index'),
        name: 'support-effect1',
        meta: {
          title: '扶贫成效'
        }
      }
    ]
  },

  {
    path: '/party-platform',
    component: Layout,
    redirect: '/party-platform/party-organization',
    alwaysShow: true,
    name: 'party-platform',
    meta: {
      title: '党建工作',
      icon: 'star'
    },
    children: [
      {
        path: 'party-organization',
        component: () => import('@/views/party-platform/party-organization'),
        name: 'party-organization',
        meta: {
          title: '党组织机构',
          icon: 'star'

        }
      },
      {
        path: 'party-information',
        component: () => import('@/views/party-platform/party-information'),
        name: 'party-information',
        meta: {
          title: '党建信息',
          icon: 'star'

        }
      },
      {
        path: 'party-members-information',
        component: () => import('@/views/party-platform/party-members-information'),
        name: 'party-members-information',
        meta: {
          title: '党员信息管理',
          icon: 'star'

        }
      }
    ]
  },


  {
    path: '/prevent-poverty',
    component: Layout,
    redirect: '/prevent-poverty/cadre-declare',
    alwaysShow: true, // will always show the root menu
    name: 'prevent-poverty',
    meta: {
      title: '防返贫',
      icon: 'clipboard'

    },
    children: [
      {
        path: 'cadre-declare',
        component: () => import('@/views/prevent-poverty/cadre-declare'),
        name: 'cadre-declare',
        meta: {
          title: '干部申报',
          icon: 'clipboard'
        }
      },
      {
        path: 'basic-file',
        component: () => import('@/views/prevent-poverty/basic-file'),
        name: 'basic-file',
        meta: {
          title: '防贫对象',
          icon: 'clipboard'
        }
      },
      {
        path: 'monitoring-standard',
        component: () => import('@/views/prevent-poverty/monitoring-standard'),
        name: 'monitoring-standard',
        meta: {
          title: '监测标准',
          icon: 'clipboard'
        }
      }
    ]
  },

  {
    path: '/rural-revitalization',
    component: Layout,
    redirect: '/rural-revitalization/rural-information',
    alwaysShow: true, // will always show the root menu
    name: 'rural-revitalization',
    meta: {
      title: '乡村振兴',
      icon: 'clipboard',

    },
    children: [
      {
        path: 'rural-information',
        component: () => import('@/views/rural-revitalization/rural-information'),
        name: 'rural-information',
        meta: {
          title: '乡村信息',
          icon: 'clipboard'
        }
      },
      {
        path: 'rural-information-detail',
        component: () => import('@/views/rural-revitalization/rural-information-detail/index.vue'),
        name: 'rural-information-detail',
        hidden: true,
        meta: {
          title: '乡村信息详情',
          icon: 'clipboard'
        }
      }

    ]
  },
  {
    path: '/unit-information',
    component: Layout,
    redirect: '/unit-information/unit-information',
    alwaysShow: true, // will always show the root menu
    name: 'unit-information',
    meta: {
      title: '单位信息',
      icon: 'clipboard'

    },
    children: [
      {
        path: 'unit-information',
        component: () => import('@/views/unit-information/unit-information'),
        name: 'unit-information1',
        meta: {
          title: '单位信息',
          icon: 'clipboard'
        }
      }
    ]
  },

  {
    path: '/country-detail',
    component: () => import('@/views/country-detail/index'),
    name: 'country-detail'
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'mergeHeader' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'pdf', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'clipboardDemo', icon: 'clipboard' }
      }
    ]
  },

  {
    path: '/i18n',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n-demo/index'),
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
