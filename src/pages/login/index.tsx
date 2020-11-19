import React from 'react';
import './index.less';
import { Form, Input, Button, Checkbox,Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect, Dispatch, StateType } from 'umi';
import { ConnectState } from '@/models/connect';


interface LoginProps {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
const Login: React.FC<LoginProps> = (props: { dispatch: any; }) => {
    const onFinish = (values: any) => {
      const { dispatch } = props;
      dispatch({
        type: 'login/login',
        payload: { ...values},
      })
      console.log('Received values of form: ', values);
    };
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ autoLogin: false }}
        onFinish={onFinish}
      >
        <Form.Item
          name="userName"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="autoLogin" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
        </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
        </Button>
        Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    );
  };
  
  export default connect(({ login, loading }: ConnectState) => ({
    userLogin: login,
    submitting: loading.effects['login/login'],
  }))(Login);
