import React from "react";
import { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Checkbox, Card, Avatar, Modal, Col, Row, Spin, Typography } from "antd";
import { useHistory } from "react-router-dom";
import { SuccessNewPasswordWrapper } from './SuccessNewPassStyle';

import Tick from "assets/images/tick.png";

const { Title } = Typography;

function SuccessNewPassword() {
  const history = useHistory();

  return (
    <SuccessNewPasswordWrapper>
      <div>
        <Title level={2}
          style={{ paddingTop: '15px', paddingBottom: '0px', color: '#1273EB', display: 'flex', justifyContent: 'center' }}
        >
          WiiQuiz
        </Title>
        <Row>
          <Col span={8} offset={8}>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img className="fg-item" id="f" src={Tick} alt="Tick"
                  style={{
                    paddingBottom: '10px',
                  }}>
                </img>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Title level={3}>Khôi phục mật khẩu thành công!</Title>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                <Button
                  className="success-button"
                  onClick={() => { history.push(`/login`) }}
                >
                  Đăng nhập
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </SuccessNewPasswordWrapper>
  );
}


export default SuccessNewPassword;
