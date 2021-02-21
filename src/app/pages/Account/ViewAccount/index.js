import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectAccount,
} from 'app/store/account';
import {
    selectAllStudent,
} from 'app/store/student';
import { ViewAccountWrapper } from './ViewAccountStyle';
import { Card, Button, Typography, Avatar, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import { TeamOutlined, UserOutlined, GlobalOutlined, CopyOutlined } from '@ant-design/icons';


function ViewAccount() {
    const { Title, Text } = Typography;


    const dispatch = useDispatch();
    const history = useHistory();

    // const [username, setUsername] = useState("");
    // const AccountStatus = useSelector(selectAccountStatus);
    // useEffect(() => {
    // }, AccountStatus);

    
    const username = useSelector(selectAccount).username;
    const email = useSelector(selectAccount).email;
    const studentNumber = useSelector(selectAllStudent).length;

    const getCharacter = () => {
        if(username == undefined){
            return ""
        }
        else{
            return username[0].toUpperCase()
        }
    }


    return (
        <ViewAccountWrapper>
            {/* <Text style={{ paddingBottom: '20', color: '#1273EB' }} type="secondary">Tài khoản của bạn</Text> */}
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
          
            <Row
                gutter={[16, 16]}
            >
                <Col
                    sm={24}
                    xl={16}
                    // style={{ paddingRight: 30 }}
                >
                    <Card hoverable>
                        <div>
                            <Button 
                                size="large"
                                className="edit-button" 
                                onClick={() => { history.push('/edit-account') }}
                                style={{marginBottom: '40px'}}
                                >
                                Cập nhật
                            </Button>

                            <Title level={5}><GlobalOutlined style={{marginRight: '10px'}}/>Địa chỉ Email</Title>
                            <p style={{marginLeft: '26px'}}>{email}</p>

                            <Title level={5}><UserOutlined style={{marginRight: '10px'}}/>Tên tài khoản</Title>
                            <p style={{marginLeft: '26px'}}>{username}</p>

                            <Title level={5}><CopyOutlined style={{marginRight: '10px'}}/>Số đề đã làm</Title>
                            <p style={{marginLeft: '26px'}}>{studentNumber}</p>
                        </div>
                    </Card>
                </Col>
            </Row>
        </ViewAccountWrapper>
    )
}

export default ViewAccount;
