import { LogoutOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'app/store/auth';

/////////////
import React, { useState, useContext, useEffect } from 'react';
import { Layout, Menu, Row, Col, Avatar, Dropdown } from 'antd';
import { Divider } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { DownOutlined, CaretDownOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import { LogoHeaderWrapper } from './LogoHeaderStyle';
import { ThemeContext } from 'styled-components';

import Avatar_ from "assets/images/avatar.png";
import Logo from "assets/images/main-logo.png";
import Wiiquiz from "assets/images/wiiquiz-logo.png";

/////////////

// import { Affix } from 'antd';


const { Header } = Layout;

function LogoHeader() {

  return (
    <LogoHeaderWrapper>
      <Header>
        <Row>
          <Col span={4}>
            <div>
              {/* <div style={{}}>
                <img className="logo" src={Logo} style={{ height: '50px' }} />
              </div> */}
              <div style={{paddingLeft: '10px'}}>
                <img className="main-logo" src={Logo} style={{ height: '50px' }} />
                <img className="wiiquiz-logo" src={Wiiquiz} style={{ height: '35px', paddingLeft: '10px' }} />
              </div>

            </div>
            {/* <Divider type="vertical" style={{ height: '40px', marginLeft: '30px' }} /> */}
          </Col>
        </Row>
      </Header>
    </LogoHeaderWrapper>
  );
};

export default LogoHeader;
