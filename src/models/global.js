
export default {
  namespace: 'global',
  state: {
    userInfo: {},
  },
  reducers: {
    updateGlobal (state, {payload}) {
      console.log(payload, 'global-----------');
      return {
        ...state,
        userInfo: payload
      };
    },
  },
  effects: {},
  subscriptions: {},
};
