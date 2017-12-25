import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'dva';
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
  constructor(props) {
    super(props);
  }
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

function mapStateToProps(state) {
  console.log(state, 'state');
  return state;
}

export default connect(mapStateToProps)(ClientList);
// export default withRouter(connect(mapStateToProps)(ClientList));
