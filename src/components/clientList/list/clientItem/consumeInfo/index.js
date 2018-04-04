import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import styles from './index.less';

const ConsumeInfo = ({ clientData }) => {
  const createPointList = () => {
    const pointList = [
      { label: '总剩余点数', name: 'point' },
      { label: '总消费点数', name: 'consumedPoints' }
    ];
    // const output = [];
    return pointList.map(({ label, name }) => (
      <Col md={4} sm={12} className={`${styles['consume-col']} ${styles.point}`}>
        <p className={styles.title}>{ label }</p>
        <p className={styles.content}>{ clientData[name] ? clientData[name] : 0 }</p>
      </Col>
    ));
  };

  const createFeesetList = () => {
    const feesetList = [
      { label: '企业反欺诈剩余数量', name: 'riskScanNum', md: 4 },
      { label: '企业关联图剩余数量', name: 'networkNum', md: 4 },
      { label: '企业监控预警剩余数量', name: 'monitorNum', md: 4 },
      { label: '企业经营指标剩余数量', name: 'taxNum', md: 4 },
      { label: '企业经营指标核查剩余数量', name: 'taxCheckNum', md: 4 },
      { label: '个人背调剩余数量', name: 'investigationNum', md: 4 },
      { label: '信息报告剩余数量', name: 'reportNum', md: 4 },
      { label: '身份验证剩余数量', name: 'idCheckNum', md: 4 },
      { label: '老赖核查剩余数量', name: 'personCheckNum', md: 4 }
    ];
    return feesetList.map(({ label, name, md }) => (
      <Col md={md} sm={12} className={`${styles['consume-col']} ${styles.feeset}`}>
        <p className={styles.title}>{ label }</p>
        <p className={styles.content}>{ clientData[name] ? clientData[name] : 0 }</p>
      </Col>
    ));
  };
  return (<Row gutter={{ md: 8, lg: 18, xl: 36 }} className={styles.consume}>
    {
      clientData.consumeType === 'POINT' ? createPointList() : createFeesetList()
    }
  </Row>);
};

ConsumeInfo.propTypes = {
  clientData: PropTypes.object,
};

export default ConsumeInfo;
