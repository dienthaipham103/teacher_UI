import { LogoutOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from 'app/store/auth';

/////////////
import React, { useState, useContext, useEffect } from 'react';
import { Layout, Menu, Row, Col, Avatar, Dropdown, Skeleton, Typography } from 'antd';
import { Divider } from 'antd';
import { Link, withRouter, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { DownOutlined, CaretDownOutlined, UserOutlined, HomeOutlined, LockOutlined, UserAddOutlined } from '@ant-design/icons';
import { LayoutHeaderWrapper } from './LayoutHeaderStyle';
import { ThemeContext } from 'styled-components';

import {
  selectAccount,
  getAccount,
  changeFirstLoading
} from 'app/store/account';

import Avatar_ from "assets/images/avatar.png";
import Logo from "assets/images/main-logo.png";
import Wiiquiz from "assets/images/wiiquiz-logo.png";


const { Header } = Layout;

const pageNames = {
  '/home': 'Trang chủ',
  '/quiz': 'Đăng ký thi',
  '/practice': 'Luyện tập',
  '/student-list': 'Danh sách học sinh',
  '/add-student': 'Thêm học sinh',
  '/contact': 'Liên hệ',
  '/account': 'Thông tin tài khoản',
  '/change-password': 'Đổi mật khẩu',
  '/edit-account': 'Cập nhật tài khoản',
  '/student-profile': 'Thông tin học sinh',
  '/edit-student': 'Cập nhật thông tin học sinh',
  '/student-quiz': 'Bài thi của học sinh',
  '/student-practice': 'Bài luyện tập của học sinh',
  '/quiz-info': 'Bài thi',
  '/create-test': 'Làm đề',
  '/add-questions': 'Thêm & chỉnh sửa câu hỏi',
  '/edit-test-info': 'Chỉnh sửa thông tin đề',
  '/test-list': 'Đề đang làm',
  '/test-track': 'Theo dõi đề',
  '/preview-test': 'Xem đề',
  '/preview-test/not-allow-edit': 'Xem đề',
}

const getPageContent = (path) => {
  if (path.includes('/student-profile')) {

    return '/student-profile'
  }
  else if (path.includes('/edit-student')) {
    return '/edit-student'
  }
  else if (path.includes('/student-quiz')) {
    console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHH')
    return '/student-quiz'
  }
  else if (path.includes('/Quiz-info/')) {
    console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHH')
    return '/quiz-info'
  }
  else if (path.includes('/practice/')) {
    console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHH')
    return '/practice'
  }
  else if (path.includes('/add-questions/')) {
    console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHH')
    return '/add-questions'
  }
  else if (path.includes('/edit-test-info/')) {
    return '/edit-test-info'
  }
  else if (path.includes('/preview-test/') && !path.includes('not-allow-edit')) {
    return '/preview-test'
  }
  else if (path.includes('/preview-test/not-allow-edit')) {
    return '/preview-test/not-allow-edit'
  }
  else if (path.includes('/student-practice') || path.includes('/practice-history')) {
    console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHH')
    return '/student-practice'
  }
  else {
    return path
  }
}

export default withRouter(function LayoutHeader({ location }) {
  const { Title } = Typography;
  const theme = useContext(ThemeContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  const getAccountStatus = useSelector(state => state.account.status);
  const firstLoading = useSelector(state => state.account.firstLoading);
  const info = useSelector(selectAccount);

  useEffect(() => {
    if (firstLoading) {
      dispatch(getAccount({}));
      dispatch(changeFirstLoading())
    }
  }, []);

  useEffect(() => {
    const { pathname } = location;
    console.log("New path:", pathname);
    setCurrentPath(pathname);
  }, [location.pathname]);

  const isLogged = useSelector(state => state?.auth?.isLogged);
  useEffect(() => {
    if (!isLogged) {
      history.push('/');
    }
  }, [isLogged]);

  function handleClick(path) {
    history.push(path);
  }

  function handleLogout() {
    dispatch(logout());
  }

  const menu = (
    <Menu
      style={{
        opacity: 0.95, borderRadius: '5px',
        // backgroundColor: '#001529', 
      }}
    >
      <Menu.Item onClick={() => { history.push('/account') }} key='setting' icon={<UserOutlined />}>
        Thông tin tài khoản
      </Menu.Item>
      <Menu.Item onClick={() => { history.push('/change-password') }} key='change-password' icon={<LockOutlined />}>
        Đổi mật khẩu
      </Menu.Item>
      <Menu.Item onClick={handleLogout} key='logout' icon={<LogoutOutlined />}>
        Thoát
      </Menu.Item>
    </Menu>
  );

  return (
    <LayoutHeaderWrapper>
      {/* <Header style={{ backgroundColor: '#0B3E71', height: '4px' }}></Header> */}
      <Header>
        <Row align="middle">
          <Col span={5}>
            <div>
              <div style={{ paddingLeft: '10px', paddingBottom: '15px' }}>
                <img
                  className="main-logo"
                  src={Logo}
                  style={{ height: '50px' }}
                />
                <img
                  className="wiiquiz-logo"
                  src={Wiiquiz}
                  style={{ height: '35px', paddingLeft: '10px' }}
                />
              </div>
            </div>
            {/* <Divider type="vertical" style={{ height: '40px', marginLeft: '30px' }} /> */}
          </Col>
          <Col span={12}>
            <div>
              <Title
                level={3}
                style={{ color: '#241A58', paddingBottom: '3px' }}
              >
                {pageNames[getPageContent(currentPath)]}
              </Title>
              {/* <Menu
                mode="horizontal"
                theme="light"
                defaultSelectedKeys={["/home"]}
                activeKey={currentPath}
                selectedKeys={currentPath}
                style={{ lineHeight: '67px' }}
              >
                {headers.map(h => (
                  <Menu.Item style={{ paddingRight: "20px" }} key={h.to}>
                    <NavLink to={h.to}>{h.name}</NavLink>
                  </Menu.Item>
                ))}
              </Menu> */}


            </div>
          </Col>

          <Col
            sm={0}
            xl={7}
          // span={7}
          >
            <div className='avatar-container'>
              <div className='avatar-item'>
                <Divider type='vertical' style={{ height: '40px' }} />
                <Avatar 
                  className='avatar'
                  size={50} 
                  src={info.avatar} 
                />
              </div>
              <div className='avatar-item'>
                <p>{info.username}</p>
              </div>
              <div className='avatar-item'>
                <Dropdown overlay={menu} placement='bottomCenter' trigger={['click']}>
                  <a className='ant-dropdown-link'>
                    <HomeOutlined style={{ color: '#5C5E5D', fontSize: '25px' }} />
                  </a>
                </Dropdown>
              </div>
            </div>
          </Col>

        </Row>
      </Header>
    </LayoutHeaderWrapper>
  );
});
