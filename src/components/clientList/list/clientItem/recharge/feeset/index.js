import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
// import { Select, InputNumber } from 'antd';
// const Option = Select.Option;
import ContItem from '../contItem';
import styles from './index.less';

class Feeset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableUserNum: { value: 'add', label: '子帐号数量' },
      idCheckNum: { value: 'add', label: '身份验证' },
      investigationNum: { value: 'add', label: '个人背调' },
      monitorNum: { value: 'add', label: '企业监控预警' },
      networkNum: { value: 'add', label: '企业关联图' },
      personCheckNum: { value: 'add', label: '老赖核查' },
      reportNum: { value: 'add', label: '信息报告' },
      riskScanNum: { value: 'add', label: '企业反欺诈' },
      taxCheckNum: { value: 'add', label: '企业经营指标核查' },
      taxNum: { value: 'add', label: '企业经营指标' },
    };
  }
  handleChange = (data, value) => {
    const realVal = this.state[data].value === 'add' ? value : `-${value}`;
    this.props.dispatch({
      type: 'clientList/saveFeeset',
      payload: { [data]: parseInt(realVal) }
    });
  }
  handleSelect = (data, value) => {
    // console.log(value);
    const item = this.state[data];
    item.value = value;
    this.setState({
      [data]: item
    });
    if (this.props.clientList.recharge.feeset[data] !== 0) {
      this.props.dispatch({
        type: 'clientList/saveFeeset',
        payload: { [data]: parseInt(-this.props.clientList.recharge.feeset[data]) }
      });
    }
  }
  render() {
    // console.log(this.state, 'state');
    // console.log(this.props.clientList.recharge.feeset, 'feeset');
    return (
      <div>
        {
          Object.keys(this.state).map((item, pIdx) => (<ContItem data={this.state[item]} type={item} handleSelect={this.handleSelect} handleChange={this.handleChange} key={pIdx} labelWidth="120px" />))
        }
      </div>
    );
  }
}

Feeset.propTypes = {
  dispatch: PropTypes.func,
  clientList: PropTypes.object
};

export default connect(state => ({ clientList: state.clientList }))(Feeset);
