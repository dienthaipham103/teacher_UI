import React from 'react';
import { PageHeader, Tabs, Descriptions, Row, Col, Typography, Card } from 'antd';
import { useDispatch } from 'react-redux';
import MainLogin from 'assets/images/main-logo.png';
import { HomepageWrapper } from './HomepageStyle';
import { CaretRightOutlined } from '@ant-design/icons';

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
    <HomepageWrapper>
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
      <Card>
        <p><CaretRightOutlined style={{ paddingRight: '10px' }} />
        WiiQuiz là nền tảng thi trực tuyến. WiiQuiz cung cấp đề thi và nền tảng thi trực tuyến cho học sinh các cấp, tạo điều kiện để học sinh Việt Nam tiếp cận các chương trình Quốc tế.
        </p>
        <p><CaretRightOutlined style={{ paddingRight: '10px' }} />
        Mọi chi tiết xin vui lòng liên hệ:
        </p>
        <p>Email: info@wiiquiz.com</p>
        <p>Facebook: www.facebook.com/wiiquiz</p>
      </Card>
    </HomepageWrapper>
  );
}
