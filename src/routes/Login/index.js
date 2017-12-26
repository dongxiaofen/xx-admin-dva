import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Form, Input } from 'antd';
import styles from './index.less';
import md5 from 'crypto-js/md5';
import encHex from 'crypto-js/enc-hex';

const FormItem = Form.Item;

const Login = ({
  login,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
  // ...props
}) => {
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      // console.log(values, 'values');
      dispatch({ type: 'login/login', payload: {email: values.email, password: encHex.stringify(md5(values.password))} });
      dispatch({ type: 'login/updateLogin', payload: {loading: true, ...values} });
    })
  }
  return (
    <div className={styles.login}>
      <div className={styles.form}>
        <div className={styles.logo}>
          星象后台管理
        </div>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true, message: '请输入用户名!'
                }, {
                  type: 'email', message: '请输入正确的邮箱!',
                }
              ],
            })(<Input size="large" onPressEnter={handleOk} placeholder="邮箱" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码'
                },
              ],
            })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="密码" />)}
          </FormItem>
          <Row>
            <Button type="primary" size="large" onClick={handleOk} loading={login.loading}>
              登录
            </Button>
          </Row>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  login: PropTypes.object,
};
// function mapStateToProps(state) {
//   console.log(state.login, 'state login');
//   return {state.login};
// }
// export default connect(mapStateToProps)(Form.create()(Login))
export default connect(({login}) => ({login}))(Form.create()(Login));
