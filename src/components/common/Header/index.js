import React from 'react';
import styles from './index.less';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import pathval from 'pathval';

const HeaderCont = ({ globalStore, dispatch }) => {
  const logout = () => {
    dispatch({type: 'global/logout'});
  };
  return (
    <div className="clearfix">
      <div className={styles.logo}>星象后台管理系统</div>
      <div className={styles.userInfo}>
        <span>{pathval.getPathValue(globalStore, 'userInfo.email')}</span>
        <a className={styles.logout} onClick={logout}>退出</a>
      </div>
    </div>
  );
};

HeaderCont.propTypes = {
  globalStore: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect((state) => ({globalStore: state.global}))(HeaderCont);
