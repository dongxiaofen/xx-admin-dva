import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import ClientItem from './clientItem';
import { loadingComp } from '../../hoc';

const List = ({ clientList }) => {
  const createList = () => {
    const listData = clientList.list.content;
    const output = [];
    if (listData) {
      listData.map((item, idx) => {
        output.push(<ClientItem key={idx} clientData={item}/>);
      });
    }
    return output;
  };
  return (
    <div>
      <ul>
        {createList()}
      </ul>
    </div>
  )
};

List.propTypes = {
  clientList: PropTypes.object,
};

export default loadingComp({
  mapDataToProps: (props) => ({
    loading: props.hocData.loading,
    error: props.hocData.error
  })
})(connect(state => ({ clientList: state.clientList }))(List));
