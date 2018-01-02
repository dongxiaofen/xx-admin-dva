import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Input } from 'antd';

const Search = Input.Search;

const SearchFilter = ({ clientList, dispatch }) => {
  const handleSearch = (value) => {
    dispatch({ type: 'clientList/changeFilter', payload: { companyName: value } });
    dispatch({ type: 'clientList/getClientList' });
  };
  return (
    <Search
      defaultValue={clientList.filter.companyName}
      placeholder="请输入关键字"
      onSearch={handleSearch}
      enterButton
    />
  );
};

SearchFilter.propTypes = {
  clientList: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(state => ({ clientList: state.clientList }))(SearchFilter);
