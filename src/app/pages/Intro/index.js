import React from "react";
import { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Card, Avatar, Modal, Row, Col } from "antd";
import { IntroWrapper } from "./IntroStyle";
import { useDispatch } from "react-redux";
import { login } from "app/store/auth";
import { Link } from "react-router-dom";
import { Affix } from 'antd';
import ScrollTopArrow from './ScrollTopArrow';

import Background from "assets/images/background.png";
import Facebook from "assets/images/facebook3.png";
import Google from "assets/images/google.png";
import ModalFormComponent from "./ModalForm";

import { useSelector } from "react-redux";
import _isEmpty from "lodash/isEmpty";
import { useHistory } from "react-router-dom";
import { signup } from "app/store/auth";
import { notification } from "antd";

function Intro() {
  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.auth.isLogged);
  const history = useHistory();
  const [form] = Form.useForm();

  const [emailValidate, setEmailValidate] = useState("");
  const [passwordValidate, setPasswordValidate] = useState("");
  const [confirmedPasswordValidate, setConfirmedPasswordValidate] = useState("");

  useEffect(() => {
    if (isLogged) {
      history.push("/home");
    }
  }, [isLogged]);

  const [top, setTop] = useState(540);

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
            message: "Đăng ký thành công! Link kích hoạt tài khoản được gửi vào email của bạn, link chỉ có hiệu lực trong vòng 5 phút!",
            duration: "5"
          });
          // window.location.reload(false);
        }

      }
      catch (error) {
        // console.log(error.response.data);
      }
    }

  };
  ///-------------------

  // scroll page
  const [showScroll, setShowScroll] = useState(false)
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(true)
    }
  };
  const scrollTop = () => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };
  window.addEventListener('scroll', checkScrollTop)

  // login modal
  const [visible, setVisible] = useState(false);



  return (
    <IntroWrapper>
      <div className="bg">
        {/* <Affix offsetTop={top}> */}
        <div className="icons-container">

          <div className="icon-item">
            <Button type="dashed" size="large" onClick={() => setVisible(true)}>Đăng nhập</Button>
            <ModalFormComponent
              // centered
              visible={visible}
              onCancel={() => setVisible(false)}
            />
          </div>


          <div className="icon-item">
            {/* <Link to={"/register"}> */}
            <Button type="primary" size="large" onClick={scrollTop}>
              Đăng ký
            </Button>
            {/* </Link> */}
          </div>
        </div>
        {/* </Affix> */}

        <Row
          justify="center"
        >
          <Col
            sm={24}
            xl={8}
          >
            <Card
              title="Bắt đầu ngay"
              bordered={false}
              style={{ marginTop: '20px' }}
            >
              <Form
                form={form}
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: false
                }}
                onFinish={onFinish}
              >


                <Form.Item
                  name="email"
                  validateStatus={emailValidate.localeCompare("") != 0 ? "error" : null}
                  help={emailValidate.localeCompare("") != 0 ? emailValidate : null}
                  rules={[
                    {
                      required: true,
                      message: <p style={{ color: 'red' }}>Vui lòng nhập email!</p>
                    }
                  ]}
                >

                  <Input
                    placeholder="Email"
                    style={{ height: "50px" }}
                  />
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
                  <Input
                    type="password"
                    placeholder="Mật khẩu"
                    style={{ height: '50px' }}

                  />
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
                  <Input
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    style={{ height: '50px' }}

                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="register-form-button"
                  >
                    Đăng ký
                  </Button>
                </Form.Item>

                <Form.Item>
                  <p style={{ textAlign: 'center', fontSize: '16px' }}>Hoặc sử dụng tài khoản khác</p>
                  <div className="fg-container">
                    <img className="fg-item" id="f" src={Facebook} alt="Logo"
                      style={{
                        width: "54px", height: "54px",
                        borderRadius: '50%', border: '1px solid #302ed0',
                        padding: '8px', cursor: 'pointer'
                      }}>
                    </img>

                    <img className="fg-item" id="g" src={Google} alt="Logo"
                      style={{
                        width: "54px", height: "54px",
                        borderRadius: '50%', border: '1px solid red',
                        padding: '12px', cursor: 'pointer'
                      }}>
                    </img>
                  </div>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>

        <Affix offsetTop={top}>
          <div className="scroll" style={{ paddingLeft: '196vh' }}>
            <ScrollTopArrow />
          </div>
        </Affix>

      </div>
    </IntroWrapper>
  );
}


export default Intro;
