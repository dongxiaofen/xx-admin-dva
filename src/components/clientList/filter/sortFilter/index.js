import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Icon, Button } from 'antd';

const SortFilter = ({ clientList, dispatch }) => {
  const sortData = [
    { label: '开户时间', field: 'createdTs' },
    { label: '账号有效时间', field: 'expireDt' },
    { label: '最近登陆日期', field: 'lastLoginTs' },
  ];
  const handleSort = (type, time) => {
    console.log(type, time);
  };
  return (
    <div>
      {
        sortData.map(({ label, field }, idx) => (
          <span key={idx} style={{ marginRight: idx === sortData.length - 1 ? '0' : '25px' }}>
            <Button
              type="primary"
              ghost={field !== clientList.sort.type}
              onClick={handleSort.bind(field)}
            >{ label }<Icon type={clientList.sort.time === 'desc' ? 'arrow-down' : 'arrow-up'} /></Button>
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
