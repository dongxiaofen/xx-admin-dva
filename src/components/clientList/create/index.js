import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button } from 'antd';

const CreateClient = ({ dispatch }) => {
  const create = () => {
    dispatch(routerRedux.push('/clientCenter/clientCreate'));
  };
  return (<Button type="primary" onClick={create}>添加客户</Button>);
};

CreateClient.propTypes = {
  dispatch: PropTypes.func,
};

export default connect(state => ({
  // globalStore: state.global,
  clientList: state.clientList,
}))(CreateClient);
