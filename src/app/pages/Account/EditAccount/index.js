import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectAccount,
    changeUsername
}
    from 'app/store/account';
import {
    changeUsernameAPI
} from 'app/api/account';
import { EditAccountWrapper } from './EditAccountStyle';
import { Card, Button, Typography, Skeleton, Avatar, Input, Form, Checkbox, Space, Divider, notification, Spin } from 'antd';
import { Link, useHistory } from 'react-router-dom';

const layout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
};


function EditAccount() {
    const { Title, Text } = Typography;


    const dispatch = useDispatch();
    const history = useHistory();

    const [editLoading, setEditLoading] = useState(false);

    const info = useSelector(selectAccount);
    const [userName, setUserName] = useState(info.username);
    const username = useSelector(selectAccount).username;
    const onUserNameChanged = e => setUserName(e.target.value);

    const getCharacter = () => {
        if (username == undefined) {
            return ""
        }
        else {
            return username[0].toUpperCase()
        }
    }

    const onFinish = async () => {
        try {
            // setEditLoading(true);
            console.log(userName);
            setEditLoading(true);
            let res = await changeUsernameAPI({ username: userName });
            console.log('----------------------------');
            if (res.code === 1) {
                notification.success({
                    message: "Cập nhật thông tin thành công!",
                    duration: "2"
                });

                history.push(`/account`); // be careful with the order
                await dispatch(changeUsername(userName));
                // await dispatch(editStudent({ data: data, id: studentId }));

            }
        } catch (error) { }
    };

    return (
        <EditAccountWrapper>
            <Spin tip="Đang cập nhật..." spinning={editLoading}>
                {/* <Text style={{ paddingBottom: '20', color: '#1273EB' }} type="secondary">Cập nhật tài khoản của bạn</Text> */}
                <div className="container">
                    <div className="item">
                        <Avatar style={{ color: '#272755', backgroundColor: '#a5dff8' }} size={64}>
                            {getCharacter()}
                        </Avatar>
                    </div>
                    <div className="item">
                        <Title level={3}>
                            {username}
                        </Title>
                    </div>
                </div>
                <Divider />
                <div>
                    <Form
                        {...layout}
                        name="basic"
                        layout="vertical"
                        // initialValues={{ remember: true }}
                        onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label={<span style={{ fontSize: '16px', fontWeight: '900' }}>Tên tài khoản</span>}
                            name="username"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            {
                                username != undefined ?
                                    <Input
                                        className="input"
                                        defaultValue={username}
                                        onChange={onUserNameChanged}
                                        style={{ width: '60%', minWidth: '250px' }}
                                    />
                                    :
                                    null
                            }

                        </Form.Item>


                        <Form.Item style={{ paddingTop: "20px" }}>
                            <Space size={'large'}>
                                <Button
                                    size="large"
                                    className="edit-button"
                                    htmlType="submit"
                                    style={{ borderRadius: '6px' }}
                                >
                                    Cập nhật
                                </Button>
                                <Button
                                    size="large"
                                    className="cancel-button"
                                    style={{ borderRadius: '6px' }}
                                    onClick={() => { history.push('/account') }}
                                >
                                    Hủy
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </Spin>
        </EditAccountWrapper>
    )
}

export default EditAccount;
