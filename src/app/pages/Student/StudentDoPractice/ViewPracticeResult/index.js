import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import { ViewPracticeResultWrapper } from "./ViewPracticeResultStyle";
import { Button, Modal, Statistic } from 'antd';
import { Card, Spin } from 'antd';
import { Badge, Affix, notification, Popconfirm, message, Avatar, Typography, Col, Row, Space, Tabs, Checkbox, Radio, Pagination, Progress, Tag } from "antd";
import { CardQuiz } from 'app/components/CardQuiz';

import { ClockCircleTwoTone, FieldTimeOutlined, PercentageOutlined, CheckOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';

import { updateNotRegisterByRemoveStudent } from 'app/store/quiz';
import { CloseCircleOutlined, CheckCircleOutlined, CaretRightOutlined, CloseOutlined, SendOutlined, UserOutlined, HomeOutlined, GlobalOutlined, SearchOutlined, HistoryOutlined, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import Trash from "assets/images/trash.png";
import Q1 from "assets/images/q1.png";
import Q2 from "assets/images/q2.png";

import Correct from "assets/images/correct.png";
import Wrong from "assets/images/wrong.png";


import {
    getRemainTimeAPI,
    updateOneAnswerAPI,
    submitAPI,
    getPracticeAPI
} from 'app/api/doTest';

import { changeCurrent, increaseCurrent, decreaseCurrent, updateAnswer, finishTest, getTest } from 'app/store/doTest';

import { FormOutlined } from '@ant-design/icons';


function ViewPracticeResult() {
    const { Countdown } = Statistic;
    const { Title, Text } = Typography;
    const { TabPane } = Tabs;


    const { combinedId } = useParams();
    // console.log('STUDENT', studentId);
    // console.log('QUIZ', quizId);
    console.log('QUIZ', combinedId);

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
    const [questions, setQuestions] = useState([{ _id: '2222', image: '', numberOfAnswer: 2, multipleAnswers: false }]);
    const [answers, setAnswers] = useState([[0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0]]);
    const [correctAnswers, setCorrectAnswers] = useState([[0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0]]);
    const [current, setCurrent] = useState(1);

    const [loading, setLoading] = useState(false);

    // useEffect(()=>{
    //     dispatch(createOneTest({combinedId: combinedId}));
    //     console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
    // }, [])
    const studentDoPractice = async () => {
        try {
            setLoading(true);
            let res = await getPracticeAPI({ id: combinedId });

            if (res.code === 1) {
                setQuizName(res.data.quizName);
                setStudentName(res.data.fullname);
                setStudentId(res.data.childID);
                setGrade(res.data.grade);

                setDuration(res.data.duration);
                setRemaining(res.data.remaining);
                setStart(res.data.start);
                // setFlagTime(res.data.start);
                setEnd(res.data.end);
                setSubmitTime(res.data.submitDate);
                setStatus(res.data.status);
                setTotal(res.data.length);
                setQuestions(res.data.questions);
                setAnswers(res.data.userAnswer);
                setCorrectAnswers(res.data.correctAnswers);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        studentDoPractice();
        // return () => { };
        console.log("KAKAKAKAKAKAKKAKAKAKAKAKKAKAKAKAKKAKAKak")
    }, []);




    const handleButtonClick = async (value) => {
        setCurrent(value);
    }

    const nextQuestion = async () => {
        setCurrent(current + 1 > total ? 1 : current + 1);
    }

    const backQuestion = async () => {
        setCurrent(current - 1 === 0 ? total : current - 1);
    }

    const optionStatus = () => {
        if (status === 'SUBMITTED') {
            console.log('MY CHECKBOX')
            return "my-checkbox"
        }
        else {
            console.log('MY CHECKBOX ____')
            return answers[current - 1][0] === correctAnswers[current - 1][0]
                ? "my-correct-checkbox" : "my-wrong-checkbox"
        }
    }


    const options = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const oneAnswerRender = (number, multiple, choices) => {
        if (multiple === true) {
            const optionsRender = options.slice(0, number).map((x, index) => (
                <Checkbox value={index} className="my-checkbox">{x}</Checkbox>
            ));
            return (
                <Checkbox.Group
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '0px' }}
                    // defaultValue={[1, 0]}
                    value={answers[current - 1]}
                // onChange={onChangeMultiple}
                >
                    {optionsRender}
                </Checkbox.Group>
            )
        }
        else {
            const optionsRender = options.slice(0, number).map((x, index) => (
                <Radio
                    value={index}
                    className={optionStatus()}
                >
                    {x}
                </Radio>
            ));
            return (
                <Radio.Group
                    size="large"
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '0px' }}
                    // defaultValue={0}
                    value={answers[current - 1][0]}
                // onChange={onChangeSingle}
                >
                    {optionsRender}
                </Radio.Group>
            )
        }
    }

    const buttonStatus = (x_, index, active) => {
        if (status === "DONE") {
            if (active === true) {
                if (x_.length == 0) {
                    return "wrong-active"
                }
                else {
                    return x_[0] === correctAnswers[index][0] ? "correct-active" : "wrong-active"
                }
            }
            else {
                if (x_.length == 0) {
                    return "wrong"
                }
                else {
                    return x_[0] === correctAnswers[index][0] ? "correct" : "wrong"
                }
            }
        }
        else {
            if (active === true) {
                return x_.length > 0 ? "finish-active" : "active"
            }
            else {
                return x_.length > 0 ? "finish" : "remain"
            }
        }

    }

    const buttonRender = answers.map((x, index) => (
        <div >
            {(index + 1) === current ?
                <Button
                    key={index}
                    className="button-item"
                    // id="active"
                    id={buttonStatus(x, index, true)}
                    // size="small"
                    onClick={() => handleButtonClick(index + 1)}>
                    {index + 1}
                </Button>
                : null}
            {(index + 1) !== current ?
                <Button
                    key={index}
                    className="button-item"
                    id={buttonStatus(x, index, false)}
                    // size="small"
                    onClick={() => handleButtonClick(index + 1)}>
                    {index + 1}
                </Button>
                : null}
        </div>
    ));







    return (
        <ViewPracticeResultWrapper>
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
                                    <Row align='middle'>
                                        <Col span={3}>
                                            <p style={{ fontSize: '18px', fontWeight: '900', margin: '0px' }}><CaretRightOutlined />Câu {current}/{total}</p>
                                        </Col>
                                        {
                                            status === 'DONE' ?
                                                <Col span={12}>
                                                    {
                                                        answers[current - 1][0] === correctAnswers[current - 1][0] ?
                                                            <p style={{ fontSize: '18px', fontWeight: '900', margin: '0px', color: 'green' }}>
                                                                <img className="fg-item" id="f" src={Correct} alt="Tick"
                                                                    style={{
                                                                        paddingBottom: '0px',
                                                                        height: '26px'
                                                                    }}>
                                                                </img>
                                                            </p>
                                                            :
                                                            <p style={{ fontSize: '18px', fontWeight: '900', margin: '0px', color: 'red' }}>
                                                               
                                                                <img className="fg-item" id="f" src={Wrong} alt="Tick"
                                                                    style={{
                                                                        paddingBottom: '0px',
                                                                        height: '26px'
                                                                    }}>
                                                                </img>
                                                            </p>
                                                    }
                                                </Col>
                                                : null
                                        }
                                        {
                                            status === 'DONE' ?
                                                <Col span={4}>
                                                    <p style={{ fontSize: '18px', margin: '0px' }}>Đáp án: {options[correctAnswers[current - 1][0]]}</p>
                                                </Col>

                                                : null
                                        }


                                    </Row>


                                    <Row align='middle' style={{ marginBottom: '50px' }}>
                                        <Col span={1}>
                                            <LeftCircleOutlined
                                                className="move-icon"
                                                onClick={backQuestion}
                                            />
                                        </Col>
                                        <Col span={22}>
                                            <Card style={{ marginTop: '20px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <img
                                                        src={questions[current - 1].image}
                                                        style={{
                                                            
                                                        }}
                                                    />
                                                </div>
                                                {oneAnswerRender(questions[current - 1].numberOfAnswer, questions[current - 1].multipleAnswers, answers[current - 1])}

                                            </Card>
                                        </Col>
                                        <Col span={1}>
                                            <RightCircleOutlined
                                                className="move-icon"
                                                onClick={nextQuestion}
                                            />
                                        </Col>
                                    </Row>

                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Affix
                                            style={{
                                                position: 'fixed',
                                                bottom: 0,
                                                paddingLeft: '30px',
                                                paddingRight: '30px'
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <div className="item">
                                                    <Button
                                                        id="move-button"
                                                        onClick={backQuestion}
                                                    >
                                                        <LeftOutlined />Quay lại
                                                        </Button>
                                                </div>
                                                <div className="item">
                                                    <div style={{ display: 'flex', margin: '0px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                                        {buttonRender}
                                                    </div>
                                                </div>
                                                <div className="item">
                                                    <Button
                                                        id="move-button"
                                                        onClick={nextQuestion}
                                                    >
                                                        Tiếp theo<RightOutlined />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Affix>
                                    </div>
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

        </ViewPracticeResultWrapper>
    )
}

export default ViewPracticeResult;
