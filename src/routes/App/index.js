import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import { withRouter } from 'dva/router';
// import styles from './index.less';

// function App() {
//   return (
//     <div className={styles.normal}>
//       Route Component: App
//     </div>
//   );
// }
class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    app: PropTypes.object,
    loading: PropTypes.object,
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // const pathname = this.props.location.pathname;
    // if (pathname !== '/login') {
    //   console.log('获取登录信息');
    // }
  }
  render() {
    // console.log(this.props, 'props');
    const pathname = this.props.location.pathname;
    return (
      <div>
        {
          pathname === '/login' ? this.props.children :
          <div>
            <div>app</div>
            {this.props.children}
          </div>
        }
      </div>
    );
  }
}
// App.propTypes = {
//   children: PropTypes.element.isRequired,
//   location: PropTypes.object,
//   dispatch: PropTypes.func,
//   app: PropTypes.object,
//   loading: PropTypes.object,
// }
function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps)(App));
