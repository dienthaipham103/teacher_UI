import React from "react";
import { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, Card, Avatar, Modal, Col, Row, Spin, Typography } from "antd";

import {
    forgetPasswordAPI,
    verifyEmailAPI
} from 'app/api/auth';

import { useLocation } from 'react-router';
import queryString from 'query-string';

function VerifyNewPassword() {
    const { Title } = Typography;
    //   const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const verifyChangePasswordToken = queryString.parse(location.search);
    console.log(verifyChangePasswordToken);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Create an scoped async function in the hook
        async function verifyEmail() {
            let res = await verifyEmailAPI(verifyChangePasswordToken);
            console.log(res);
            if (res.isSuccess === true) {
                history.push("/forget-password/success");
            }
        }
        // Execute the created function directly
        verifyEmail();
    }, []);

    // const onFinish = async (values) => {

    // };

    return (
        <div>
            <Title level={2}
                    style={{ paddingTop: '15px', paddingBottom: '0px', color: '#1273EB', display: 'flex', justifyContent: 'center' }}
                >
                    WiiQuiz
            </Title>
            <Spin tip="Đang tạo mật khẩu mới..." spinning={true}>
                <div>
                    <p></p>
                </div>
            </Spin>
        </div>

    );
}


export default VerifyNewPassword;
