import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import { ViewHistoryWrapper } from "./ViewHistoryStyle";
import { Button, Modal, Statistic } from 'antd';
import { Card, Spin } from 'antd';
import { Skeleton, Timeline, Badge, Affix, notification, Popconfirm, message, Avatar, Typography, Col, Row, Space, Tabs, Checkbox, Radio, Pagination, Progress, Tag } from "antd";
import { CardQuiz } from 'app/components/CardQuiz';

import { ClockCircleTwoTone, FieldTimeOutlined, PercentageOutlined, CheckOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';

import { updateNotRegisterByRemoveStudent } from 'app/store/quiz';
import { FileOutlined, OrderedListOutlined, CloseCircleOutlined, CheckCircleOutlined, CaretRightOutlined, CloseOutlined, SendOutlined, UserOutlined, HomeOutlined, GlobalOutlined, SearchOutlined, HistoryOutlined, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import Trash from "assets/images/trash.png";
import Q1 from "assets/images/q1.png";
import Q2 from "assets/images/q2.png";

import Correct from "assets/images/correct.png";
import Wrong from "assets/images/wrong.png";


import {
    getPracticeHistoryAPI
} from 'app/api/quiz';

import { changeCurrent, increaseCurrent, decreaseCurrent, updateAnswer, finishTest, getTest } from 'app/store/doTest';

import { FormOutlined } from '@ant-design/icons';


function ViewHistory() {
    const { Countdown } = Statistic;
    const { Title, Text } = Typography;
    const { TabPane } = Tabs;

    const history = useHistory();

    const { studentId, combinedId } = useParams();

    const [loading, setLoading] = useState(false);

    const [grade, setGrade] = useState("");
    const [duration, setDuration] = useState("");
    const [numberOfQuestions, setNumberOfQuestions] = useState("");
    const [subject, setSubject] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [practice, setPractice] = useState([{}]);

    const getHistory = async id => {
        try {
            setLoading(true);
            let res = await getPracticeHistoryAPI({ combinedId: id });
            setLoading(false);
            if (res.code === 1) {
                // setInprocessPractices(res.data);
                setGrade(res.data.quiz.grade);
                setDuration(res.data.quiz.duration);
                setNumberOfQuestions(res.data.quiz.numberOfQuestions);
                setSubject(res.data.quiz.subject);
                setImageUrl(res.data.quiz.images[0].url);
                setPractice(res.data.practice);
                console.log('quizzes: ++++++++', res);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getHistory(combinedId);
        // return () => { };
        console.log("KAKAKAKAKAKAKKAKAKAKAKAKKAKAKAKAKKAKAKak")
    }, []);



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
        <ViewHistoryWrapper>
            <Skeleton loading={loading}>
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

                <hr style={{ height: '1px', border: 'none', backgroundColor: '#E5E5E6', marginTop: '0px', marginBottom: '15px' }} />

                <Row>
                    <Col span={14}>
                        <Title level={4} style={{ marginBottom: '20px' }}>Số lần luyện tập: {practice.length}</Title>
                        <Timeline>
                            {
                                practice.map((pratice, index) => (
                                    <Timeline.Item>
                                        <Card
                                            onClick={() => {history.push(`/practice-history/${studentId}/${combinedId}/${index+1}`)}}
                                        >
                                            <Row>
                                                <Col span={12}>
                                                    <p><FieldTimeOutlined style={{ marginRight: '10px' }} />Lần: {index + 1}</p>
                                                </Col>
                                                <Col span={12}>
                                                    {practice[index].score}/100
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Timeline.Item>
                                ))
                            }
                        </Timeline>
                    </Col>
                    <Col span={10}>
                        <Card
                            className="info-card"
                            cover={<img alt='example' src={imageUrl} />}
                        >
                            <Row>
                                <Col span={16}>
                                    <p className="basic-info">
                                        <FileOutlined style={{ marginRight: '8px' }} />Môn: {subject}
                                    </p>
                                </Col>
                                <Col span={8}>
                                    <p className="basic-info">
                                        <HomeOutlined style={{ marginRight: '8px' }} />Lớp: {grade}
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={16}>
                                    <p className="basic-info">
                                        <FieldTimeOutlined style={{ marginRight: '8px' }} />Thời gian: {duration} phút
                                    </p>
                                </Col>
                                <Col span={8}>
                                    <p className="basic-info">
                                        <OrderedListOutlined style={{ marginRight: '8px' }} />Số câu: {numberOfQuestions}
                                    </p>
                                </Col>
                            </Row>

                        </Card>
                    </Col>

                </Row>
            </Skeleton>


        </ViewHistoryWrapper>
    )
}

export default ViewHistory;
