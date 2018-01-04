import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Menu, Dropdown, Button } from 'antd';
import Recharge from '../recharge';
import styles from './index.less';

const MoreBtn = ({ dispatch, clientData }) => {
  // console.log(props, 'props');
  const handleRecharge = () => {
    console.log('handleRecharge');
  };
  const cancelRecharge = () => {
    // if (clientData.consumeType === 'POINT') {
    //   dispatch({
    //     type: 'clientList/savePoint',
    //     payload: {
    //       availableUserNum: 0,
    //       point: 0,
    //     },
    //   });
    // } else {
    //   dispatch({
    //     type: 'clientList/saveFeeset',
    //     payload: {
    //       availableUserNum: 0,
    //       idCheckNum: 0,
    //       investigationNum: 0,
    //       monitorNum: 0,
    //       networkNum: 0,
    //       personCheckNum: 0,
    //       reportNum: 0,
    //       riskScanNum: 0,
    //       taxCheckNum: 0,
    //       taxNum: 0,
    //     },
    //   });
    // }
    // dispatch({
    //   type: 'clientList/saveRechargeOrigin',
    //   payload: null
    // });
    dispatch({ type: 'clientList/resetRecharge' });
  };
  const openRecharge = () => {
    dispatch({
      type: 'clientList/saveRechargeOrigin',
      payload: clientData
    });
    dispatch({
      type: 'modal/openModal',
      payload: {
        visible: true,
        title: '账户充值',
        onOk: handleRecharge,
        onCancel: cancelRecharge,
        loader: (cb) => {
          cb(Recharge);
        }
      }
    });
  };
  const menu = (
    <Menu>
      <Menu.Item>
        子账户列表
      </Menu.Item>
      <Menu.Item>
        <span onClick={openRecharge}>套餐充值</span>
      </Menu.Item>
      <Menu.Item>
        编辑详情
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles['more-btn']}>
      <Dropdown overlay={menu} placement="bottomRight">
        <Button type="primary">操作</Button>
      </Dropdown>
    </div>
  );
}

MoreBtn.propTypes = {
  clientData: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect()(MoreBtn);
