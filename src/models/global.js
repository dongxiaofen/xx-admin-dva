
import { getUserInfo } from '../services/global';
export default {
  namespace: 'global',
  state: {
    userInfo: {},
  },
  reducers: {
    updateGlobal (state, {payload}) {
      return {
        ...state,
        userInfo: payload
      };
    },
  },
  effects: {
    * getUserInfo (_, {call, put}) {
      const response = yield call(getUserInfo);
      yield put({
        type: 'updateGlobal',
        payload: response.data,
      });
    }
  },
  // subscriptions: {},
};
