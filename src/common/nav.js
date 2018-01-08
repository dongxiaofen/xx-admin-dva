import dynamic from 'dva/dynamic';

const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

export const navigation = app => ({
  user: {
    name: '登陆',
    path: '/login',
    exact: true,
    component: dynamicWrapper(app, ['login'], () => import('../routes/Login')),
  },
  basic: {
    name: '首页',
    path: '/',
    exact: false,
    component: dynamicWrapper(app, [], () => import('../routes/App')),
    children: [
      {
        name: '客户中心',
        path: 'clientCenter',
        icon: 'user',
        isOpen: true, // 默认展开的导航
        children: [
          {
            name: ' 客户列表', // 没有该字段，左侧导航不展示
            path: 'clientList',
            selected: true, // 默认选中的导航
            component: dynamicWrapper(app, ['clientList'], () => import('../routes/ClientList')),
          },
          {
            name: ' 客户权限组设置',
            path: 'clientRole',
            component: dynamicWrapper(app, [], () => import('../routes/ClientList')),
          },
          {
            // name: ' 创建客户',
            path: 'clientCreate',
            component: dynamicWrapper(app, ['clientCreate'], () => import('../routes/ClientCreate')),
          },
        ],
      }, {
        name: '管理员中心',
        path: 'adminCenter',
        icon: 'team',
        children: [
          {
            name: ' 管理员列表',
            path: 'adminList',
            component: dynamicWrapper(app, [], () => import('../routes/ClientList')),
          },
          {
            name: ' 管理员权限组设置',
            path: 'adminRole',
            component: dynamicWrapper(app, [], () => import('../routes/ClientList')),
          },
          {
            name: ' 管理员操作记录',
            path: 'adminOperate',
            component: dynamicWrapper(app, [], () => import('../routes/ClientList')),
          },
        ],
      }, {
        name: '发票中心',
        path: 'invoiceCenter',
        icon: 'solution',
        children: [
          {
            name: '发票列表',
            path: 'invoiceList',
            component: dynamicWrapper(app, [], () => import('../routes/ClientList')),
          }
        ],
      }, {
        name: '系统设置',
        path: 'systemCenter',
        icon: 'tool',
        children: [
          {
            name: '模块配置',
            path: 'systemConfig',
            component: dynamicWrapper(app, [], () => import('../routes/ClientList')),
          }
        ],
      }, {
        name: '统计中心',
        path: 'statisticsCenter',
        icon: 'pie-chart',
        children: [
          {
            name: ' PV实时统计',
            path: 'PVstatistics',
            component: dynamicWrapper(app, [], () => import('../routes/ClientList')),
          },
          {
            name: '页面访问',
            path: 'pageView',
            component: dynamicWrapper(app, [], () => import('../routes/ClientList')),
          },
          {
            name: ' 用户访问统计',
            path: 'clientView',
            component: dynamicWrapper(app, [], () => import('../routes/ClientList')),
          },
        ],
      }, {
        name: '个人中心',
        path: 'personCenter',
        icon: 'contacts',
        children: [
          {
            name: '修改密码',
            path: 'changePwd',
            component: dynamicWrapper(app, [], () => import('../routes/ClientList')),
          },
        ],
      // },{
      //   name: '登陆',
      //   path: 'login',
      //   component: dynamicWrapper(app, ['login'], () => import('../routes/Login')),
      // }, {
        // name: 'error',
        // path: '',
        // component: dynamicWrapper(app, [], () => import('../routes/Error')),
      }
    ]
  },
  // error: {
  //   path: '',
  //   component: dynamicWrapper(app, [], () => import('../routes/Error')),
  // }
});

// export const navigation = app => {}
