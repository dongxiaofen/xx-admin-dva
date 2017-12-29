import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { pageRight } from '../../components/hoc';
// import { withRouter } from 'dva/router';
// import styles from './index.less';

class ClientList extends Component {
  static propTypes = {
    // children: PropTypes.element.isRequired,
    // location: PropTypes.object,
    dispatch: PropTypes.func,
    // app: PropTypes.object,
    // loading: PropTypes.object,
  }
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {

  }
  render() {
    // console.log(this.props, 'props');
    return (
      <div>
        clientlist
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
    clientlist: state.clientlist
  }))(ClientList)
);
