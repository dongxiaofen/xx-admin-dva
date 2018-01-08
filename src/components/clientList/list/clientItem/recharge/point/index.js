import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import ContItem from '../contItem';
import styles from './index.less';

class Point extends Component {
  constructor(props) {
    super(props);
    this.state = {
      point: { value: 'add', label: '点数' },
      availableUserNum: { value: 'add', label: '子账号数量' }
    };
  }
  // componentDidMount() {}
  handleChange = (data, value) => {
    const realVal = this.state[data].value === 'add' ? value : `-${value}`;
    this.props.dispatch({
      type: 'clientList/savePoint',
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
    if (this.props.clientList.recharge.point[data] !== 0) {
      this.props.dispatch({
        type: 'clientList/savePoint',
        payload: { [data]: parseInt(-this.props.clientList.recharge.point[data]) }
      });
    }
  }
  createPoint = () => {
    const output = [];
    Object.keys(this.state).map((item, pIdx) => {
      output.push(
        <ContItem data={this.state[item]} type={item} handleSelect={this.handleSelect} handleChange={this.handleChange} key={pIdx} labelWidth="80px" />
      );
    });
    return output;
  }

  render() {
    // console.log(this.state, 'state');
    // console.log(this.props.clientList.recharge.point, 'point');
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

export default connect(state => ({ clientList: state.clientList }))(Point);
