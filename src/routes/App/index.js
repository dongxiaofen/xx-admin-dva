import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'dva/router';
import { connect } from 'dva';
import pathval from 'pathval';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
// import { withRouter } from 'dva/router';

import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;
import HeaderCont from '../../components/common/Header';
import SideNav from '../../components/common/SideNav';
import Error from '../Error';
import ClientList from '../ClientList';
import styles from './index.less';

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

class App extends Component {
  static propTypes = {
    // children: PropTypes.element.isRequired,
    navData: PropTypes.object,
    dispatch: PropTypes.func,
    global: PropTypes.object,
    // loading: PropTypes.object,
  }
  componentDidMount() {
    this.props.dispatch({type: 'global/getUserInfo'});
  }
  componentWillUnmount() {
    this.props.dispatch({type: 'global/clearGlobal'});
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
    basicNavData.map(({ path, children }) => {
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
      <ContainerQuery query={query}>
        {
          params => (
            <div className={classNames(params)}>
              <Layout style={{ minHeight: '100vh' }}>
                <Header className={styles.header}>
                  <HeaderCont />
                </Header>
                <Layout>
                  <Sider
                    collapsible
                    collapsed={pathval.getPathValue(this.props.global, 'collapsed')}
                    onCollapse={this.onCollapse}
                    breakpoint="md"
                    width={200}>
                    <SideNav navData={this.props.navData}/>
                  </Sider>
                  <Content style={{margin: '25px 25px 0'}}>
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
          )
        }
      </ContainerQuery>
    );
  }
}
function mapStateToProps(state) {
  return {
    global: state.global,
  };
}

export default connect(mapStateToProps)(App);
