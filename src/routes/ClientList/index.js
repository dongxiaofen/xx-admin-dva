import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { pageRight } from '../../components/hoc';
import CreateClient from '../../components/clientList/create';
import Filters from '../../components/clientList/filter';
import List from '../../components/clientList/list';
// import { withRouter } from 'dva/router';
// import styles from './index.less';

class ClientList extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    ClientList: PropTypes.object,
  }
  componentDidMount() {
    this.props.dispatch({ type: 'clientList/getClientList' });
    this.props.dispatch({ type: 'clientList/getRoleType' });
  }
  render() {
    const hocData = {
      loading: this.props.clientList.isListLoading,
      error: this.props.clientList.list.content === undefined || this.props.clientList.list.error,
    };
    return (
      <div>
        <CreateClient />
        <Filters />
        <List hocData={hocData} />
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
