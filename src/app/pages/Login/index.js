import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Card, Typography, Col, Row, notification, Spin, Space } from 'antd';
import { LoginWrapper } from './LoginStyle';
import { GoogleOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginGoogle, loginFacebook } from "app/store/auth";
import { Link, Route } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';
import { useHistory } from 'react-router-dom';

import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import GoogleButton from 'react-google-button';
import { FacebookOutlined } from '@ant-design/icons';
import Google from "assets/images/google-icon.png";
import Facebook from "assets/images/facebook-icon1.png";

function Login() {
  const { Title } = Typography;
  const history = useHistory();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const isLogged = useSelector(state => state?.auth?.isLogged);

  ///
  const dispatch = useDispatch();
  ///

  useEffect(() => {
    if (isLogged) {
      history.push('/home');
    }
  }, [isLogged]);

  const onFinish = async (values) => {
    try {
      console.log(values);
      setLoading(true);
      let res = await dispatch(login(values));
      setLoading(false);
      history.push('/home');
      // console.log(res.error == null);
      if (res.error) {
        notification.error({
          message: "Email hoặc mật khẩu không đúng. Vui lòng nhập lại!",
          duration: "2"
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginFailure = async (response) => {
    alert(`Failed to log in using OAuth: ${response}`)
  }

  const googleLogin = async (response) => {
    if (response.accessToken) {
      console.log(response.accessToken)
      let res = await dispatch(loginGoogle({ oAuthAccessToken: response.accessToken }))
    }
  }

  const facebookLogin = async (response) => {
    if (response.accessToken) {
      console.log(response.accessToken)
      let res = await dispatch(loginFacebook({ oAuthAccessToken: response.accessToken }))
    }
  }

  return (
    <LoginWrapper>
      <Spin tip="Đang tải..." spinning={loading}>

        <div
          style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginRight: '40px' }}
        >
          {/* <Space size="large">
            <Route path='/privacy-policy' component={() => {
              window.location.href = 'https://app.wiiquiz.com/';
              return null;
            }} />
            <a href="https://app.wiiquiz.com/">Học sinh</a>

            <Button
              onClick={() => {

              }}
            >
              Giáo viên
          </Button>
          </Space> */}
          <Space size="middle">
            <Button
              className={"active-button"}
              size='large'
              style={{ borderRadius: '6px' }}
            // onClick={() => { setType("EXAM") }}
            >
              Giáo viên
            </Button>
            {/* <Route path='/privacy-policy' component={() => {
              window.location.href = 'https://app.wiiquiz.com/';
              return null;
            }} />
            <a href="https://app.wiiquiz.com/">Học sinh</a> */}
            <Button
              className={"non-active-button"}
              size='large'
              style={{ borderRadius: '6px' }}
            // onClick={() => { setType("PRACTICE") }}
            >
              <Route path='/privacy-policy' component={() => {
                window.location.href = 'https://app.wiiquiz.com/';
                return null;
              }} />
              <a href="https://app.wiiquiz.com/">Học sinh</a>
            </Button>
          </Space>
        </div>

        <Title level={2}
          style={{ paddingTop: '15px', paddingBottom: '0px', color: '#1273EB', display: 'flex', justifyContent: 'center' }}
        >
          WiiQuiz
       </Title>

        <Row
          justify="center"
        >
          <Col
            sm={24}
            xl={8}
          >
            <Card
            // title="Đăng nhập bằng email"
            // bordered={false}
            >
              <Form
                form={form}
                layout="vertical"
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: false
                }}
                onFinish={onFinish}
              >

                <Form.Item>
                  <Title
                    level={4}
                    style={{ fontWeight: '900', color: '#12185D', fontSize: '22px' }}
                  >
                    Đăng nhập bằng Email
                </Title>
                </Form.Item>

                <Form.Item>
                  <div style={{ fontWeight: '900', fontSize: '16px', color: '#000' }}>
                    Email
                </div>
                </Form.Item>
                <Form.Item
                  // label="Địa chỉ Email"
                  name="email"
                  // validateStatus={emailValidate.localeCompare("") != 0 ? "error" : null}
                  // help={emailValidate.localeCompare("") != 0 ? emailValidate : null}
                  rules={[
                    {
                      required: true,
                      message: <p style={{ color: 'red' }}>Vui lòng nhập email!</p>,
                    }
                  ]}
                >

                  <Input
                    placeholder="Email"
                    style={{ height: "46px" }}
                  />
                </Form.Item>


                <Form.Item
                  style={{ marginTop: '18px' }}
                >
                  <div style={{ fontWeight: '900', fontSize: '16px', color: '#000' }}>
                    Mật khẩu
                </div>
                </Form.Item>
                <Form.Item
                  name="password"
                  // validateStatus={passwordValidate.localeCompare("") != 0 ? "error" : null}
                  // help={passwordValidate.localeCompare("") != 0 ? passwordValidate : null}
                  rules={[
                    {
                      required: true,
                      message: <p style={{ color: 'red' }}>Vui lòng nhập mật khẩu!</p>
                    }
                  ]}
                >
                  <Input.Password
                    type="password"
                    placeholder="Mật khẩu"
                    style={{ height: '46px', borderRadius: '5px' }}

                  />
                </Form.Item>

                <Form.Item>
                  <a style={{ fontWeight: '900', fontSize: '16px' }} href="/forget-password">
                    Quên mật khẩu?
                </a>
                </Form.Item>

                <Form.Item
                  style={{ marginTop: '18px' }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-button"
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>

                <Form.Item
                  style={{ marginTop: '18px' }}
                >
                  <GoogleLogin
                    clientId={"989170060761-gqshnvs9nvk67n5g0peq4pdi8en8d38s.apps.googleusercontent.com"}
                    onSuccess={googleLogin}
                    onFailure={handleLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    responseType='code,token'
                    // className="btnGoogle"
                    render={renderProps => (
                      <Button className="google-login" onClick={renderProps.onClick}>
                        {/* <GoogleOutlined style={{ color: 'red', fontSize: '22px' }} /> */}
                        <img className="google-icon" src={Google} style={{ height: '30px', marginRight: '10px' }} />
                        {/* <GoogleOutlined style={{ color: 'red', fontSize: '22px' }} /> */}
                        <span style={{ paddingRight: '20px' }}>
                          Đăng nhập bằng Google
                        </span>
                      </Button>
                      // <GoogleButton
                      //   type='light'
                      //   label='Đăng nhập bằng Google'
                      //   onClick={renderProps.onClick}
                      //   style=
                      //     {{
                      //       width: '100%', 
                      //       borderRadius: '5px',
                      //       fontSize: '16px', 
                      //       fontWeight: '900',
                      //       fontFamily: 'Quicksand', 
                      //       color: '#000',
                      //       textAlign: 'center'
                      //     }}
                      // />
                    )}
                  />

                  {/* <GoogleLogin
                  clientId={"989170060761-gqshnvs9nvk67n5g0peq4pdi8en8d38s.apps.googleusercontent.com"}
                  onSuccess={googleLogin}
                  onFailure={handleLoginFailure}
                  cookiePolicy={'single_host_origin'}
                  responseType='code,token'
                  icon={false}
                  className="btnGoogle"
                >
                  <i className="fa fa-google-plus" style={{
                    marginLeft: '5px'
                  }} />
                  <span style={{fontSize: '16px', display: 'flex', justifyContent: 'center'}}>&nbsp;&nbsp;Đăng nhập bằng Google</span>
                </GoogleLogin> */}
                </Form.Item>

                <Form.Item
                  style={{ marginTop: '18px' }}
                >
                  <FacebookLogin
                    appId="738818986677668"
                    autoLoad={false}
                    onFailure={handleLoginFailure}
                    callback={facebookLogin}
                    cssClass="btnFacebook"
                    // icon="fa-facebook"
                    // textButton="&nbsp;&nbsp;Đăng nhập bằng Facebook"
                    textButton={
                      <div style={{ textAlign: 'center' }}>
                        {/* <FacebookOutlined size="large" style={{ marginRight: '10px', color: 'blue', fontSize: '20px' }} /> */}
                        <img className="facebook-icon" src={Facebook} style={{ height: '30px', marginRight: '10px' }} />
                        <span>Đăng nhập bằng Facebook</span>
                      </div>

                    }
                  />
                </Form.Item>

                <Form.Item
                  style={{ marginTop: '18px', fontWeight: '900', fontSize: '16px', color: '#000', textAlign: 'center' }}
                >
                  Không có tài khoản?
                  <a style={{ marginLeft: '5px' }} href="/register">
                    Đăng ký
                  </a>
                </Form.Item>

              </Form>
            </Card>
          </Col>
        </Row>
        <br></br>
      </Spin>


    </LoginWrapper>
  );
}

export default Login;
