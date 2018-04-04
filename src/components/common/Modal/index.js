import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Modal, Button } from 'antd';

const _Modal = ({ modal, dispatch }) => {
  // console.log(modal, 'modal');
  const {
    visible,
    width,
    title,
    cancelText,
    okText,
    footer,
    onCancel,
    onOk,
    loading,
    // onClose,
    contentText,
    modalComp
  } = modal;
  const ModalComp = modalComp;
  const handleOk = () => {
    if (onOk) {
      onOk();
    }
  };
  const handleCancel = () => {
    dispatch({ type: 'modal/resetModal' });
    if (onCancel) {
      onCancel();
    }
  };
  if (footer) {
    <Modal
      visible={visible}
      width={width}
      title={title}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText={cancelText}
      okText={okText}
      footer={footer}
      confirmLoading={loading}
    >
      { contentText ? <span>{ contentText }</span> : null }
      { ModalComp ? <ModalComp /> : null }
    </Modal>;
  }
  return (
    <Modal
      visible={visible}
      width={width}
      title={title}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText={cancelText}
      okText={okText}
      confirmLoading={loading}
    >
      { contentText ? <span>{ contentText }</span> : null }
      { ModalComp ? <ModalComp /> : null }
    </Modal>
  );
};

_Modal.propTypes = {
  modal: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(state => ({
  modal: state.modal,
}))(_Modal);
