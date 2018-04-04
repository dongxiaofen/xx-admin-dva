import { getRoleType } from '../services/clientList';
// import { industry } from '../helpers/industry';
import { provinceCity } from '../helpers/provinceCity';

export default {
  namespace: 'clientCreate',
  state: {
    roleType: [],
    industryOptions: ['担保', '银行', '小贷', '协会', '企业', '资本', '其他'],
    provinceOptions: Object.keys(provinceCity),
    // provinceCityMap: provinceCity,
    provinceCityOption: [],

    email: '',
    password: '',
    rePassword: '',
    companyName: '',
    industry: '',
    clientManager: '',
    province: '',
    city: '',
    address: '',
    consumeType: '',
    role: '',
    contact: '',
    contactEmail: '',
    contactPosition: '',
    department: '',
    phone: '',
    expireDt: '',
    accountType: '',
  },
  reducers: {
    updateRoleType(state, { payload }) {
      return {
        ...state,
        roleType: payload
      };
    }
  },
  effects: {
    * getRoleType(_, { call, put }) {
      const response = yield call(getRoleType);
      if (response && response.success) {
        yield put({
          type: 'updateRoleType',
          payload: response.data,
        });
      }
    },
  }
};
