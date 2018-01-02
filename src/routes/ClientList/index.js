import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { pageRight } from '../../components/hoc';
import CreateClient from '../../components/clientList/create';
import Filters from '../../components/clientList/filter';
// import { withRouter } from 'dva/router';
// import styles from './index.less';

class ClientList extends Component {
  static propTypes = {
    // location: PropTypes.object,
    dispatch: PropTypes.func,
    // app: PropTypes.object,
    // loading: PropTypes.object,
  }
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    this.props.dispatch({ type: 'clientList/getClientList' });
    this.props.dispatch({ type: 'clientList/getRoleType' });
  }
  render() {
    return (
      <div>
        <CreateClient />
        <Filters />
      </div>
    );
  }
}

export default pageRight({
  mapDataToProps: () => ({
    mapRights: ['CUSTOMER_MANAGE', 'GET_CUSTOMERS'],
    mapType: true,
  })
})(
  connect(state => ({
    clientList: state.clientList
  }))(ClientList)
);
