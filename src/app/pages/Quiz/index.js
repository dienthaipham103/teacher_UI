import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, PageHeader, Card, Typography, Skeleton, Tabs, Select, Tag } from 'antd';
import { openModal } from 'app/store/modal';
import { QuizWrapper } from './QuizStyle';

import { CardQuiz } from 'app/components/CardQuiz';
import { getListQuizAPI } from 'app/api/quiz';
import { ASSGIN_CHILD_TO_TEST } from 'app/constants/modalName';
import { getChildOfQuizAPI } from 'app/api/user';
import { FolderOutlined, FileTextOutlined, UserOutlined, FieldTimeOutlined } from '@ant-design/icons';

import { onVisible, offVisible } from 'app/store/modal';
import AssignChildToTest from 'app/components/ModalManager/AssignChildToTest';
import { useHistory } from "react-router-dom";

import {
  selectAllQuiz,
} from 'app/store/quiz';

import {
  getListExpiredQuizAPI,
} from 'app/api/quiz';


function Quiz() {
  const { Title } = Typography;
  const { TabPane } = Tabs;
  const { Option } = Select;

  const history = useHistory();

  const [expiredQuizzes, setExpiredQuizzes] = useState([]);
  const [expiredQuizzesLoading, setExpiredQuizzesLoading] = useState(true);
  const [expiredNumber, setExpiredNumber] = useState(0);
  // const [quizNumber, setQuizNumber] = useState(0);

  const [quizButtonClick, setQuizButtonClick] = useState(false);

  const [selectedQuizId, setSelectedQuizId] = useState("");
  const getQuizStatus = useSelector(state => state.quizzes.status);
  const getNotRegisterChildStatus = useSelector(state => state.quizzes.status1);

  // const firstLoading = useSelector(state => state.student.firstLoading);
  const allQuiz = useSelector(selectAllQuiz);
  // setQuizNumber(allQuiz.length);
  console.log('allQuiz: ', allQuiz);

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getExpiredQuizzes();
  }, []);

  const getExpiredQuizzes = async () => {
    try {
      // setExpiredQuizzesLoading(true);
      console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
      let res = await getListExpiredQuizAPI();
      if (res.code === 1) {
        setExpiredQuizzesLoading(false);
        setExpiredQuizzes(res.data);
        setExpiredNumber(res.data.length);
        console.log('dataaaaannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn', res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChooseChild = async id => {
    // try {
    // let res = await getChildOfQuizAPI(id);
    // if (res) {
    // console.log('handleChooseChild ', res.data);
    setSelectedQuizId(id);
    // selectedQuizId = id;
    dispatch(onVisible());
    console.log('selectedQuizId', selectedQuizId);
    console.log('id', id)
  };

  return (
    <QuizWrapper>
      <Title level={3}><FileTextOutlined style={{ marginRight: '10px' }} />Tất cả các bài thi</Title>

      <Skeleton loading={(getQuizStatus !== 'succeeded') || (getNotRegisterChildStatus !== 'succeeded') || (expiredQuizzesLoading === true)}>
        <Tabs
          defaultActiveKey="1"
        // onChange={callback}
        >
          <TabPane tab={<p>Sắp diễn ra ({allQuiz.length})</p>} key="1">
            {/* <Skeleton active loading={(getQuizStatus !== 'succeeded') || (getNotRegisterChildStatus !== 'succeeded')}> */}
            <div>
              <Row gutter={[16, 16]}>
                {allQuiz.map(quiz => (
                  <Col sm={12} xl={8} style={{ paddingRight: 30 }} key={quiz._id}>
                    <CardQuiz
                      quizOfStudent={false}
                      status={null}
                      combinedId={null}
                      quizId={quiz._id}
                      quizButtonClick={quizButtonClick}
                      title={
                        < div style={{ display: 'inline' }}>
                          {quiz.name}
                        </div>
                      }
                      imgUrl={quiz.images.cover}
                      description={
                        <div>
                          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                            <Tag color="blue" >
                              Đề {quiz.language === "VIETNAMESE" ? "Tiếng Việt" : "Tiếng Anh"}
                            </Tag>
                          </div>
                        </div>

                      }
                      actions={[
                        <Row align="middle">
                          <Col span={7}>
                            <p className="quiz-info">
                              {/* <UserOutlined style={{paddingRight: '5px'}}/> */}
                              Lớp {quiz.grade}
                            </p>
                          </Col>
                          <Col span={7}>
                            <p className="quiz-info">
                              <FieldTimeOutlined style={{ paddingRight: '5px' }} />{quiz.duration} phút
                            </p>
                          </Col>
                          <Col span={10}>
                            <Button
                              className="not-preview-button"
                              size="large"
                              onMouseEnter={() => {
                                setQuizButtonClick(true);
                              }}
                              onMouseLeave={() => {
                                setQuizButtonClick(false);
                              }}
                              // onClick={() => handleChooseChild(quiz._id)}
                            >
                              Xem đề
                          </Button>
                          </Col>
                        </Row>
                      ]}
                    />
                    {/* {<AssignChildToTest
                  quizId={quiz._id}
                >
                </AssignChildToTest> && (selectedQuizId === quiz._id)} */}
                    {/* <AssignChildToTest quizId={quiz._id}></AssignChildToTest> */}
                  </Col>
                ))}
              </Row>
            </div>
            <AssignChildToTest quizId={selectedQuizId}></AssignChildToTest>
            {/* </Skeleton> */}
          </TabPane>
          <TabPane tab={<p>Đã diễn ra ({expiredNumber})</p>} key="2">
            <Skeleton active loading={expiredQuizzesLoading}>
              <div>
                <Row gutter={[16, 16]}>
                  {expiredQuizzes.map(quiz => (
                    <Col sm={12} xl={8} style={{ paddingRight: 30 }} key={quiz._id}>
                      <CardQuiz
                        quizOfStudent={false}
                        status={null}
                        combinedId={null}
                        quizId={quiz._id}
                        quizButtonClick={quizButtonClick}
                        title={
                          < div style={{ display: 'inline' }}>
                            {quiz.name}
                          </div>
                        }
                        imgUrl={quiz.images.cover}
                        description={
                          <div>
                            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                              <Tag color="blue" >
                                Đề {quiz.language === "VIETNAMESE" ? "Tiếng Việt" : "Tiếng Anh"}
                              </Tag>
                            </div>
                          </div>
  
                        }
                        actions={[
                          <Row align="middle">
                            <Col span={7}>
                              <p className="quiz-info">
                                {/* <UserOutlined style={{paddingRight: '5px'}}/> */}
                              Lớp {quiz.grade}
                              </p>
                            </Col>
                            <Col span={7}>
                              <p className="quiz-info">
                                <FieldTimeOutlined style={{ paddingRight: '5px' }} />{quiz.duration} phút
                            </p>
                            </Col>
                            <Col span={10}>
                              <Button
                                className="preview-button"
                                size="large"
                                onMouseEnter={() => {
                                  setQuizButtonClick(true);
                                }}
                                onMouseLeave={() => {
                                  setQuizButtonClick(false);
                                }}
                                onClick={() => history.push(`/preview-test/not-allow-edit/${quiz._id}`)}
                              >
                                Xem đề
                          </Button>
                            </Col>
                          </Row>
                        ]}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            </Skeleton>
          </TabPane>
        </Tabs>
      </Skeleton>





    </QuizWrapper>
  );
}

export default Quiz;