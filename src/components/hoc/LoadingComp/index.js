import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

function hoc({ mapDataToProps }) {
  return (WrappedComponent) => {
    function LoadingComp(props) {
      const { loading, error } = mapDataToProps(props);
      let output;
      if (loading) {
        output = (
          <div className={styles.loading}>
            <Spin />
          </div>
        );
      } else if (error) {
        output = (
          <div>错误了，　暂无数据</div>
        );
      } else {
        output = <WrappedComponent {...props} />;
      }
      return output;
    }
    return LoadingComp;
  };
}

export default hoc;
