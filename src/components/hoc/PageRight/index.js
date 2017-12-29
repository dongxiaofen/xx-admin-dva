import React from 'react';
import { connect } from 'dva';
import Exception from '../../lib/Exception';

function hoc({mapDataToProps}) {
  return (WrappedComponent) => {
    function LoadingComp(props) {
      const { mapRights, mapType } = mapDataToProps(props);
      const globalStore = props.globalStore;
      const authInfo = globalStore.userInfo.authInfo;
      let visitRight = true;
      if (authInfo) {
        const hasRight = mapRights.map(item => {
          return authInfo[item];
        });
        if (mapType) {
          // 严格匹配
          if (hasRight.includes(false)) {
            visitRight = false;
          } else {
            visitRight = true;
          }
        } else {
          if (hasRight.includes(true)) {
            visitRight = true;
          } else {
            visitRight = false;
          }
        }
      }
      let output;
      if (!visitRight) {
        output = <Exception type="403" />
      } else {
        output = <WrappedComponent {...props}/>;
      }
      return output
    }
    return connect(state => ({
      globalStore: state.global
    }))(LoadingComp)
  }
}

export default hoc;
