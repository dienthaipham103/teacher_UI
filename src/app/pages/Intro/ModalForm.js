import React from "react";
import { Modal, Form, Input, Radio, Button, Card, Row, Col, notification } from "antd";

import Facebook from "assets/images/f.png";
import Google from "assets/images/g.png";
import styled from "styled-components";
import { ModalFormWrapper } from "./ModalFormStyle";
///
import { useDispatch } from "react-redux";
import { login, loginGoogle, loginFacebook } from "app/store/auth";
///
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';


const ModalFormComponent = ({ visible, onCancel }) => {
    ///
    const dispatch = useDispatch();
    ///

    const onFinish = async (values) => {
        try {
            console.log(values);
            let res = await dispatch(login(values));
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
        if(response.accessToken){
            console.log(response.accessToken)
            let res = await dispatch(loginGoogle({oAuthAccessToken: response.accessToken}))
        }
    }

    const facebookLogin = async (response) => {
        if(response.accessToken){
            console.log(response.accessToken)
            let res = await dispatch(loginFacebook({oAuthAccessToken: response.accessToken}))
        }
    }

    return (

        <Modal
            // className="modal"
            visible={visible}
            centered
            onCancel={onCancel}
            footer={null}
            closable={false}
            // style={{height: '300px', width: '800'}}
            // width={420}
            // height={460}
            bodyStyle={{
                // height: '300px',
                // width: '800px'
            }}
        >
            <ModalFormWrapper>
                <Row
                    justify="center"
                >
                    <Col>
                        <Card
                            title="Đăng nhập bằng"
                            bordered={false}
                        >
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{
                                    remember: false
                                }}
                                onFinish={onFinish}
                            >
                                <Form.Item>
                                    <GoogleLogin
                                        clientId={ "989170060761-gqshnvs9nvk67n5g0peq4pdi8en8d38s.apps.googleusercontent.com" }
                                        buttonText='Login'
                                        onSuccess={ googleLogin }
                                        onFailure={ handleLoginFailure }
                                        cookiePolicy={ 'single_host_origin' }
                                        responseType='code,token'
                                    />
                                    <FacebookLogin
                                        appId="738818986677668"
                                        autoLoad={false}
                                        onFailure={ handleLoginFailure }
                                        callback={ facebookLogin }
                                        redirectUri = 'https://app.wiiquiz.com'
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <p style={{
                                        display: 'flex', justifyContent: 'center',
                                        fontSize: '16px', fontWeight: '500'
                                    }}>
                                        HOẶC
                                </p>
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Nhập email!"
                                        }
                                    ]}
                                >

                                    <Input
                                        // prefix={<UserOutlined className="site-form-item-icon" />}
                                        placeholder="Email"
                                        style={{ height: "50px" }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Nhập mật khẩu!"
                                        }
                                    ]}
                                >
                                    <Input
                                        // prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Mật khẩu"
                                        style={{ height: '50px' }}

                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                    >
                                        Đăng nhập
                            </Button>
                                </Form.Item>

                                <Form.Item>
                                    <a href='/forget-password'>
                                        Quên mật khẩu
                                </a>

                                </Form.Item>


                            </Form>
                        </Card>
                    </Col>
                </Row>
            </ModalFormWrapper>
        </Modal>
    );
};

export default ModalFormComponent;