import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

const SideNav = ({dispatch, globalStore}) => {
  console.log(globalStore, 'globalStore---====');
  return (
    <Menu
         defaultSelectedKeys={['6']}
         defaultOpenKeys={['sub1']}
         mode="inline"
         theme="dark"
       >
       <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
   </Menu>
  );
};

SideNav.propTypes = {
  globalStore: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect((state) => ({globalStore: state.global}))(SideNav);
