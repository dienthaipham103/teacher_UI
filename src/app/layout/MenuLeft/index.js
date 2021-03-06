import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// import { MenuLefttWrapper } from "./MenuLeftStyle";
import { NavLink } from 'react-router-dom';
import { Link, withRouter } from 'react-router-dom';
import { MenuLeftWrapper } from './MenuLeftStyle';

import {
  BarChartOutlined,
  FormOutlined,
  RiseOutlined,
  ContactsOutlined,
  HomeOutlined,
  FileAddOutlined,
  SnippetsOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';

import { changeStudentPracticeStatus } from "app/store/student";
import { getAllStudent } from 'app/store/student';
import { getQuizzes, getNotRegisterChild } from 'app/store/quiz';
import { selectAllStudent, selectKeyStatus } from 'app/store/student';

const { SubMenu } = Menu;
const { Sider } = Layout;

export default withRouter(function MenuLeft({ location }) {
  const dispatch = useDispatch();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    dispatch(getAllStudent({}));
    dispatch(getQuizzes({}));
    dispatch(getNotRegisterChild({}));
  }, []);

  useEffect(() => {
    const { pathname } = location;
    console.log('New path:', pathname);
    setCurrentPath(pathname);
  }, [location.pathname]);

  // const allStudent = useSelector(selectAllStudent);
  // const renderStudentList = allStudent.map(student => (
  //   <Menu.Item key={student._id}>
  //     <NavLink to={`/student-profile/${student._id}`}>
  //       {student.fullname}
  //     </NavLink>
  //   </Menu.Item>
  // ));

  return (
    <MenuLeftWrapper>
      <Sider
        width={220}
        className='site-layout-background'
        // collapsible
        breakpoint='xs'
        // collapsedWidth='0'
        style={{
          height: '100vh', position: 'fixed', left: 0,
          overflow: 'auto'
        }}
      >
        <Menu
          mode='inline'
          theme="dark"
          // selectedKeys='none'
          defaultSelectedKeys={['/student-list']}
          activeKey={currentPath}
          selectedKeys={currentPath}
          // defaultOpenKeys={["sub1"]}
          // theme='dark'
          style={{ height: '100%' }}
        >
        
          <Menu.Item key='/home' icon={<HomeOutlined style={{ fontSize: '16px'}}/>}>
            <NavLink 
              to={'/home'}
            >
              Trang chủ
            </NavLink>
          </Menu.Item>
          
          <Menu.Item key='/quiz' icon={<FormOutlined style={{ fontSize: '16px'}}/>}>
            <NavLink 
              to={'/quiz'}
            >
              Đề thi
            </NavLink>
          </Menu.Item>

          <Menu.Item key='/practice' icon={<RiseOutlined style={{ fontSize: '16px'}}/>}>
            <NavLink 
              to={'/practice'}
            >
              Đề luyện tập
            </NavLink>
          </Menu.Item>

          {/* <Menu.Item key='/student-list' icon={<SolutionOutlined style={{ fontSize: '16px'}}/>}>
            <NavLink 
              to={'/student-list'}
              onClick={()=>{dispatch(changeStudentPracticeStatus('1'));}}
            >
              Danh sách học sinh
            </NavLink>
          </Menu.Item> */}

          {/* <Menu.Item key='/add-student' icon={<UserAddOutlined style={{ fontSize: '16px'}}/>}>
            <NavLink 
              to={'/add-student'}
            >
              Thêm học sinh
            </NavLink>
          </Menu.Item> */}

          <Menu.Item key='/create-test' icon={<FileAddOutlined style={{ fontSize: '16px'}}/>}>
            <NavLink to={'/create-test'}>Làm đề</NavLink>
          </Menu.Item>

          <Menu.Item key='/test-list' icon={<SnippetsOutlined style={{ fontSize: '16px'}}/>}>
            <NavLink to={'/test-list'}>Đề đang làm</NavLink>
          </Menu.Item>

          <Menu.Item key='/test-track' icon={<BarChartOutlined style={{ fontSize: '16px'}}/>}>
            <NavLink to={'/test-track'}>Theo dõi đề</NavLink>
          </Menu.Item>

          <Menu.Item key='/contact' icon={<ContactsOutlined style={{ fontSize: '16px'}}/>}>
            <NavLink to={'/contact'}>Liên hệ</NavLink>
          </Menu.Item>

          <Menu.Item key='/instruction' icon={<UnorderedListOutlined style={{ fontSize: '16px'}}/>}>
            <NavLink to={'/instruction'}>Hướng dẫn</NavLink>
          </Menu.Item>
         
        
        </Menu>
      </Sider>
    </MenuLeftWrapper>
  );
});
