import React from 'react';
import { Icon } from 'antd';
// import styles from './index.less';
import Exception from '../../components/lib/Exception';

const Error = () => (
  // <div className="content-inner">
  //   <div className={styles.error}>
  //     <Icon type="frown-o" />
  //     <h1>404 Not Found</h1>
  //   </div>
  // </div>
  <Exception type="404" />
);

export default Error;
