import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import { StudentPracticeWrapper, ModalWrapper } from "./StudentPracticeStyle";
import { Button, Modal } from 'antd';
import { Card, Spin } from 'antd';
import { notification, Popconfirm, message, Avatar, Typography, Col, Row, Space, Tabs, Skeleton } from "antd";
import { CardQuiz } from 'app/components/CardQuiz';
import { CardPractice } from 'app/components/CardPractice';
import { Link } from 'react-router-dom';

import { deleteStudentAPI } from 'app/api/user';
import { deleteStudent } from 'app/store/student';
import { updateNotRegisterByRemoveStudent } from 'app/store/quiz';
import { LineChartOutlined, CaretRightOutlined, SendOutlined, UserOutlined, HomeOutlined, GlobalOutlined, SearchOutlined, HistoryOutlined, FieldTimeOutlined } from '@ant-design/icons';
import Trash from "assets/images/trash.png";

import {
    getInprocessPracticeStudentAPI,
    getDonePracticeStudentAPI,
} from 'app/api/user';
import { changeStudentPracticeStatus } from "app/store/student";
import { resetPracticeAPI } from 'app/api/doTest';


function StudentPractice() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { Title, Text } = Typography;
    const { TabPane } = Tabs;

    const status = useSelector(state => state.student.studentPracticeStatus);

    const [inprocessPractices, setInprocessPractices] = useState([]);
    const [donePractices, setDonePractices] = useState([]);
    const [doneNumber, setDoneNumeber] = useState(null);
    const [doingNumber, setDoingNumeber] = useState(null);

    const { studentId } = useParams();

    const [getInprocessPracticeLoading, setGetInprocessPracticeLoading] = useState(false);
    const [getDonePracticeLoading, setGetDonePracticeLoading] = useState(false);

    const [quizButtonClick, setQuizButtonClick] = useState(false);



    useEffect(() => {
        getInprocessPractices(studentId);
        getDonePractices(studentId);
    }, []);


    const getInprocessPractices = async id => {
        try {
            setGetInprocessPracticeLoading(true);
            let res = await getInprocessPracticeStudentAPI({ id: id });
            setGetInprocessPracticeLoading(false);
            // setLoading(false);
            if (res.code === 1) {
                // setGetInprocessQuizLoading(false);
                setInprocessPractices(res.data);
                setDoingNumeber(res.data.length);
                console.log('quizzes: ++++++++', inprocessPractices);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getDonePractices = async id => {
        try {
            setGetDonePracticeLoading(true);
            let res = await getDonePracticeStudentAPI({ id: id });
            setGetDonePracticeLoading(false);
            // setLoading(false);
            if (res.code === 1) {
                // setGetCompleteQuizLoading(false);
                setDonePractices(res.data);
                setDoneNumeber(res.data.length);
                console.log('quizzes: ++++++++', donePractices);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [deleteLoading, setDeleteLoading] = useState(false);


    const [hover, setHover] = useState(false);
    // modal for delete feature
    const [visible, setVisible] = useState(false);

    const info = useSelector(state =>
        state.student.studentList.find(oneStudent => oneStudent._id === studentId)
    )

    const getInfo = () => {
        if (info == undefined) {
            return ["", ""]
        }

        let label = "";
        for (let i = info.fullname.length - 1; i--; i >= 0) {
            if (info.fullname[i] === " ") {
                label = info.fullname[i + 1]
                break;
            }
        }

        if (label === "") {
            label = info.fullname[0]
        }

        return [label, info.fullname]
    }


    return (
        <StudentPracticeWrapper>
            <div className="container">
                <div className="item">
                    <Avatar style={{ color: '#272755', backgroundColor: '#a5dff8' }} size={64}>
                        {getInfo()[0]}
                    </Avatar>
                </div>
                <div className="item">
                    <Title level={3}>
                        {getInfo()[1]}
                    </Title>
                </div>
            </div>

            <Skeleton loading={getDonePracticeLoading}>
                <Tabs
                    defaultActiveKey={status}
                // onChange={()=>{
                //     console.log('KKKKKKKKKKKKKKKKKKKKK: ')
                // }}
                >
                    <TabPane tab={<p>Đã làm ({doneNumber})</p>} key="1">
                        <Row gutter={[16, 16]}>
                            {donePractices.map(practice => (
                                <Col sm={12} xl={8} style={{ paddingRight: 30 }} key={practice.quiz._id}>
                                    <CardPractice
                                        quizOfStudent={true}
                                        status={"done"}
                                        quizId={practice.quiz._id}
                                        studentId={studentId}
                                        quizButtonClick={quizButtonClick}
                                        title={practice.quiz?.name}
                                        imgUrl={practice.quiz?.images.cover}
                                        description={
                                            practice.quiz?.description.length < 60 ?
                                                <div>
                                                    <p style={{ padding: '0px', margin: '0px' }}>
                                                        {practice.quiz?.description}
                                                    </p>
                                                    <span style={{ color: '#fff' }}>{'.'.repeat(60 - practice.quiz?.description.length)}</span>
                                                </div>
                                                :
                                                <p>
                                                    {practice.quiz?.description.substring(0, 60) + '...'}
                                                </p>

                                        }

                                        actions={[
                                            <Row align="middle">
                                                <Col span={12}>
                                                    <Link
                                                        style={{ fontSize: '16px', fontWeight: '900' }}
                                                        onMouseEnter={() => {
                                                            setQuizButtonClick(true);
                                                        }}
                                                        onMouseLeave={() => {
                                                            setQuizButtonClick(false);
                                                        }}
                                                        to={`/practice-history/${studentId}/${practice._id}`}
                                                        onClick={
                                                            () => {
                                                                dispatch(changeStudentPracticeStatus('1'));
                                                            }
                                                        }
                                                    >
                                                        <LineChartOutlined style={{ marginRight: '10px' }} />Xem kết quả
                                                    </Link>
                                                </Col>
                                                <Col span={12}>
                                                    <Button
                                                        style={{ borderRadius: '5px' }}
                                                        size="large"
                                                        onMouseEnter={() => {
                                                            setQuizButtonClick(true);
                                                        }}
                                                        onMouseLeave={() => {
                                                            setQuizButtonClick(false);
                                                        }}
                                                        onClick={async () => {
                                                            // history.push(`/student-quiz/do-test/${quiz._id}`)
                                                            // await resetPracticeAPI({ id: practice._id });
                                                            dispatch(changeStudentPracticeStatus('1'));
                                                            history.push(`/student-practice/done/${practice.quiz._id}/${studentId}`);
                                                        }}
                                                    >
                                                        Làm lại
                                                </Button>
                                                </Col>
                                            </Row>
                                        ]}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </TabPane>
                    <TabPane tab={<p>Đang làm ({doingNumber})</p>} key="2">
                        <Row gutter={[16, 16]}>
                            {inprocessPractices.map(practice => (
                                <Col sm={12} xl={8} style={{ paddingRight: 30 }} key={practice.quiz._id}>
                                    <CardPractice
                                        quizOfStudent={true}
                                        status={"in-process"}
                                        quizId={practice.quiz._id}
                                        studentId={studentId}
                                        quizButtonClick={quizButtonClick}
                                        title={practice.quiz?.name}
                                        imgUrl={practice.quiz?.images.cover}
                                        description={
                                            practice.quiz?.description.length < 60 ?
                                                <div>
                                                    <p style={{ padding: '0px', margin: '0px' }}>
                                                        {practice.quiz?.description}
                                                    </p>
                                                    <span style={{ color: '#fff' }}>{'.'.repeat(60 - practice.quiz?.description.length)}</span>
                                                </div>
                                                :
                                                <p>
                                                    {practice.quiz?.description.substring(0, 60) + '...'}
                                                </p>

                                        }
                                        actions={[
                                            <Row align="middle">
                                                <Col span={7}>
                                                    <p className="quiz-info">
                                                        {/* <UserOutlined style={{paddingRight: '5px'}}/> */}
                                                  Lớp {practice.quiz?.grade}
                                                    </p>
                                                </Col>
                                                <Col span={7}>
                                                    <p className="quiz-info">
                                                        <FieldTimeOutlined style={{ paddingRight: '5px' }} />{practice.quiz?.duration} phút
                                                </p>
                                                </Col>
                                                <Col span={10}>
                                                    <Button
                                                        style={{ borderRadius: '5px' }}
                                                        size="large"
                                                        onMouseEnter={() => {
                                                            setQuizButtonClick(true);
                                                        }}
                                                        onMouseLeave={() => {
                                                            setQuizButtonClick(false);
                                                        }}
                                                        onClick={() => {
                                                            // dispatch(createOneTest({combinedId: quiz._id}));
                                                            history.push(`/student-practice/do-practice/${practice._id}`);
                                                        }}
                                                    >
                                                        Tiếp tục
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



        </StudentPracticeWrapper>
    )
}

export default StudentPractice;
