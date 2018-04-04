import { getUserInfo, logout } from '../services/global';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'global',
  state: {
    userInfo: {},
    collapsed: false, // 左侧导航展开
  },
  reducers: {
    updateGlobal(state, { payload }) {
      return {
        ...state,
        userInfo: payload
      };
    },
    collapsed(state, { payload }) {
      return { ...state, collapsed: payload };
    },
    clearGlobal() {
      return {
        userInfo: {},
        collapsed: false,
      };
    }
  },
  effects: {
    * getUserInfo(_, { call, put }) {
      const response = yield call(getUserInfo);
      if (response.success) {
        yield put({
          type: 'updateGlobal',
          payload: response.data,
        });
      }
    },
    * logout(_, { call, put }) {
      yield call(logout);
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
