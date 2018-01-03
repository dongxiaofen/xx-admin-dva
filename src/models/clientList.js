import { getClientList, getRoleType } from '../services/clientList';
import axios from 'axios';
// let listCanacel = null;
export default {
  namespace: 'clientList',
  state: {
    list: {},
    index: 1,
    size: 10,
    listCanacel: null,
    isListLoading: true,
    roleType: [],
    filter: {
      companyName: '',
      roleType: '',
      accountType: '',
      consumeType: '',
      sort: 'createdTs,desc',
    },
    sortData: [
      { label: '开户时间', field: 'createdTs', sort: 'desc' },
      { label: '账号有效时间', field: 'expireDt', sort: 'desc' },
      { label: '最近登陆日期', field: 'lastLoginTs', sort: 'desc' },
    ],
    showChargeModal: false,
    // rechargeType: '',
  },
  reducers: {
    updateClientList(state, { payload }) {
      return { ...state, ...payload };
    },
    changeFilter(state, { payload }) {
      return {
        ...state,
        filter: {
          ...state.filter,
          ...payload
        }
      };
    },
    changeSortData(state, { payload }) {
      return {
        ...state,
        sortData: state.sortData.map(({label, field, sort}, index) => {
          if (index === payload) {
            return { label, field, sort: sort === 'desc' ? 'asc' : 'desc' };
          } else {
            return { label, field, sort };
          }
        })
      };
    },
  },
  effects: {
    * getClientList(_, { call, put, select, fork, cancel }) {
      const listCanacel = yield select(state => state.clientList.listCanacel);
      if (listCanacel) {
        // console.log(listCanacel, 'listCanacel');
        listCanacel();
        // listCanacel = null;
        yield put({
          type: 'updateClientList',
          payload: { listCanacel: null },
        });
      }
      yield put({
        type: 'updateClientList',
        payload: { isListLoading: true },
      });
      const filter = yield select(state => ({
        index: state.clientList.index,
        size: state.clientList.size,
        ...state.clientList.filter
      }));
      const source = axios.CancelToken.source();
      yield put({
        type: 'updateClientList',
        payload: { listCanacel: source.cancel },
      });
      const response = yield call(getClientList, { params: filter, CancelToken: source.token });
      if (response && response.success) {
        yield put({
          type: 'updateClientList',
          payload: { isListLoading: false },
        });
        yield put({
          type: 'updateClientList',
          payload: { list: response.data },
        });
      } else {
        yield put({
          type: 'updateClientList',
          payload: { isListLoading: false },
        });
        yield put({
          type: 'updateClientList',
          payload: { list: { error: '暂未获取到列表' } },
        });
      }
    },
    * getRoleType(_, { call, put }) {
      const response = yield call(getRoleType);
      if (response && response.success) {
        yield put({
          type: 'updateClientList',
          payload: { roleType: response.data },
        });
      }
    }
  },
};
