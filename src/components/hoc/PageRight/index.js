import React from 'react';
import { connect } from 'dva';
import Exception from '../../lib/Exception';

function hoc({ mapDataToProps }) {
  return (WrappedComponent) => {
    function PageRight(props) {
      const { mapRights, mapType } = mapDataToProps(props);
      const { globalStore, ...leftProps } = props;
      const authInfo = globalStore.userInfo.authInfo;
      let visitRight = true;
      if (authInfo) {
        const hasRight = mapRights.map(item => authInfo[item]);
        if (mapType) {
          // 严格匹配
          if (hasRight.includes(false)) {
            visitRight = false;
          } else {
            visitRight = true;
          }
        } else if (hasRight.includes(true)) {
          visitRight = true;
        } else {
          visitRight = false;
        }
      }
      let output;
      if (!visitRight) {
        output = <Exception type="403" />;
      } else {
        output = <WrappedComponent {...leftProps} />;
      }
      return output;
    }
    return connect(state => ({
      globalStore: state.global
    }))(PageRight);
  };
}

export default hoc;
