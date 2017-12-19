import { login } from '../services/login';
import { routerRedux } from 'dva/router';
// import globalState from './global';
// import * as loginApi from 'services/login';
// import * as api from 'services/example';
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
        yield put(routerRedux.push('/'));
      }
    }
  },
  subscriptions: {
    // setupHistory ({ dispatch, history }) {
    //   history.listen((location) => {
    //     if (location.pathname === '/login') {
    //       dispatch({
    //         type: 'login',
    //         payload: {
    //           email: 'admin@socialcredits.cn',
    //           password: '25f9e794323b453885f5181f1b624d0'
    //         }
    //       });
    //     }
    //   })
    // },
  },
};
