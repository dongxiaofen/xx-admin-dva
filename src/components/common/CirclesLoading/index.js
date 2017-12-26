import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

function CirclesLoading({ height = '400px' }) {
  return (
    <div className={styles.loaderTable} style={{ height: height }}>
      <div className={styles.loaderTableCell}>
        <section className={styles.loader}>
          <span className={`${styles.loader} ${styles.loaderCircles}`}></span>
        </section>
      </div>
    </div>
  );
}
CirclesLoading.propTypes = {
  height: PropTypes.string,
};

export default CirclesLoading;
