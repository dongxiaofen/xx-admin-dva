import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';

import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;
import HeaderCont from '../../components/common/Header';
import SideNav from '../../components/common/SideNav';

import styles from './index.less';

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
  onCollapse = () => {
    this.props.dispatch({
      type: 'global/collapsed',
      payload: !this.props.global.collapsed,
    });
  }
  render() {
    // console.log(this.props.global, 'this.props.global');
    const pathname = this.props.location.pathname;
    return (
      <div>
        {
          pathname === '/login' ? this.props.children :
          <div>
            <Layout style={{ minHeight: '100vh' }}>
              <Header className={styles.header}>
                <HeaderCont />
              </Header>
              <Layout>
                <Sider
                  collapsible
                  collapsed={this.props.global.collapsed}
                  onCollapse={this.onCollapse}>
                  <SideNav />
                </Sider>
                <Content>{this.props.children}</Content>
              </Layout>
            </Layout>
          </div>
        }
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {global: state.global};
}

export default withRouter(connect(mapStateToProps)(App));
