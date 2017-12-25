import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import { withRouter } from 'dva/router';

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import styles from './index.less';

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
    const pathname = this.props.location.pathname;
    if (pathname !== '/login') {
      // console.log('获取登录信息');
      this.props.dispatch({type: 'global/getUserInfo'});
    }
  }
  render() {
    const pathname = this.props.location.pathname;
    return (
      <div>
        {
          pathname === '/login' ? this.props.children :
          <div>
            <Layout>
              <Header className={styles.header}>
                <span className={styles.logo}>星象后台管理系统</span>
              </Header>
              <Layout>
                <Sider width="200" style={{height: '100%'}}>Sider</Sider>
                <Content>{this.props.children}</Content>
              </Layout>
            </Layout>
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
  return {global: state.global};
}

export default withRouter(connect(mapStateToProps)(App));
