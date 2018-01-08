import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { pageRight } from '../../components/hoc';

class ClientCreate extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    // ClientList: PropTypes.object,
  }
  componentDidMount() {
    this.props.dispatch({type: 'clientCreate/getRoleType'});
  }
  render() {
    return (
      <div>ClientCreate</div>
    );
  }
}

export default pageRight({
  mapDataToProps: () => ({
    mapRights: ['CUSTOMER_MANAGE', 'GET_CUSTOMERS'],
    mapType: true,
  })
})(
  connect()(ClientCreate)
);
