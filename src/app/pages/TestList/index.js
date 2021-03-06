import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, PageHeader, Card, Typography, Skeleton, Tabs, Select, Space, Modal, Table, Tag } from 'antd';
import { TestListWrapper } from './TestListStyle';

import { CardPractice } from 'app/components/CardPractice';
import { FolderOutlined, FileTextOutlined, UserOutlined, FieldTimeOutlined } from '@ant-design/icons';


import { useParams, useHistory } from "react-router-dom";

import {
    selectAllQuiz,
} from 'app/store/quiz';
import { selectAllStudent, selectKeyStatus } from 'app/store/student';

import {
    getListPraticeAPI,
    getListQuizAPI,
    getListExpiredQuizAPI
} from 'app/api/quiz';


function TestList() {
    const { Title } = Typography;
    const { TabPane } = Tabs;
    const { Option } = Select;

    const [practices, setPratices] = useState([]);
    const [tests, setTests] = useState([]);
    const [practicesLoading, setPraticesLoading] = useState(true);
    const [testLoading, setTestLoading] = useState(true);

    const [quizButtonClick, setQuizButtonClick] = useState(false);
    const [click, setClick] = useState(false);

    const [buttonLoading, setButtonLoading] = useState(false);
    const [hover, setHover] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState("");




    const allStudent = useSelector(selectAllStudent);

    // let dataSource;

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        getTests();
        getPratices();
    }, []);

    const getPratices = async () => {
        try {
            // setExpiredQuizzesLoading(true);
            let res = await getListPraticeAPI();
            if (res.code === 1) {
                setPraticesLoading(false);
                setPratices(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getTests = async () => {
        try {
            // setExpiredQuizzesLoading(true);
            let res = await getListQuizAPI({page: 1, limit: 10});
            if (res.code === 1) {
                setTestLoading(false);
                setTests(res.data);
                console.log("TESTS AVAILABLE: ", res);
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <TestListWrapper>
            <Title level={3}><FileTextOutlined style={{ marginRight: '10px' }} />Tất cả các đề đang làm </Title>

            <Skeleton
                // loading={getDonePracticeLoading}
                loading={false}
            >
                <Tabs
                // defaultActiveKey={status}
                >
                    <TabPane
                        // tab={<p>Đã làm ({doneNumber})</p>} 
                        tab="Đề thi"
                        key="1"
                    >
                        <Row gutter={[16, 16]}>
                            {tests.map(test => (
                                <Col sm={12} xl={8} style={{ paddingRight: 30 }} key={test._id}>
                                    <CardPractice
                                        quizOfStudent={null}
                                        status={null}
                                        quizId={test._id}
                                        studentId={null}
                                        quizButtonClick={null}
                                        title={
                                            <div style={{display: 'inline'}}>
                                              {test.name}
                                            </div>
                                          }
                                        imgUrl={test.images.cover}
                                        description={
                                            <div>
                                              {/* <div>{ReactHtmlParser(practice.description)}</div> */}
                                              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                                                <Tag color="blue" >
                                                  Đề {test.language === "VIETNAMESE" ? "Tiếng Việt" : "Tiếng Anh"}
                                                </Tag>
                                              </div>
                                            </div>
                                          }
                                        actions={[
                                            <Row align="middle">
                                                <Col span={7}>
                                                    <p className="quiz-info">
                                                        {/* <UserOutlined style={{paddingRight: '5px'}}/> */}
                                                        Lớp {test.grade}
                                                    </p>
                                                </Col>
                                                <Col span={7}>
                                                    <p className="quiz-info">
                                                        <FieldTimeOutlined style={{ paddingRight: '5px' }} />{test.duration} phút
                                                    </p>
                                                </Col>
                                                <Col span={10}>
                                                    <Button
                                                        className="active-button"
                                                        size="large"
                                                        onClick={() => {
                                                            setSelectedStudentId(test._id);
                                                            setClick(true);
                                                            setQuizButtonClick(true);
                                                            // setVisible(true);
                                                            history.push(`/preview-test/allow-edit/${test._id}`)
                                                        }}
                                                    >
                                                        Chi tiết
                                                    </Button>
                                                </Col>
                                            </Row>
                                        ]}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </TabPane>
                    <TabPane
                        // tab={<p>Đang làm ({doingNumber})</p>} 
                        tab="Đề luyện tập"
                        key="2"
                    >
                        <Row gutter={[16, 16]}>
                            {practices.map(practice => (
                                <Col sm={12} xl={8} style={{ paddingRight: 30 }} key={practice._id}>
                                    <CardPractice
                                        quizOfStudent={null}
                                        status={null}
                                        quizId={practice._id}
                                        studentId={null}
                                        quizButtonClick={null}
                                        title={
                                            <div style={{display: 'inline'}}>
                                              {practice.name}
                                            </div>
                                          }
                                        imgUrl={practice.images.cover}
                                        description={
                                            <div>
                                              {/* <div>{ReactHtmlParser(practice.description)}</div> */}
                                              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                                                <Tag color="blue" >
                                                  Đề {practice.language === "VIETNAMESE" ? "Tiếng Việt" : "Tiếng Anh"}
                                                </Tag>
                                              </div>
                                            </div>
                                          }
                                        actions={[
                                            <Row align="middle">
                                                <Col span={7}>
                                                    <p className="quiz-info">
                                                        {/* <UserOutlined style={{paddingRight: '5px'}}/> */}
                                                        Lớp {practice.grade}
                                                    </p>
                                                </Col>
                                                <Col span={7}>
                                                    <p className="quiz-info">
                                                        <FieldTimeOutlined style={{ paddingRight: '5px' }} />{practice.duration} phút
                                                    </p>
                                                </Col>
                                                <Col span={10}>
                                                    <Button
                                                        className="active-button"
                                                        size="large"
                                                        onClick={() => {
                                                            setSelectedStudentId(practice._id);
                                                            setClick(true);
                                                            setQuizButtonClick(true);
                                                            // setVisible(true);
                                                            history.push(`/preview-test/allow-edit/${practice._id}`)
                                                        }}
                                                    >
                                                        Chi tiết
                                                    </Button>
                                                </Col>
                                            </Row>
                                        ]}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </TabPane>

                </Tabs>
            </Skeleton>




        </TestListWrapper>
    );
}

export default TestList;