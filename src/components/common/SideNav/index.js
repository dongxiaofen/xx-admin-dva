import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter, Link } from 'dva/router';
// import { Link } from 'dva/router';
// import pathval from 'pathval';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

const SideNav = ({ navData, location }) => {
  const getSideNav = (sideNavData, parentPath = '') => {
    return sideNavData.map((item) => {
      if (!item.name) {
        return null;
      }
      const itemPath = parentPath ? `/${parentPath}/${item.path}` : `/${item.path}`;

      if (item.children) {
        return (<SubMenu key={item.path} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
          {
            getSideNav(item.children, item.path)
          }
        </SubMenu>);
      }
      return (
        <Menu.Item key={item.path}>
          <Link
            to={itemPath}
            replace={itemPath === location.pathname}
          >
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      );
    });
  };
  const getOpenedKey = (data) => {
    const pathname = location.pathname.split('/')[1];
    // console.log(pathname, 'pathname');
    let openedKey = '';
    const idx = data.findIndex(({ isOpen }) => isOpen);
    if (data.findIndex(({ path }) => pathname === path) !== -1) {
      openedKey = pathname;
    } else if (idx !== -1) {
      openedKey = data[idx].path;
    }
    return openedKey;
  };
  const getSelectedKey = (data) => {
    let selectedKey = '';
    const openedKey = getOpenedKey(data);
    const pIdx = data.findIndex(({path}) => path === openedKey);
    const idx = data[pIdx].children.findIndex(({selected}) => selected);
    const pathname = location.pathname.split('/')[2];
    if (data[pIdx].children.findIndex(({path}) => path === pathname) !== -1) {
      selectedKey = pathname;
    } else if (idx !== -1) {
      selectedKey = data[pIdx].children[idx].path;
    }
    return selectedKey;
  };

  return (
    <Menu
      defaultSelectedKeys={[getSelectedKey(navData.basic.children)]}
      defaultOpenKeys={[getOpenedKey(navData.basic.children)]}
      mode="inline"
      theme="dark" >
      {getSideNav(navData.basic.children)}
      {/*{
        navData.basic.children.map((item) => (
          <SubMenu key={item.path} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
            {
              item.children.map((child) => (<Menu.Item key={child.path}>{ child.name }</Menu.Item>))
            }
          </SubMenu>
        ))
      }*/}
   </Menu>
  );
};

SideNav.propTypes = {
  navData: PropTypes.object,
  // dispatch: PropTypes.func,
  location: PropTypes.object,
};

export default withRouter(connect((state) => ({globalStore: state.global}))(SideNav));
