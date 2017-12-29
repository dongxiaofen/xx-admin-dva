import { getClientList } from '../services/clientList';
import axios from 'axios';
export default {
  namespace: 'clientList',
  state: {
    list: {},
    index: 1,
    size: 10,
    listCanacel: null,
    isLoading: true,
    roleType: [],
    filter: {
      searchKey: '',
      roleType: '',
      accountType: '',
      consumeType: '',
      sort: 'createdTs,desc',
    },
    showChargeModal: false,
    // rechargeType: '',
  },
  reducers: {
    updateClientList(state, payload) {
      return {...state, ...payload};
    }
  },
  effects: {
    * getClientList(_, { call, put, select }) {
      const listCanacel = yield select(state => state.listCanacel);
      if (listCanacel) {
        listCanacel();
        yield put({
          type: 'updateClientList',
          payload: { listCanacel: null },
        });
      }
      yield put({
        type: 'updateClientList',
        payload: { isLoading: true },
      });
      const filter = yield select(state => ({
        index: state.index,
        size: state.size,
        ...state.filter
      }));
      const source = axios.CancelToken.source();
      yield put({
        type: 'updateClientList',
        payload: { listCanacel: source.cancel },
      });
      const response = yield call(getClientList, {params: filter, CancelToken: source.token});
      if (response && response.success) {
        yield put({
          type: 'updateClientList',
          payload: {list: response.data},
        });
      } else {
        yield put({
          type: 'updateClientList',
          payload: {list: {error: '暂未获取到列表'}},
        });
      }
    }
  },
};
