import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import { StudentQuizWrapper, ModalWrapper } from "./StudentQuizStyle";
import { Button, Modal } from 'antd';
import { Card, Spin } from 'antd';
import { notification, Popconfirm, message, Avatar, Typography, Col, Row, Space, Tabs, Skeleton } from "antd";
import { CardQuiz } from 'app/components/CardQuiz';

import { deleteStudentAPI } from 'app/api/user';
import { deleteStudent } from 'app/store/student';
import { updateNotRegisterByRemoveStudent } from 'app/store/quiz';
import { CaretRightOutlined, SendOutlined, UserOutlined, HomeOutlined, GlobalOutlined, SearchOutlined, HistoryOutlined, FieldTimeOutlined } from '@ant-design/icons';
import Trash from "assets/images/trash.png";

import {
    getRegisterQuizStudentAPI,
    getInprocessQuizStudentAPI,
    getCompleteQuizStudentAPI,
    getSubmitQuizStudentAPI
} from 'app/api/user';
import { createOneTest } from 'app/store/doTest';


function StudentQuiz() {
    const { Title, Text } = Typography;
    const { TabPane } = Tabs;

    const [quizzes, setQuizzes] = useState([]);
    const [inprocessQuizzes, setInprocessQuizzes] = useState([]);
    const [completeQuizzes, setCompleteQuizzes] = useState([]);
    const [submitQuizzes, setSubmitQuizzes] = useState([]);

    const { studentId } = useParams();

    const [getRegisterQuizLoading, setGetRegisterQuizLoading] = useState(false);
    const [getInprocessQuizLoading, setGetInprocessQuizLoading] = useState(false);
    const [getCompleteQuizLoading, setGetCompleteQuizLoading] = useState(false);
    const [getSubmitQuizLoading, setGetSubmitQuizLoading] = useState(false);
    const [registerNumber, setRegisterNumber] = useState(0);
    const [doingNumber, setDoingNumber] = useState(0);
    const [completeNumber, setCompleteNumber] = useState(0);
    const [submitNumber, setSubmitNumber] = useState(0);

    const [quizButtonClick, setQuizButtonClick] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        getQuizzes(studentId);
        getInprocessQuizzes(studentId);
        getCompletQuizzes(studentId);
        getSubmitQuizzes(studentId);
    }, []);

    const getQuizzes = async id => {
        try {
            setGetRegisterQuizLoading(true);
            let res = await getRegisterQuizStudentAPI({ id: id });
            setGetRegisterQuizLoading(false);
            // setLoading(false);
            if (res.data && res.data.length > 0) {
                // setGetRegisterQuizLoading(false);
                setQuizzes(res.data);
                setRegisterNumber(res.data.length);
                console.log('quizzes: ++++++++', quizzes);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getInprocessQuizzes = async id => {
        try {
            setGetInprocessQuizLoading(true);
            let res = await getInprocessQuizStudentAPI({ id: id });
            setGetInprocessQuizLoading(false);
            // setLoading(false);
            if (res.data && res.data.length > 0) {
                // setGetInprocessQuizLoading(false);
                setInprocessQuizzes(res.data);
                setDoingNumber(res.data.length);
                console.log('quizzes: ++++++++', quizzes);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCompletQuizzes = async id => {
        try {
            setGetCompleteQuizLoading(true);
            let res = await getCompleteQuizStudentAPI({ id: id });
            setGetCompleteQuizLoading(false);
            // setLoading(false);
            if (res.data && res.data.length > 0) {
                // setGetCompleteQuizLoading(false);
                setCompleteQuizzes(res.data);
                setCompleteNumber(res.data.length);
                console.log('quizzes: ++++++++', quizzes);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getSubmitQuizzes = async id => {
        try {
            setGetSubmitQuizLoading(true);
            let res = await getSubmitQuizStudentAPI({ id: id });
            setGetSubmitQuizLoading(false);
            // setLoading(false);
            if (res.data && res.data.length > 0) {
                // setGetCompleteQuizLoading(false);
                setSubmitQuizzes(res.data);
                setSubmitNumber(res.data.length);
                console.log('quizzes: ++++++++', quizzes);
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
        <StudentQuizWrapper>
            {/* <Text style={{ paddingBottom: '20', color: '#1273EB' }} type="secondary">Bài thi của học viên</Text> */}
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

            <Skeleton loading={getRegisterQuizLoading}>
                <Tabs
                    defaultActiveKey="1"
                // onChange={callback}
                >
                    <TabPane tab={<p>Đã đăng ký ({registerNumber})</p>} key="1">
                        {/* <Skeleton loading={getRegisterQuizLoading}> */}
                        <Row gutter={[16, 16]}>
                            {quizzes.map(quiz => (
                                <Col sm={12} xl={8} style={{ paddingRight: 30 }} key={quiz.quiz._id}>
                                    <CardQuiz
                                        quizOfStudent={true}
                                        status={"registered"}
                                        combinedId={quiz._id}
                                        quizId={quiz.quiz._id}
                                        quizButtonClick={quizButtonClick}
                                        title={quiz.quiz?.name}
                                        imgUrl={quiz.quiz?.images.cover}
                                        description={
                                            quiz.quiz?.description.length < 60 ?
                                                <div>
                                                    <p style={{ padding: '0px', margin: '0px' }}>
                                                        {quiz.quiz?.description}
                                                    </p>
                                                    <span style={{ color: '#fff' }}>{'.'.repeat(60 - quiz.quiz?.description.length)}</span>
                                                </div>
                                                :
                                                <p>
                                                    {quiz.quiz?.description.substring(0, 60) + '...'}
                                                </p>

                                        }
                                        actions={[
                                            <Row align="middle">
                                                <Col span={7}>
                                                    <p className="quiz-info">
                                                        {/* <UserOutlined style={{paddingRight: '5px'}}/> */}
                                                  Lớp {quiz.quiz?.grade}
                                                    </p>
                                                </Col>
                                                <Col span={7}>
                                                    <p className="quiz-info">
                                                        <FieldTimeOutlined style={{ paddingRight: '5px' }} />{quiz.quiz?.duration} phút
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
                                                            history.push(`/student-quiz/registered/${quiz._id}/${quiz.quiz._id}`)
                                                        }}
                                                    >
                                                        Vào thi
                                                    </Button>
                                                </Col>
                                            </Row>
                                        ]}
                                    />

                                </Col>
                            ))}
                        </Row>
                        {/* </Skeleton> */}
                    </TabPane>
                    <TabPane tab={<p>Đang thi ({doingNumber})</p>} key="2">
                        <Row gutter={[16, 16]}>
                            {inprocessQuizzes.map(quiz => (
                                <Col sm={12} xl={8} style={{ paddingRight: 30 }} key={quiz.quiz._id}>
                                    <CardQuiz
                                        quizOfStudent={true}
                                        status={"in-process"}
                                        combinedId={quiz._id}
                                        quizId={quiz.quiz._id}
                                        quizButtonClick={quizButtonClick}
                                        title={quiz.quiz?.name}
                                        imgUrl={quiz.quiz?.images.cover}
                                        description={
                                            quiz.quiz?.description.length < 60 ?
                                                <div>
                                                    <p style={{ padding: '0px', margin: '0px' }}>
                                                        {quiz.quiz?.description}
                                                    </p>
                                                    <span style={{ color: '#fff' }}>{'.'.repeat(60 - quiz.quiz?.description.length)}</span>
                                                </div>
                                                :
                                                <p>
                                                    {quiz.quiz?.description.substring(0, 60) + '...'}
                                                </p>

                                        }
                                        // actions={[
                                        //     <Button
                                        //         style={{ borderRadius: '5px' }}
                                        //         onClick={() => {
                                        //             history.push(`/student-quiz/do-test/${quiz._id}`)
                                        //         }}
                                        //     >
                                        //         Tiếp tục
                                        //     </Button>
                                        // ]}
                                        actions={[
                                            <Row align="middle">
                                                <Col span={7}>
                                                    <p className="quiz-info">
                                                        Lớp {quiz.quiz?.grade}
                                                    </p>
                                                </Col>
                                                <Col span={7}>
                                                    <p className="quiz-info">
                                                        <FieldTimeOutlined style={{ paddingRight: '5px' }} />{quiz.quiz?.duration} phút
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
                                                            history.push(`/student-quiz/do-test/${quiz._id}`)
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
                    <TabPane tab={<p>Đã nộp ({submitNumber})</p>} key="3">
                        <Row gutter={[16, 16]}>
                            {submitQuizzes.map(quiz => (
                                <Col sm={12} xl={8} style={{ paddingRight: 30 }} key={quiz.quiz._id}>
                                    <CardQuiz
                                        quizOfStudent={true}
                                        status={"submitted"}
                                        combinedId={quiz._id}
                                        quizId={quiz.quiz._id}
                                        quizButtonClick={quizButtonClick}
                                        title={quiz.quiz?.name}
                                        imgUrl={quiz.quiz?.images.cover}
                                        description={
                                            quiz.quiz?.description.length < 60 ?
                                                <div>
                                                    <p style={{ padding: '0px', margin: '0px' }}>
                                                        {quiz.quiz?.description}
                                                    </p>
                                                    <span style={{ color: '#fff' }}>{'.'.repeat(60 - quiz.quiz?.description.length)}</span>
                                                </div>
                                                :
                                                <p>
                                                    {quiz.quiz?.description.substring(0, 60) + '...'}
                                                </p>

                                        }
                                        actions={[
                                            <Row align="middle">
                                                <Col span={6}>
                                                    <p className="quiz-info">
                                                        {/* <UserOutlined style={{paddingRight: '5px'}}/> */}
                                              Lớp {quiz.quiz?.grade}
                                                    </p>
                                                </Col>
                                                <Col span={6}>
                                                    <p className="quiz-info">
                                                        <FieldTimeOutlined style={{ paddingRight: '5px' }} />{quiz.quiz?.duration} phút
                                            </p>
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
                                                        onClick={() => {
                                                            history.push(`/student-quiz/do-test/${quiz._id}`)
                                                        }}
                                                    >
                                                        Xem kết quả
                                                </Button>
                                                </Col>
                                            </Row>
                                        ]}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </TabPane>
                    <TabPane tab={<p>Đã chấm ({completeNumber})</p>} key="4">
                        <Row gutter={[16, 16]}>
                            {completeQuizzes.map(quiz => (
                                <Col sm={12} xl={8} style={{ paddingRight: 30 }} key={quiz.quiz._id}>
                                    <CardQuiz
                                        quizOfStudent={true}
                                        status={"completed"}
                                        combinedId={quiz._id}
                                        quizId={quiz.quiz._id}
                                        quizButtonClick={quizButtonClick}
                                        title={quiz.quiz?.name}
                                        imgUrl={quiz.quiz?.images.cover}
                                        description={
                                            quiz.quiz?.description.length < 60 ?
                                                <div>
                                                    <p style={{ padding: '0px', margin: '0px' }}>
                                                        {quiz.quiz?.description}
                                                    </p>
                                                    <span style={{ color: '#fff' }}>{'.'.repeat(60 - quiz.quiz?.description.length)}</span>
                                                </div>
                                                :
                                                <p>
                                                    {quiz.quiz?.description.substring(0, 60) + '...'}
                                                </p>

                                        }
                                        // actions={[
                                        //     <Button
                                        //         style={{ borderRadius: '5px' }}
                                        //         onClick={() => {
                                        //             // dispatch(createOneTest({combinedId: quiz._id}));
                                        //             history.push(`/student-quiz/do-test/${quiz._id}`)
                                        //         }}
                                        //     >
                                        //         Xem kết quả
                                        //     </Button>
                                        // ]}
                                        actions={[
                                            <Row align="middle">
                                                <Col span={6}>
                                                    <p className="quiz-info">
                                                        {/* <UserOutlined style={{paddingRight: '5px'}}/> */}
                                              Lớp {quiz.quiz?.grade}
                                                    </p>
                                                </Col>
                                                <Col span={6}>
                                                    <p className="quiz-info">
                                                        <FieldTimeOutlined style={{ paddingRight: '5px' }} />{quiz.quiz?.duration} phút
                                            </p>
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
                                                        onClick={() => {
                                                            // dispatch(createOneTest({combinedId: quiz._id}));
                                                            history.push(`/student-quiz/do-test/${quiz._id}`)
                                                        }}
                                                    >
                                                        Xem kết quả
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




        </StudentQuizWrapper>
    )
}

export default StudentQuiz;
