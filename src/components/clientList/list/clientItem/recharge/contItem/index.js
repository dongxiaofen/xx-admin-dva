import React from 'react';
import PropTypes from 'prop-types';
import { Select, InputNumber } from 'antd';
const Option = Select.Option;
import styles from './index.less';

const ContItem = ({ data, handleSelect, handleChange, type, labelWidth }) => {
  return (
    <div className={styles['point-item']}>
      <span className={styles['point-label']} style={{width: labelWidth}}>{ data.label }:</span>

      <Select defaultValue={data.value} style={{ width: 100 }} onChange={handleSelect.bind(null, type)}>
        <Option key="add" value="add">增加</Option>
        <Option key="sub" value="sub">减少</Option>
      </Select>

      <InputNumber className={styles.input} min={0} onChange={handleChange.bind(null, type)} />
    </div>
  );
};

ContItem.propTypes = {
  data: PropTypes.object,
  handleChange: PropTypes.func,
  handleSelect: PropTypes.func,
  type: PropTypes.string,
  labelWidth: PropTypes.string,
};

export default ContItem;
