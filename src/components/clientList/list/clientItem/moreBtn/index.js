import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Menu, Dropdown, Button } from 'antd';
import Recharge from '../recharge';
import styles from './index.less';

const MoreBtn = ({ dispatch, clientData }) => {
  const handleRecharge = () => {
    if(clientData.consumeType === 'POINT') {
      dispatch({type: 'clientList/rechargePoint'});
    } else {
      dispatch({type: 'clientList/rechargeFeeset'});
    }
  };
  const cancelRecharge = () => {
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
        <span className={styles.lists}>子账户列表</span>
      </Menu.Item>
      <Menu.Item>
        <span className={styles.lists} onClick={openRecharge}>套餐充值</span>
      </Menu.Item>
      <Menu.Item>
        <span className={styles.lists}>编辑详情</span>
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
};

MoreBtn.propTypes = {
  clientData: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect()(MoreBtn);
