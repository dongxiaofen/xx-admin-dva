import React from 'react';
import { Row, Col } from 'antd';
import FormFilter from './formFilter';
import SearchFilter from './searchFilter';
import SortFilter from './sortFilter';
import styles from './index.less';

const Filters = () => (
  <div className={styles.filters}>
    <FormFilter />
    <Row gutter={{ md: 12, lg: 24, xl: 48 }} className={styles.distance}>
      <Col md={17} sm={24}>
        <SortFilter />
      </Col>
      <Col md={7} sm={24}>
        <SearchFilter />
      </Col>
    </Row>
  </div>
  );

Filters.propTypes = {
};

export default Filters;
