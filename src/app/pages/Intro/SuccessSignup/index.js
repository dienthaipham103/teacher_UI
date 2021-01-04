import React from "react";
import { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Checkbox, Card, Avatar, Modal, Col, Row, Spin, Typography } from "antd";
import { useHistory } from "react-router-dom";
import { SuccessSignupWrapper } from './SuccessSignupStyle';

import Tick from "assets/images/tick.png";

const { Title } = Typography;

function SuccessSignup() {
  const history = useHistory();

  return (
    <SuccessSignupWrapper>
      <div style={{ paddingTop: '10vh' }}>
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
                <Title level={3} style={{ color: '#14148A' }}>Kích hoạt tài khoản thành công!</Title>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button 
                  style={{borderRadius: '4px'}} 
                  onClick={() => { history.push(`/intro`)}}
                  >
                  Quay lại trang đăng nhập
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </SuccessSignupWrapper>
  );
}


export default SuccessSignup;
