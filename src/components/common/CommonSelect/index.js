import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const Option = Select.Option;

const CommonSelect = ({ defaultValue = '', width = '100%', handleChange, options }) => (
  <Select defaultValue={defaultValue} style={{ width }} onChange={handleChange}>
    {
        options.map(({ label, field }) => (<Option key={field} value={field}>{ label }</Option>))
      }
  </Select>
  );

CommonSelect.propTypes = {
  defaultValue: PropTypes.string,
  width: PropTypes.string,
  handleChange: PropTypes.func,
  options: PropTypes.array,
};

export default CommonSelect;
