import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import { OverviewOnePracticeWrapper, ModalWrapper } from "./OverviewOnePracticeStyle";
import { Button, Modal, Statistic } from 'antd';
import { Card, Spin } from 'antd';
import { Badge, Affix, notification, Popconfirm, message, Avatar, Typography, Col, Row, Space, Tabs, Checkbox, Radio, Pagination, Progress } from "antd";
import { CardQuiz } from 'app/components/CardQuiz';

import { ClockCircleTwoTone, FieldTimeOutlined, PercentageOutlined, CheckOutlined } from '@ant-design/icons';

import { deleteStudentAPI } from 'app/api/user';
import { deleteStudent } from 'app/store/student';
import { updateNotRegisterByRemoveStudent } from 'app/store/quiz';
import { CaretRightOutlined, SendOutlined, UserOutlined, HomeOutlined, GlobalOutlined, SearchOutlined, HistoryOutlined, LeftCircleOutlined, RightCircleOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import Trash from "assets/images/trash.png";
import Q1 from "assets/images/q1.png";
import Q2 from "assets/images/q2.png";

// import CountDown from 'ant-design-pro/lib/CountDown';

import {
    getPracticeRemainTimeAPI,
    updatePracticeOneAnswerAPI,
    submitPracticeAPI,
    getPracticeAPI,
} from 'app/api/doTest';

import {
    getPracticeHistoryAPI
} from 'app/api/quiz';

import { changeCurrent, increaseCurrent, decreaseCurrent, updateAnswer, finishTest, getTest } from 'app/store/doTest';

import { FormOutlined } from '@ant-design/icons';


function OverviewOnePractice() {
    const { Countdown } = Statistic;
    const { Title, Text } = Typography;
    const { TabPane } = Tabs;


    const {  studentId, combinedId, practiceId } = useParams();
    console.log('QUIZ', combinedId);

    const dispatch = useDispatch();
    const history = useHistory();

    // const [reload, setReload] = useState(0);

    const [quizName, setQuizName] = useState("");
    const [total, setTotal] = useState(0);
    const [studentName, setStudentName] = useState("");
    // const [studentId, setStudentId] = useState("");
    const [grade, setGrade] = useState("");

    const [submitTime, setSubmitTime] = useState(0);

    const [duration, setDuration] = useState(0);
    const [start, setStart] = useState(0);
    
    const [answers, setAnswers] = useState([[], []]);
    // const [answers, setAnswers] = useState([{answer: []}]);

    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);//////
    const [score, setScore] = useState(0);

    const [loading, setLoading] = useState(false);

    // useEffect(()=>{
    //     dispatch(createOneTest({combinedId: combinedId}));
    //     console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
    // }, [])

    const getOverview = async id => {
        try {
            setLoading(true);
            let res = await getPracticeHistoryAPI({ combinedId: id });
            // setLoading(false);
            if (res.code === 1) {
                setDuration(res.data.quiz.duration);
                setQuizName(res.data.quiz.name);
                setTotal(res.data.quiz.numberOfQuestions);
                // setTotal(1000);
                setStudentName(res.data.user.fullname);
                setGrade(res.data.quiz.grade);

                setStart(res.data.practice[parseInt(practiceId) - 1].startDate);
                setSubmitTime(res.data.practice[parseInt(practiceId) - 1].submitDate);
                setAnswers(res.data.practice[parseInt(practiceId) - 1].userAnswer);
               
                // setTotal(res.data.quiz.numberOfQuestions);
                // setTotal(20);
                setScore(res.data.practice[parseInt(practiceId) - 1].score);
                

                setNumberOfCorrectAnswers(res.data.practice[parseInt(practiceId) - 1].numberOfCorrectAnswers);

                console.log('quizzes: ++++++++', res.data.practice[parseInt(practiceId) - 1].startDate);
                console.log('quizzes: ++++++++', res.data.practice[parseInt(practiceId) - 1].submitDate);
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // studentDoPractice();
        getOverview(combinedId);
        // return () => { };
    }, []);

    const showTime = (dateObject) => {
        const dd = dateObject.getDate();
        const mm = dateObject.getMonth() + 1;
        const yyyy = dateObject.getFullYear();
        const h = dateObject.getHours();
        const m = dateObject.getMinutes();
        const s = dateObject.getSeconds();
        return h + " giờ " + m + " phút " + s + " giây" + ",  " + dd + "-" + mm + "-" + yyyy
    }

    const countFinish = (answers) => {
        let count = 0;
        for (let x of answers) {
            if (x.length > 0) {
                count += 1
            }
        }
        return count;
    }

    return (
        <OverviewOnePracticeWrapper>
            {
                loading === false ?
                    <div>

                        <div style={{ marginBottom: '0px', marginTop: '15px' }}>
                            <p
                                style={{
                                    backgroundColor: 'rgba(28, 28, 80, 0.85)',
                                    borderRadius: '5px',
                                    color: '#fff',
                                    fontSize: '18px',
                                    paddingLeft: '20px',
                                    paddingTop: '10px',
                                    paddingBottom: '10px',
                                    boxShadow: '3px 3px 3px 0px #B0B0B5'
                                }}
                            >
                                <Row>
                                    <Col span={12}>
                                        <p className="quiz-info">
                                            Đề: {quizName}
                                        </p>
                                        <Row>
                                            <Col span={12}>
                                                <p className="quiz-info">
                                                    Thời gian: {duration} phút
                                                        </p>
                                            </Col>
                                            <Col span={12}>
                                                <p className="quiz-info">
                                                    Số câu: {total}
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={12}>
                                        <p className="quiz-info">
                                            Học sinh: {studentName} ({studentId})
                                                </p>
                                        <p className="quiz-info">
                                            Lớp: {grade}
                                        </p>
                                    </Col>
                                </Row>
                            </p>
                        </div>


                        <div>
                            <Badge.Ribbon
                                text={<p style={{ fontSize: '16px' }}>Điểm: {score}/100</p>}
                                color="blue"
                            >
                                <Card
                                    className="finish-card"
                                    style={{ marginTop: '25px' }}
                                >
                                    <p
                                    >
                                        <span style={{ fontWeight: '900' }}>Đã nộp bài thi lúc: </span>
                                        <span style={{ color: '#1273EB' }}>{showTime(new Date(submitTime))}</span>
                                    </p>
                                    <p><CheckOutlined style={{ marginRight: '6px', color: 'blue' }} />Số câu đã làm: {countFinish(answers)}/{total}</p>
                                    <Progress
                                        percent={(countFinish(answers) / total * 100).toFixed(1)}
                                        trailColor='#DDDDE2'
                                        style={{ width: '40%', marginBottom: '15px' }}
                                        size="small"
                                    />
                                    <p><CheckOutlined style={{ marginRight: '6px', color: 'green' }} />Số câu làm đúng: {numberOfCorrectAnswers}/{total}</p>
                                    <Progress
                                        percent={(numberOfCorrectAnswers / total * 100).toFixed(1)}
                                        strokeColor="#52c41a"
                                        style={{ width: '40%', marginBottom: '15px' }}
                                        size="small"
                                    />
                                    <p><FieldTimeOutlined style={{ marginRight: '6px' }} />Thời gian hoàn thành: {Math.min((new Date(submitTime) - new Date(start))/1000/60, duration).toFixed(1)} phút</p>

                                    <Button
                                        className="detail-button"
                                        size="large"
                                        onClick={() => { history.push(`/practice-history/${studentId}/${combinedId}/${practiceId}/view-result`) }
                                        }
                                    // onClick={() => { history.push(`/home`) }}
                                    >
                                        Xem chi tiết
                                    </Button>
                                </Card>

                            </Badge.Ribbon>
                        </div>

                    </div>
                    :
                    <div>
                        <Spin spinning={true} tip="Đang tải">
                            <p style={{ color: '#fff' }}>Hello</p>
                        </Spin>
                    </div>
            }

        </OverviewOnePracticeWrapper>
    )
}

export default OverviewOnePractice;
