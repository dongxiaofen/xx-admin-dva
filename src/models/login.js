import { login } from '../services/login';
import { routerRedux } from 'dva/router';
import { notification } from 'antd';

export default {
  namespace: 'login',
  state: {
    userInfo: {},
    email: '',
    password: '',
    loading: false,
    // loginErr: '',
  },
  reducers: {
    updateLogin (state, {payload}) {
      return {...state, ...payload};
    },
    updateInfo (state, { payload }) {
      return {
        ...state,
        userInfo: payload
      };
    }
  },
  effects: {
    * login ({payload}, {call, put}) {
      const response = yield call(login, payload);
      if (response && response.success) {
        yield put({
          type: 'updateInfo',
          payload: response.data,
        });
        yield put({
          type: 'updateLogin',
          payload: {loading: false},
        });
        yield put({
          type: 'global/updateGlobal',
          payload: response.data,
        });
        const jumpUrl = localStorage.getItem('sessionOutUrl') === null ? '/' : localStorage.getItem('sessionOutUrl');
        yield put(routerRedux.push(jumpUrl));
        localStorage.removeItem('sessionOutUrl');
        notification.success({
          message: '登录成功',
          description: '亲爱的' + response.data.email + ', 欢迎回来.',
        });
      }
    }
  },
  // subscriptions: {
  //
  // },
};
