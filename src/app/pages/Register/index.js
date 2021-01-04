import React from "react";
import { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Card, Col, Row, Typography, notification } from "antd";
import { RegisterWrapper } from "./RegisterStyle";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signup } from "app/store/auth";
import { Link } from "react-router-dom";

function Register() {
  const { Title } = Typography;

  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.auth.isLogged);
  const history = useHistory();
  const [form] = Form.useForm();

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
        let res = await dispatch(signup({ password: values.password, email: values.email }));
        const validations = res.payload.errors;
        // console.log(validations);
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
        setEmailValidate(email);
        setPasswordValidate(password);

        console.log('Respone: ...................', res.payload == "User is created");
        // handle when creating successfully a new user
        if (res.payload == "Email Sent!") {
          form.resetFields();
          notification.success({
            message: "Vui lòng kiểm tra email để xác nhận đăng kí tài khoản",
            duration: "4"
          });
          // window.location.reload(false);
        }

      }
      catch (error) {
        // console.log(error.response.data);
      }
    }

  };

  return (
    <RegisterWrapper>
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
                  Đăng ký tài khoản
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
                validateStatus={emailValidate.localeCompare("") != 0 ? "error" : null}
                help={emailValidate.localeCompare("") != 0 ? emailValidate : null}
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


              <Form.Item>
                <div style={{ fontWeight: '900', fontSize: '16px', color: '#000', marginTop: '18px' }}>
                  Mật khẩu
                </div>
              </Form.Item>
              <Form.Item
                name="password"
                validateStatus={passwordValidate.localeCompare("") != 0 ? "error" : null}
                help={passwordValidate.localeCompare("") != 0 ? passwordValidate : null}
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

              <Form.Item
                style={{ marginTop: '18px' }}
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(<p style={{ color: 'red' }}>Bạn cần phải đồng ý với Điều khoản sử dụng của WiiQuiz</p>),
                  },
                ]}
              >
                <Checkbox>
                  <span style={{ fontSize: '16px' }}>
                    Đồng ý với <a href="">Điều khoản</a> của WiiQuiz
                  </span>
                </Checkbox>
              </Form.Item>

              <Form.Item
                style={{ marginTop: '28px' }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-button"
                >
                  Đăng ký
                </Button>
              </Form.Item>

              <Form.Item
                style={{ marginTop: '18px' }}
              >
                <a style={{ fontWeight: '900', fontSize: '16px' }} href="/login">
                  Đăng nhập
                </a>
              </Form.Item>

            </Form>
          </Card>
        </Col>
      </Row>

      <br></br>
    </RegisterWrapper>
  );
}

export default Register;
