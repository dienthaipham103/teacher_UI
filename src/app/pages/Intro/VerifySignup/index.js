import React from "react";
import { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, Card, Avatar, Modal, Col, Row, Spin, Typography } from "antd";

import {
    verifySignupAPI
} from 'app/api/auth';

import { useLocation } from 'react-router';
import queryString from 'query-string';

function VerifySignup() {
    //   const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const verifySignupToken = queryString.parse(location.search);
    console.log(verifySignupToken);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Create an scoped async function in the hook
        async function verifySignup() {
            let res = await verifySignupAPI(verifySignupToken);
            console.log(res);
            if (res.isSuccess === true) {
                history.push("/signup/success");
            }
        }
        // Execute the created function directly
        verifySignup();
    }, []);

    // const onFinish = async (values) => {

    // };

    return (
        <div>
            <Spin tip="Đang xác minh Email của bạn..." spinning={true}>
                <div>
                    <p></p>
                </div>
            </Spin>
        </div>

    );
}


export default VerifySignup;
