import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import { TestResultReviewWrapper, ModalWrapper } from "./TestResultReviewStyle";
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


import {
    getRemainTimeAPI,
    updateOneAnswerAPI,
    submitAPI,
    getTestAPI
} from 'app/api/doTest';

import { changeCurrent, increaseCurrent, decreaseCurrent, updateAnswer, finishTest, getTest } from 'app/store/doTest';

import { FormOutlined } from '@ant-design/icons';


function TestResultReview() {
    const { Countdown } = Statistic;
    const { Title, Text } = Typography;
    const { TabPane } = Tabs;


    const { combinedId } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();

    const [quizName, setQuizName] = useState("");
    const [studentName, setStudentName] = useState("");
    const [studentId, setStudentId] = useState("");
    const [grade, setGrade] = useState("");

    const [submitTime, setSubmitTime] = useState(0);

    const [duration, setDuration] = useState(0);
    const [remaining, setRemaining] = useState(0);
    const [flagTime, setFlagTime] = useState(new Date());
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);
    const [status, setStatus] = useState("");
    const [total, setTotal] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [questions, setQuestions] = useState([{ _id: '2222', image: '', numberOfAnswer: 2, multipleAnswers: false }]);
    const [answers, setAnswers] = useState([[], []]);
    const [current, setCurrent] = useState(1);

    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
    const [score, setScore] = useState(0);

    const [loading, setLoading] = useState(false);


    const getReviewInfo = async () => {
        try {
            setLoading(true);
            let res = await getTestAPI({ id: combinedId });

            if (res.code === 1) {
                setQuizName(res.data.quizName);
                setStudentName(res.data.fullname);
                setStudentId(res.data.childID);
                setGrade(res.data.grade);

                setDuration(res.data.duration);
                setRemaining(res.data.remaining);
                setStart(res.data.start);
                setEnd(res.data.end);
                setSubmitTime(res.data.submitDate);
                setStatus(res.data.status);
                setTotal(res.data.length);
                setTotalScore(res.data.totalScore);
                setQuestions(res.data.questions);
                setAnswers(res.data.userAnswer);

                setNumberOfCorrectAnswers(res.data.numberOfCorrectAnswers);
                setScore(res.data.score);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getReviewInfo();
        return () => { };
    }, []);

    const countFinish = (answers) => {
        let count = 0;
        for (let x of answers) {
            if (x.length > 0) {
                count += 1
            }
        }
        return count;
    }

    const showTime = (dateObject) => {
        const dd = dateObject.getDate();
        const mm = dateObject.getMonth() + 1;
        const yyyy = dateObject.getFullYear();
        const h = dateObject.getHours();
        const m = dateObject.getMinutes();
        const s = dateObject.getSeconds();
        return h + " giờ " + m + " phút " + s + " giây" + ",  " + dd + "-" + mm + "-" + yyyy
    }


    return (
        <TestResultReviewWrapper>
            {
                loading === false ?
                    <div>
                        {true ?
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
                                    {
                                        status === "COMPLETED" ?
                                            <div>
                                                <Badge.Ribbon
                                                    text={<p style={{ fontSize: '16px' }}>Điểm: {score}/{totalScore}</p>}
                                                    color="blue"
                                                // placement="start"
                                                >
                                                    <Card
                                                        className="finish-card"
                                                        style={{ marginTop: '25px' }}
                                                    // tabBarExtraContent="Hello"
                                                    >
                                                        <p
                                                        // style={{marginTop: '30px'}}
                                                        >
                                                            <span style={{ fontWeight: '900' }}>Đã nộp bài thi lúc: </span>
                                                            <span style={{ color: '#1273EB' }}>{showTime(new Date(submitTime))}</span>
                                                        </p>
                                                        <p><CheckOutlined style={{ marginRight: '6px', color: 'blue' }} />Số câu đã làm: {countFinish(answers)}/{total}</p>
                                                        <Progress
                                                            percent={(countFinish(answers) / total * 100).toFixed(1)}
                                                            // percent={Math.round(countFinish(answers) / total * 100, 2)}
                                                            trailColor='#DDDDE2'
                                                            style={{ width: '40%', marginBottom: '15px' }}
                                                            size="small"
                                                        />
                                                        <p><CheckOutlined style={{ marginRight: '6px', color: 'green' }} />Số câu làm đúng: {numberOfCorrectAnswers}/{total}</p>
                                                        <Progress
                                                            percent={(numberOfCorrectAnswers / total * 100).toFixed(1)}
                                                            // percent={Math.round(countFinish(answers) / total * 100, 2)}
                                                            strokeColor="#52c41a"
                                                            // trailColor='#FA5B3C'
                                                            style={{ width: '40%', marginBottom: '15px' }}
                                                            size="small"
                                                        />
                                                        <p><FieldTimeOutlined style={{ marginRight: '6px' }} />Thời gian hoàn thành: {Math.min((submitTime - start) / 1000 / 60, duration).toFixed(1)} phút</p>

                                                        <Button
                                                            className="detail-button"
                                                            size="large"
                                                            onClick={() => { history.push(`/test-track/test-result-detail/${combinedId}`) }}
                                                        >
                                                            Xem chi tiết
                                                 </Button>
                                                    </Card>

                                                </Badge.Ribbon>
                                            </div>
                                            : null
                                    }

                                </div>

                            </div>
                            :
                            <div>
                                <p></p>
                            </div>
                        }

                    </div>
                    :
                    <div>
                        <Spin spinning={true} tip="Đang tải">
                            <p style={{ color: '#fff' }}>Hello</p>
                        </Spin>
                    </div>
            }

        </TestResultReviewWrapper>
    )
}

export default TestResultReview;
