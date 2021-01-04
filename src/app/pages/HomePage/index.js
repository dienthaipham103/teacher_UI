import React from 'react';
import { PageHeader, Tabs, Descriptions, Row, Col, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import MainLogin from 'assets/images/main-logo.png';

export default function HomePage() {
  const dispatch = useDispatch();
  // const dispatch = useDispatch();

  const { TabPane } = Tabs;
  const { Title } = Typography;

  const renderContent = (column = 2) => (
    <Descriptions size='default' column={column}>
      <Descriptions.Item>
        <Title level={2}>Chào mừng bạn đến WiiQuiz</Title>
      </Descriptions.Item>
    </Descriptions>
  );

  const Content = ({ children, extra }) => {
    return (
      <div className='content'>
        <div className='main'>{children}</div>
        <div className='extra'>{extra}</div>
      </div>
    );
  };
  return (
    <Row
      gutter={[16, 16]}
    >
      <Col
        sm={24}
        xl={12}
      >
        <PageHeader
          avatar={{ src: MainLogin }}
          className='site-page-header-responsive'
          title='Trang chủ'
          subTitle='Chúng tôi là '
        >
          <Content>{renderContent()}</Content>
        </PageHeader>
      </Col>
    </Row>
  );
}
