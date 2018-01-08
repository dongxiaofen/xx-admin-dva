import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Icon, Button } from 'antd';

const SortFilter = ({ clientList, dispatch }) => {
  const [sortField, sortType] = clientList.filter.sort.split(',');
  const sortData = clientList.sortData;
  const handleSort = (field, sort, idx) => {
    let filterData;
    // let type;
    if (field === sortField) {
      const type = sort === 'desc' ? 'asc' : 'desc';
      filterData = `${field},${type}`;
      dispatch({ type: 'clientList/changeSortData', payload: idx });
    } else {
      filterData = `${field},${sort}`;
    }
    dispatch({ type: 'clientList/changeFilter', payload: { sort: filterData } });
    dispatch({ type: 'clientList/getClientList' });
  };
  return (
    <div>
      {
        sortData.map(({ label, field, sort }, idx) => (
          <span key={idx} style={{ marginRight: idx === sortData.length - 1 ? '0' : '25px' }}>
            <Button
              type="primary"
              ghost={field !== sortField}
              onClick={handleSort.bind(null, field, sort, idx)}
            >{ label }<Icon type={sort === 'desc' ? 'arrow-down' : 'arrow-up'} /></Button>
          </span>
        ))
      }
    </div>
  );
};

SortFilter.propTypes = {
  clientList: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(state => ({ clientList: state.clientList }))(SortFilter);
