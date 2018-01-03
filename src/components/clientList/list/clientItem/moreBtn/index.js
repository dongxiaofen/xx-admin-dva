import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button } from 'antd';
import styles from './index.less';

const MoreBtn = () => {
  const menu = (
    <Menu>
      <Menu.Item>
        子账户列表
      </Menu.Item>
      <Menu.Item>
        套餐充值
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
};

export default MoreBtn
