import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Row, Col } from 'antd';

const FormItem = Form.Item;
import CommonSelect from '../../../common/CommonSelect';

const FormFilter = ({ clientList, dispatch }) => {
  const roleData = [{ label: '全部', field: 'all' }];
  if (clientList.roleType.length > 0) {
    clientList.roleType.map(({ type, desc }) => {
      roleData.push({ label: desc, field: type });
    });
  }

  const accountData = [
    { label: '全部', field: 'all' },
    { label: '测试', field: 'TEST' },
    { label: '试用', field: 'ON_TRIAL' },
    { label: '商业', field: 'BUSINESS' },
  ];

  const consumeData = [
    { label: '全部', field: 'all' },
    { label: '点数', field: 'POINT' },
    { label: '套餐', field: 'FEESET' },
  ];

  const handleFilterChange = (value, type) => {
    let filter = value;
    if (value === 'all') {
      filter = '';
    }
    dispatch({ type: 'clientList/changeFilter', payload: { [type]: filter } });
    dispatch({ type: 'clientList/getClientList' });
  };

  const handleRoleType = (value) => {
    handleFilterChange(value, 'roleType');
  };
  const handleAccountType = (value) => {
    handleFilterChange(value, 'accountType');
  };
  const handleConsumeType = (value) => {
    handleFilterChange(value, 'consumeType');
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  return (
    <Form layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem {...formItemLayout} label="计费方式" style={{ width: '100%' }}>
            <CommonSelect options={consumeData} handleChange={handleConsumeType} defaultValue={clientList.filter.roleType} />
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem {...formItemLayout} label="权限" style={{ width: '100%' }}>
            <CommonSelect options={roleData} handleChange={handleRoleType} defaultValue={clientList.filter.roleType} />
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem {...formItemLayout} label="属性" style={{ width: '100%' }}>
            <CommonSelect options={accountData} handleChange={handleAccountType} defaultValue={clientList.filter.accountType} />
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};

FormFilter.propTypes = {
  clientList: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(state => ({ clientList: state.clientList }))(FormFilter);
