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
    return pointList.map(({label, name}) => (
      <Col md={4} sm={12}>
        ConsumeInfo
      </Col>
    ));
  };
  const feesetList = [
    {label: '企业反欺诈剩余数量', name: 'riskScanNum'},
    {label: '企业关联图剩余数量', name: 'networkNum'},
    {label: '企业监控预警剩余数量', name: 'monitorNum'},
    {label: '企业经营指标剩余数量', name: 'taxNum'},
    {label: '企业经营指标核查剩余数量', name: 'taxCheckNum'},
    {label: '个人背调剩余数量', name: 'investigationNum'},
    {label: '信息报告剩余数量', name: 'reportNum'},
    {label: '身份验证剩余数量', name: 'idCheckNum'},
    {label: '老赖核查剩余数量', name: 'personCheckNum'}
  ];

  const createFeesetList = () => {};
  return (<Row gutter={{ md: 8, lg: 18, xl: 36 }} className={styles.consume}>
    <Col md={8} sm={24}>
      ConsumeInfo
    </Col>
  </Row>)
};

ConsumeInfo.propTypes = {
  clientData: PropTypes.object,
};

export default ConsumeInfo;
