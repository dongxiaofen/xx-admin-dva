import { getUserInfo, logout } from '../services/global';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'global',
  state: {
    userInfo: {},
    collapsed: false, // 左侧导航展开
    // navigation: [
    //   {
    //     name: '客户中心',
    //     path: 'clientCenter',
    //     icon: 'user',
    //     children: [
    //       {name: ' 客户列表', path: 'clientList'},
    //       {name: ' 客户权限组设置', path: 'clientRole'},
    //     ],
    //   }, {
    //     name: '管理员中心',
    //     path: 'adminCenter',
    //     icon: 'team',
    //     children: [
    //       {name: ' 管理员列表', path: 'adminList'},
    //       {name: ' 管理员权限组设置', path: 'adminRole'},
    //       {name: ' 管理员操作记录', path: 'adminOperate'},
    //     ],
    //   }, {
    //     name: '发票中心',
    //     path: 'invoiceCenter',
    //     icon: 'solution',
    //     children: [
    //       {name: '发票列表', path: 'invoiceList'}
    //     ],
    //   }, {
    //     name: '系统设置',
    //     path: 'systemCenter',
    //     icon: 'tool',
    //     children: [
    //       {name: '模块配置', path: 'systemConfig'}
    //     ],
    //   }, {
    //     name: '统计中心',
    //     path: 'statisticsCenter',
    //     icon: 'pie-chart',
    //     children: [
    //       {name: ' PV实时统计', path: 'PVstatistics'},
    //       {name: '页面访问', path: 'pageView'},
    //       {name: ' 用户访问统计', path: 'clientView'},
    //     ],
    //   }, {
    //     name: '个人中心',
    //     path: 'personCenter',
    //     icon: 'contacts',
    //     children: [
    //       {name: '修改密码', path: 'changePwd'},
    //     ],
    //   }
    // ],
  },
  reducers: {
    updateGlobal(state, {payload}) {
      return {
        ...state,
        userInfo: payload
      };
    },
    collapsed(state, {payload}) {
      return {...state, collapsed: payload};
    },
    clearGlobal() {
      return {
        userInfo: {},
        collapsed: false,
      };
    }
  },
  effects: {
    * getUserInfo(_, {call, put}) {
      const response = yield call(getUserInfo);
      yield put({
        type: 'updateGlobal',
        payload: response.data,
      });
    },
    * logout(_, {call, put}) {
      const response = yield call(logout);
      // console.log(response, 'response---------===========');
      yield put({
        type: 'updateGlobal',
        payload: {},
      });
      yield put(routerRedux.push('/login'));
    }
  },
  subscriptions: {
    // setupHistory ({ dispatch, history }) {
    //   history.listen((location) => {
    //     if (location.pathname === '/login') {
    //       // console.log(state, 'state-------subscr');
    //       dispatch({
    //         type: 'getUserInfo',
    //       });
    //     }
    //   })
    // },
  },
};
