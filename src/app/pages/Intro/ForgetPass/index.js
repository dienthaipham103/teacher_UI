import React from "react";
import { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Checkbox, Card, Avatar, Modal, Col, Row, Spin, Typography } from "antd";
import { ForgetPasswordWrapper } from './ForgetPassStyle';

import { forgetPasswordAPI } from 'app/api/auth';
import Tick from "assets/images/tick.png";

const { Title } = Typography;

function ForgetPassword() {
  //   const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  // const [emailSent, setEmailSent] = useState(true);
  const [emailSent, setEmailSent] = useState(false);

  const [emailValidate, setEmailValidate] = useState("");
  const [passwordValidate, setPasswordValidate] = useState("");
  const [confirmedPasswordValidate, setConfirmedPasswordValidate] = useState("");


  const onFinish = async (values) => {
    // handle confirmed password
    setConfirmedPasswordValidate("");
    if (values.password != values.confirmedPassword) {
      setConfirmedPasswordValidate("Mật khẩu xác nhận sai!");
    }
    else {
      try {
        console.log(values);
        setLoading(true);
        let res = await forgetPasswordAPI({ password: values.password, email: values.email });
        const validations = res.errors;
        console.log('Validations: ', validations);
        console.log('Respone: ', res);

        let email = "";
        let password = "";
        if (validations) {
          for (let i = 0; i < validations.length; i++) {
            const message = validations[i]
            if (message.email) {
              email = message.email
            }
            if (message.password) {
              password = message.password
            }

          }
        }
        setLoading(false);
        setEmailValidate(email);
        setPasswordValidate(password);

        if (res == "Email Sent") {
          setEmailSent(true);
        }

        // dispatch(login(values));
      } catch (error) {
        console.log(error);
      }

    }

  };

  return (
    <ForgetPasswordWrapper>
      <Spin tip="Đang tải..." spinning={loading}>
        <div>
          <Title level={2}
            style={{ paddingTop: '15px', paddingBottom: '0px', color: '#1273EB', display: 'flex', justifyContent: 'center' }}
          >
            WiiQuiz
          </Title>
          <Row
            justify="center"
          >
            <Col
              // span={8}
              sm={24}
              xl={8}
            // offset={8}
            >
              <Card
                // title={!emailSent && "Khôi phục mật khẩu"}
                style={{ marginLeft: '5%', marginRight: '5%' }}
              >
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: false
                  }}
                  onFinish={onFinish}
                >
                  {!emailSent &&
                    <div>
                      <Form.Item>
                        <Title
                          level={4}
                          style={{ fontWeight: '900', color: '#12185D', fontSize: '22px' }}
                        >
                          Khôi phục mật khẩu
                        </Title>
                      </Form.Item>

                      {/* <Form.Item>
                        <p style={{ fontSize: '16px' }}>
                          Nhập email của bạn và mật khẩu mới. Sau đó kiểm tra email, xác nhận để khôi phục mật khẩu.
                        </p>
                      </Form.Item> */}

                      <Form.Item>
                        <div style={{ fontWeight: '900', fontSize: '16px', color: '#000' }}>
                          Email
                        </div>
                      </Form.Item>
                      <Form.Item
                        name="email"
                        validateStatus={emailValidate.localeCompare("") != 0 ? "error" : null}
                        help={emailValidate.localeCompare("") != 0 ? emailValidate : null}
                        rules={[
                          {
                            required: true,
                            message: <p style={{ color: 'red' }}>Nhập email!</p>
                          }
                        ]}
                      >

                        <Input
                          // prefix={<UserOutlined className="site-form-item-icon" />}
                          placeholder="Email"
                          style={{ height: "46px" }}
                        />
                      </Form.Item>

                      <Form.Item
                        style={{ marginTop: '18px' }}
                      >
                        <div style={{ fontWeight: '900', fontSize: '16px', color: '#000' }}>
                          Mật khẩu mới
                        </div>
                      </Form.Item>
                      <Form.Item
                        name="password"
                        validateStatus={passwordValidate.localeCompare("") != 0 ? "error" : null}
                        help={passwordValidate.localeCompare("") != 0 ? passwordValidate : null}
                        rules={[
                          {
                            required: true,
                            message: <p style={{ color: 'red' }}>Nhập mật khẩu!</p>
                          }
                        ]}
                      >
                        <Input.Password
                          // prefix={<LockOutlined className="site-form-item-icon" />}
                          type="password"
                          placeholder="Mật khẩu"
                          style={{ height: '46px', borderRadius: '5px' }}

                        />
                      </Form.Item>

                      <Form.Item
                        style={{ marginTop: '18px' }}
                      >
                        <div style={{ fontWeight: '900', fontSize: '16px', color: '#000' }}>
                          Nhập lại mật khẩu
                        </div>
                      </Form.Item>
                      <Form.Item
                        name="confirmedPassword"
                        validateStatus={confirmedPasswordValidate.localeCompare("") != 0 ? "error" : null}
                        help={confirmedPasswordValidate.localeCompare("") != 0 ? confirmedPasswordValidate : null}
                        rules={[
                          {
                            required: true,
                            message: <p style={{ color: 'red' }}>Nhập mật khẩu!</p>
                          }
                        ]}
                      >
                        <Input.Password
                          // prefix={<LockOutlined className="site-form-item-icon" />}
                          type="password"
                          placeholder="Mật khẩu"
                          style={{ height: '46px', borderRadius: '5px' }}

                        />
                      </Form.Item>

                      <Form.Item
                        style={{ marginTop: '28px' }}
                      >
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="reset-button"
                        >
                          Khôi phục
                        </Button>
                      </Form.Item>
                    </div>

                  }

                  {emailSent &&
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img className="fg-item" id="f" src={Tick} alt="Tick"
                          style={{
                            paddingBottom: '10px',
                          }}>
                        </img>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Title level={4} style={{ fontWeight: '900', color: '#12185D', fontSize: '22px' }}>Kiểm tra email !</Title>
                      </div>
                      <Form.Item>
                        <p style={{ fontSize: '16px' }}>
                          Chúng tôi đã gửi email xác nhận đổi mật khẩu cho bạn. Vui lòng kiểm tra email. Email sẽ hết hiệu lực sau 5 phút!
                        </p>
                      </Form.Item>
                    </div>
                  }

                  <Form.Item
                    style={{ marginTop: '18px' }}
                  >
                    <a style={{ fontWeight: '900', fontSize: '16px' }} href='/login'>
                      Quay lại trang đăng nhập
                    </a>
                  </Form.Item>


                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </Spin>
    </ForgetPasswordWrapper>
  );
}


export default ForgetPassword;
