import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Point from './point';
import Feeset from './feeset';

const Recharge = ({ clientList }) => {
  const consumeType = clientList.recharge.originData.consumeType;
  return (
    consumeType === 'POINT' ? <Point /> : <Feeset />
  );
};

Recharge.propTypes = {
  clientList: PropTypes.object,
};

export default connect(state => ({clientList: state.clientList}))(Recharge);
