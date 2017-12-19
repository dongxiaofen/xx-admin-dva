import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
// import { config } from 'utils'
import styles from './index.less'
// import md5 from 'crypto-js/md5';
// import encHex from 'crypto-js/enc-hex';

const FormItem = Form.Item

const Login = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      console.log(values, 'values');
      dispatch({ type: 'login/login', payload: {email: values.username, password: values.password} })
      // dispatch({ type: 'login/login', payload: values })
    })
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        {/*<img alt={'logo'} src={config.logo} />
        <span>{config.name}</span>*/}
        星象后台管理
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input size="large" onPressEnter={handleOk} placeholder="Username" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input size="large" type="password" value="25d55ad283aa400af464c76d713c07ad" onPressEnter={handleOk} placeholder="Password" />)}
        </FormItem>
        <Row>
          <Button type="primary" size="large" onClick={handleOk} loading={loading.effects.login}>
            Sign in
          </Button>
          <p>
            <span>Username：guest</span>
            <span>Password：guest</span>
          </p>
        </Row>

      </form>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ loading }) => ({ loading }))(Form.create()(Login))
