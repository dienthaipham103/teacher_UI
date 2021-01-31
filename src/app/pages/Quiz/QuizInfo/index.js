import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, PageHeader, Card, Typography, Skeleton, Tabs, Select, Badge, Collapse, Timeline } from 'antd';
import { openModal } from 'app/store/modal';
import { QuizInfoWrapper } from './QuizInfoStyle';
import { useParams, useHistory } from "react-router-dom";

import { CardQuiz } from 'app/components/CardQuiz';
import { getListQuizAPI } from 'app/api/quiz';
import { ASSGIN_CHILD_TO_TEST } from 'app/constants/modalName';
import { getChildOfQuizAPI } from 'app/api/user';
import { FileOutlined, UserOutlined, FieldTimeOutlined, TeamOutlined, OrderedListOutlined, HomeOutlined } from '@ant-design/icons';

import { onVisible, offVisible } from 'app/store/modal';
import AssignChildToTest from 'app/components/ModalManager/AssignChildToTest';

import {
    initialCurrentNumOfReg,
    selectCurrentNumOfReg
} from 'app/store/quiz';

import {
    getQuizInfoAPI
} from 'app/api/quiz';


function QuizInfo() {
    const history = useHistory();

    const { Title, Paragraph } = Typography;
    const { TabPane } = Tabs;
    const { Option } = Select;
    const { Panel } = Collapse;

    const { status, combinedId, quizId } = useParams();
    console.log('combinedID:', combinedId);
    console.log('quizID:', quizId);

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const [imgUrl, setImgUrl] = useState(null);
    const [quizName, setQuizName] = useState("");
    const [subject, setSubject] = useState("");
    const [grade, setGrade] = useState("");
    const [duration, setDuration] = useState(0);
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const numberOfRegister = useSelector(selectCurrentNumOfReg);
    const [description, setDescription] = useState("");
    const [registrationDueDate, setRegistrationDueDate] = useState("");
    const [quizOpen, setQuizOpen] = useState("");
    const [quizClose, setQuizClose] = useState("");

    const [selectedQuizId, setSelectedQuizId] = useState("");
    const handleChooseChild = async id => {
        setSelectedQuizId(id);
        dispatch(onVisible());
        console.log('selectedQuizId', selectedQuizId);
        console.log('id', id)
    };

    useEffect(() => {
        getQuizInfo(quizId);
    }, []);

    const getQuizInfo = async id => {
        try {
            setLoading(true);
            let res = await getQuizInfoAPI({ id: id });
            setLoading(false);
            // setLoading(false);
            if (res.code == 1) {
                // setQuizzes(res.data);
                // console.log('quizzes: ++++++++', quizzes);
                console.log('quizInfo: ++++++++', res.data);
                setImgUrl(res.data.images.cover);
                setQuizName(res.data.name);
                setSubject(res.data.subject);
                setGrade(res.data.grade);
                setDuration(res.data.duration);
                // setNumberOfRegister(res.data.numberOfRegister);
                dispatch(initialCurrentNumOfReg(res.data.numberOfRegister));
                setNumberOfQuestions(res.data.numberOfQuestions);
                setDescription(res.data.description);
                setRegistrationDueDate(res.data.registrationDueDate);
                setQuizOpen(res.data.quizOpen);
                setQuizClose(new Date((new Date(res.data.quizOpen)).getTime() + res.data.quizOpenFluctuation * 1000 * 60));
                // setQuizClose(new Date(res.data.quizOpen));

                // test
                let timeobj = new Date(res.data.registrationDueDate);
                console.log('DUE DATE: ', timeobj - (new Date()));
                console.log('DUE DATE: ', timeobj);
                console.log('CLOSE: ', (new Date(res.data.quizOpen)));
                console.log('CLOSE: ', (new Date((new Date(res.data.quizOpen)).getTime() + res.data.quizOpenFluctuation * 1000 * 60)));
                console.log('CLOSE', new Date(res.data.quizOpen));
            }
        } catch (error) {
            console.log(error);
        }
    };

    // handle 0 am
    const getTimeShow = (dateObject) => {
        const dd = dateObject.getDate();
        const mm = dateObject.getMonth() + 1;
        const yyyy = dateObject.getFullYear();
        var h = dateObject.getHours();
        var m = dateObject.getMinutes();
        var time = "";
        if (m < 10){
            m = '0' + m
        }
        if(h > 12){
            h = h - 12;
            time = "chiều"
        }
        else{
            time = "sáng"
        }
        return h + ":" + m + " " + time + ",  " + dd + "-" + mm + "-" + yyyy
    }

    const getRibbon = () => {
        const now = new Date();
        if (now < (new Date(registrationDueDate))) {
            return ["Còn hạn đăng ký", "#6BABC8"]
        }
        else if (now > (new Date(registrationDueDate)) && now < (new Date(quizOpen))) {
            return ["Hết hạn đăng ký- Bài thi chưa mở", "#E05F57"]
        }
        else if (now > (new Date(quizOpen)) && now < quizClose) {
            return ["Bài thi đang mở", "#48BB36"]
        }
        else {
            return ["Bài thi đã đóng", "#DCCD40"]
        }
    }

    const buttonRender = () => {
        if (status == undefined) {
            return (
                <Button
                    size="large"
                    className={(new Date(registrationDueDate)) - (new Date()) > 0 ? "not-active-button" : "active-button"}
                    onClick={() => {
                        if ((new Date(registrationDueDate)) - (new Date()) <= 0) {
                            // handleChooseChild(quizId)
                            history.push(`/preview-test/not-allow-edit/${quizId}`)
                        }
                    }}
                >
                    Xem đề
                </Button>
            )
        }
        else if (status == "completed") {
            return (
                <Button
                    size="large"
                    className="active-button"
                    onClick={() => {
                        history.push(`/student-quiz/do-test/${combinedId}`);
                    }}
                >
                    Xem kết quả
                </Button>
            )
        }
        else if (status == "registered") {
            if (new Date() > (new Date(quizOpen)) && new Date() < quizClose) {
                return (
                    <Button
                        size="large"
                        className="active-button"
                        onClick={() => {
                            history.push(`/student-quiz/do-test/${combinedId}`);
                        }}
                    >
                        Sẵn sàng vào thi
                    </Button>
                )
            }
            else {
                return (
                    <Button
                        size="large"
                        className="not-active-button"
                    >
                        Sẵn sàng vào thi
                    </Button>
                )
            }

        }
        else if (status == "submitted") {
            return (
                <Button
                    size="large"
                    className="active-button"
                    onClick={() => {
                        history.push(`/student-quiz/do-test/${combinedId}`);
                    }}
                >
                    Xem kết quả
                </Button>
            )
        }
        else if (status == "in-process") {
            return (
                <Button
                    size="large"
                    className="active-button"
                    onClick={() => {
                        history.push(`/student-quiz/do-test/${combinedId}`);
                    }}
                >
                    Tiếp tục
                </Button>
            )
        }
    }

    return (
        <QuizInfoWrapper>
            <Skeleton active loading={loading}>
                <Row>
                    <Col span={10}>
                        <Card
                            className="info-card"
                            cover={<img alt='example' src={imgUrl} />}
                        >
                            <p className="basic-info" style={{ textAlign: 'center' }}>
                                <TeamOutlined style={{ marginRight: '8px' }} />Số học sinh đã đăng ký: {numberOfRegister}
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {buttonRender()}
                                <AssignChildToTest quizId={selectedQuizId}></AssignChildToTest>
                            </div>
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
                    <Col span={14}>
                        <p
                            style={{
                                backgroundColor: 'rgba(28, 28, 80, 0.85)',
                                borderRadius: '5px',
                                color: '#fff',
                                fontSize: '18px',
                                paddingLeft: '20px',
                                paddingTop: '10px',
                                paddingBottom: '10px',
                                marginTop: '0px',
                                marginBottom: '20px',
                                boxShadow: '3px 3px 3px 0px #B0B0B5'
                            }}
                        >
                            {quizName}
                        </p>

                        <Badge.Ribbon
                            text={getRibbon()[0]}
                            color={getRibbon()[1]}
                        >
                            <Card className="time-card">
                                <Timeline>
                                    <Timeline.Item>
                                        <p>
                                            Hạn chót đăng ký:
                                            <span style={{ color: 'gray', fontWeight: '400' }}> {getTimeShow(new Date(registrationDueDate))} </span>
                                        </p>
                                    </Timeline.Item>
                                    <Timeline.Item color="green">
                                        <p>
                                            Thời gian bài thi mở :
                                            <span style={{ color: 'gray', fontWeight: '400' }}> {getTimeShow(new Date(quizOpen))}</span>
                                        </p>
                                    </Timeline.Item>
                                    <Timeline.Item color="red">
                                        <p style={{paddingBottom: '5px'}}>
                                            Thời gian bài thi đóng :
                                            <span style={{ color: 'gray', fontWeight: '400' }}> {getTimeShow(new Date(quizClose))}</span>
                                        </p>
                                    </Timeline.Item>
                                </Timeline>
                            </Card>
                        </Badge.Ribbon>

                        <Card className="description-card">
                            <p style={{textAlign: 'justify'}}>{description}</p>
                        </Card>
                    </Col>
                </Row>
            </Skeleton>
        </QuizInfoWrapper>
    );
}

export default QuizInfo;