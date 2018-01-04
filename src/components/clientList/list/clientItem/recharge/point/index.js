import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Select, InputNumber } from 'antd';
const Option = Select.Option;
import styles from './index.less';

class Point extends Component {
  constructor(props) {
    super(props);
    this.state = {
      point: { value: 'add', label: '点数' },
      availableUserNum: {value: 'add', label: '子账号数量'}
    };
  }
  // componentDidMount() {}
  handleChange = (data, value) => {
    const realVal = this.state[data].value === 'add' ? value : `-${value}`;
    this.props.dispatch({
      type: 'clientList/savePoint',
      payload: {[data]: parseInt(realVal)}
    });
  }
  handleSelect = (data, value) => {
    // console.log(value);
    const item = this.state[data];
    item.value = value;
    this.setState({
      [data]: item
    });
    if (this.props.clientList.recharge.point[data] !== 0) {
      this.props.dispatch({
        type: 'clientList/savePoint',
        payload: {[data]: parseInt(-this.props.clientList.recharge.point[data])}
      });
    }
  }
  createPoint = () => {
    const output = [];
    Object.keys(this.state).map((item, pIdx) => {
      output.push(
        <div key={pIdx} className={styles['point-item']}>
          <span className={styles['point-label']}>{ this.state[item].label }:</span>
          { this.createSelect(item) }
          <InputNumber className={styles.input} min={0} onChange={this.handleChange.bind(this, item)} />
        </div>
      );
    });
    return output;
  }
  createSelect = (type) => {
    return (
      <Select defaultValue={this.state[type].value} style={{ width: 100 }} onChange={this.handleSelect.bind(this, type)}>
        <Option key="add" value="add">增加</Option>
        <Option key="sub" value="sub">减少</Option>
       {/*{
         data.map(({label, value}, idx) => (<Option key={idx} value={value}>{ label }</Option>))
       }*/}
     </Select>
    );
  }
  render() {
    console.log(this.state, 'state');
    console.log(this.props.clientList.recharge.point, 'point');
    return (
      <div>
        {this.createPoint()}
      </div>
    );
  }
}

Point.propTypes = {
  dispatch: PropTypes.func,
  clientList: PropTypes.object
};

export default connect(state => ({clientList: state.clientList}))(Point);
