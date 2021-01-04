import React, { useEffect, useState } from 'react';
import {
  Collapse,
  Badge,
  Button,
  Row,
  Col,
  PageHeader,
  Divider,
  Skeleton,
  Statistic,
  Typography,
  Descriptions
} from 'antd';
import { FileTextOutlined, ClockCircleTwoTone } from '@ant-design/icons';

import { Link } from 'react-router-dom';

import { getListQuizOfChildAPI } from 'app/api/user';
import { CardQuiz } from 'app/components/CardQuiz';
import { isDoingTestDone } from 'app/utils/question';
import { ChildQuizWrapper } from './ChildQuizStyle';

import MainLogin from 'assets/images/main-logo.png';

const { Panel } = Collapse;
const { Ribbon } = Badge;
const { Countdown } = Statistic;

const ChildQuiz = () => {
  const { Title } = Typography;

  const [children, setChildren] = useState([]);
  const [activeKey, setActiveKey] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetListQuizOfChild = async () => {
    try {
      setLoading(true);
      let res = await getListQuizOfChildAPI();
      setChildren(res.data);
      setActiveKey(res.data.map(i => i._id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetListQuizOfChild();
  }, []);

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
    <ChildQuizWrapper>
      <PageHeader
        avatar={{ src: MainLogin }}
        className='site-page-header-responsive'
        title='Trang chủ'
        subTitle='Chúng tôi là '
      >
        <Content>{renderContent()}</Content>
      </PageHeader>

      <Divider />

      <Title level={3}>
        Tất cả bài thi của học viên
      </Title>

      <Skeleton active loading={loading}>
        <Collapse activeKey={activeKey} onChange={setActiveKey} ghost>
          {children.length > 0 &&
            children.map(child => (
              <Panel key={child._id} header={<h3> {child.fullname} </h3>}>
                <Row>
                  {child.quizs.map(({ quiz, score }) => (
                    <Col span={7} style={{ paddingRight: 30 }}>
                      <Ribbon
                        text={isDoingTestDone(score) ? 'Đã thi' : 'Chưa thi'}
                        key={quiz._id}
                        color={isDoingTestDone(score) ? 'blue' : 'red'}
                      >
                        <CardQuiz
                          title={quiz.name}
                          imgUrl={quiz.avatar}
                          actions={
                            !Boolean(isDoingTestDone(score))
                              ? [
                                <Link to={`/quiz/${quiz._id}/${child._id}`}>
                                  <Button
                                    style={{ borderRadius: '3px' }}
                                    icon={<FileTextOutlined />}
                                  >
                                    Làm bài {console.log(quiz.duration)}
                                  </Button>
                                </Link>,
                                <Countdown
                                  prefix={<ClockCircleTwoTone />}
                                  value={Date.now() + quiz.duration * 60}
                                />
                              ]
                              : [
                                <Link
                                  to={`/quiz/${quiz._id}/${child._id}/result`}
                                >
                                  <Button style={{ borderRadius: '3px' }}>Xem kết quả</Button>{' '}
                                </Link>
                              ]
                          }
                        />
                      </Ribbon>
                    </Col>
                  ))}
                </Row>
                <Divider />
              </Panel>
            ))}
        </Collapse>
      </Skeleton>
    </ChildQuizWrapper>
  );
};

export default ChildQuiz;
