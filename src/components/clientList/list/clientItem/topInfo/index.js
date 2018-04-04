import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import styles from './index.less';

const TopInfo = ({ clientData }) => {
  const dealData = (data) => {
    let info = clientData[data];
    switch (data) {
      case 'subUserCount':
        info = `已开 ${clientData.userCount ? clientData.userCount : 0} / 剩余 ${clientData.availableUserNum ? clientData.availableUserNum : 0}`;
        break;
      case 'consumeType':
        info = clientData.consumeType === 'POINT' ? '点数' : '套餐';
        break;
      default:
        info = clientData[data];
    }
    return info;
  };
  const topList = [
    { name: 'clientManager', label: '所属客户经理', md: 4 },
    { name: 'roleName', label: '权限', md: 3 },
    { name: 'accountType', label: '属性', md: 4 },
    { name: 'createdTs', label: '开户时间', md: 3 },
    { name: 'expireDt', label: '账号有效时间', md: 4 },
    { name: 'lastLoginTs', label: '下属账号最近登录日期', md: 6 },
    { name: 'subUserCount', label: '账户总数', handle: dealData, md: 4 },
    { name: 'consumeType', label: '计费方式', handle: dealData, md: 3 },
    { name: 'creator', label: '操作人', md: 4 },
    { name: 'status', label: '状态', handle: dealData, md: 3 }
  ];
  return (<Row gutter={{ md: 8, lg: 18, xl: 36 }} className={styles['item-row']}>
    <Col md={6} sm={12} className={styles['item-col']} key="email">
      <p className={styles.content}>{ clientData.companyName }</p>
      <p className={styles.title}>{ clientData.email }</p>
    </Col>
    {
      topList.map(({ name, label, md, handle }) => (
        <Col md={md} sm={12} className={styles['item-col']} key={name}>
          <p className={styles.title}>{ label }</p>
          <p className={styles.content}>{ handle ? handle(name) : clientData[name] }</p>
        </Col>
      ))
    }
  </Row>);
};

TopInfo.propTypes = {
  clientData: PropTypes.object,
};

export default TopInfo;
