import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'dva/router';
import { connect } from 'dva';
// import { withRouter } from 'dva/router';

import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;
import HeaderCont from '../../components/common/Header';
import SideNav from '../../components/common/SideNav';
import Error from '../Error';
import ClientList from '../ClientList';

import styles from './index.less';

class App extends Component {
  static propTypes = {
    // children: PropTypes.element.isRequired,
    // location: PropTypes.object,
    dispatch: PropTypes.func,
    global: PropTypes.object,
    // loading: PropTypes.object,
  }
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    this.props.dispatch({type: 'global/getUserInfo'});
  }
  onCollapse = () => {
    this.props.dispatch({
      type: 'global/collapsed',
      payload: !this.props.global.collapsed,
    });
  }
  getBasicRouter = () => {
    const basicNavData = this.props.navData.basic.children;
    const routes = [];
    basicNavData.map(({ name, path, children }) => {
      children.map((item) => {
        routes.push(
          <Route
            exact
            key={`/${path}/${item.path}`}
            path={`/${path}/${item.path}`}
            component={item.component}
            />
        );
      });
    });
    return routes;
  }
  render() {
    return (
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
              <SideNav navData={this.props.navData}/>
            </Sider>
            <Content>
              <Switch>
                <Redirect exact from='/' to='/clientCenter/clientList'/>
                {
                  this.getBasicRouter()
                }
                <Route component={Error} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    global: state.global,
  };
}

export default connect(mapStateToProps)(App);
