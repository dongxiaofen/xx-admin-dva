export default {
  namespace: 'modal',
  state: {
    visible: false,
    width: 520,
    title: '',
    cancelText: '取消',
    okText: '确定',
    footer: null,
    onCancel: null,
    onOk: null,
    onClose: null,
    loading: false,
    modalComp: null,
    contentText: '',
  },
  reducers: {
    handleOpen(state, { payload }) {
      return { ...state, ...payload };
    },
    loadingChang(state, { payload }) {
      return {
        ...state,
        loading: payload,
      }
    },
    resetModal() {
      return {
        visible: false,
        width: 520,
        title: '',
        cancelText: '取消',
        okText: '确定',
        footer: null,
        onCancel: null,
        onOk: null,
        onClose: null,
        loading: false,
        modalComp: null,
        contentText: '',
      };
    }
  },
  effects: {
    *openModal({ payload }, { put }) {
      const {
        visible,
        width,
        title,
        cancelText,
        okText,
        footer,
        onCancel,
        onOk,
        contentText,
        loader
      } = payload
      const data = {};
      if (visible) { data.visible = visible; }
      if (width) { data.width = width; }
      if (title) { data.title = title; }
      if (cancelText) { data.cancelText = cancelText; }
      if (okText) { data.okText = okText; }
      if (footer) { data.footer = footer; }
      if (onCancel) { data.onCancel = onCancel; }
      if (onOk) { data.onOk = onOk; }
      if (contentText) { data.contentText = contentText; }
      if (loader) {
        loader((comp) => {
          data.modalComp = comp;
        });
      }
      yield put({type: 'handleOpen', payload: data});
    },
  },
};
