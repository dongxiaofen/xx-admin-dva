import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Link } from 'dva/router';
import pathval from 'pathval';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

const SideNav = ({ globalStore, navData, location }) => {
  // console.log(location, 'location===');
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
      )
    });
  };
  const getOpenedKey = (data) => {
    const idx = data.findIndex(({isOpen}) => isOpen);
    return data[idx].path;
  };
  const getSelectedKey = (data) => {
    const pIdx = data.findIndex(({isOpen}) => isOpen);
    const idx = data[pIdx].children.findIndex(({selected}) => selected);
    return data[pIdx].children[idx].path;
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
  globalStore: PropTypes.object,
  dispatch: PropTypes.func,
};

export default withRouter(connect((state) => ({globalStore: state.global}))(SideNav));
