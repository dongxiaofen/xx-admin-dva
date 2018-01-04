import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Select, InputNumber } from 'antd';
const Option = Select.Option;
import styles from './index.less';

class Feeset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeset: {}
    };
  }
  componentWillMount() {
    // console.log(this.props.clientList.recharge.feeset);
    const originData = this.props.clientList.recharge.feeset;
    const feeset = {};
    Object.keys(originData).map((key) => {
      feeset[key] = 'add';
    });
    this.setState({
      feeset: feeset
    });
  }
  render() {
    return (
      <div>Feeset</div>
    );
  }
}

Feeset.propTypes = {
  dispatch: PropTypes.func,
  clientList: PropTypes.object
};

export default connect(state => ({clientList: state.clientList}))(Feeset);
