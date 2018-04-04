import { getClientList, getRoleType, rechargePoint, rechargeFeeset } from '../services/clientList';
import axios from 'axios';
import { message } from 'antd';
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
    // showChargeModal: false,
    // rechargeType: '',
    recharge: {
      originData: null,
      point: {
        availableUserNum: 0,
        point: 0,
      },
      feeset: {
        availableUserNum: 0,
        idCheckNum: 0,
        investigationNum: 0,
        monitorNum: 0,
        networkNum: 0,
        personCheckNum: 0,
        reportNum: 0,
        riskScanNum: 0,
        taxCheckNum: 0,
        taxNum: 0,
      },
    },
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
        sortData: state.sortData.map(({ label, field, sort }, index) => {
          if (index === payload) {
            return { label, field, sort: sort === 'desc' ? 'asc' : 'desc' };
          }
          return { label, field, sort };
        })
      };
    },
    saveRechargeOrigin(state, { payload }) {
      return {
        ...state,
        recharge: {
          ...state.recharge,
          originData: payload,
        }
      };
    },
    savePoint(state, { payload }) {
      return {
        ...state,
        recharge: {
          ...state.recharge,
          point: {
            ...state.recharge.point,
            ...payload
          }
        },
      };
    },
    saveFeeset(state, { payload }) {
      return {
        ...state,
        recharge: {
          ...state.recharge,
          feeset: {
            ...state.recharge.feeset,
            ...payload
          }
        },
      };
    },
    resetRecharge(state) {
      return {
        ...state,
        recharge: {
          originData: null,
          point: {
            availableUserNum: 0,
            point: 0,
          },
          feeset: {
            availableUserNum: 0,
            idCheckNum: 0,
            investigationNum: 0,
            monitorNum: 0,
            networkNum: 0,
            personCheckNum: 0,
            reportNum: 0,
            riskScanNum: 0,
            taxCheckNum: 0,
            taxNum: 0,
          }
        }
      };
    }
  },
  effects: {
    * getClientList(_, { call, put, select }) {
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
    },
    * rechargePoint(_, {call, select, put}) {
      const point = yield select(state => state.clientList.recharge.point);
      const userId = yield select(state => state.clientList.recharge.originData.userId);
      yield put({
        type: 'modal/loadingChang',
        payload: true
      });
      const response = yield call(rechargePoint, userId, point);
      if (response.success) {
        yield put({
          type: 'modal/resetModal'
        });
        message.success('充值成功');
      }
      yield put({
        type: 'modal/loadingChang',
        payload: false
      });
    },
    * rechargeFeeset(_, {call, select, put}) {
      const feeset = yield select(state => state.clientList.recharge.feeset);
      const userId = yield select(state => state.clientList.recharge.originData.userId);
      yield put({
        type: 'modal/loadingChang',
        payload: true
      });
      const response = yield call(rechargeFeeset, userId, feeset);
      if (response.success) {
        yield put({
          type: 'modal/resetModal'
        });
        message.success('充值成功');
        // console.log('success---');
      }
      yield put({
        type: 'modal/loadingChang',
        payload: false
      });
    }
  },
};
