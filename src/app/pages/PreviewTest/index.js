import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Card, Radio, DatePicker, Select, Checkbox } from "antd";
import { PreviewTestWrapper } from "./PreviewTestStyle";
import { notification, Typography, Spin, Row, Col, Space, Affix } from "antd";
import { Upload, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { TimePicker } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';

import Correct from "assets/images/correct.png";
import Wrong from "assets/images/wrong.png";

import { FileImageOutlined, LeftCircleOutlined, CaretRightOutlined, LoadingOutlined, HistoryOutlined, EditOutlined, RightCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

import {
    getPracticeHistoryAPI,
    getQuizInfoAPI,
    getQuestionsAPI
} from 'app/api/quiz';


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 4;
    if (!isLt2M) {
        message.error('Image must smaller than 4MB!');
    }
    return isJpgOrPng && isLt2M;
}

const layout2 = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 }
};

function PreviewTest() {
    const { Title, Text } = Typography;
    const { Option } = Select;
    const { TextArea } = Input;
    const RadioGroup = Radio.Group;

    const dispatch = useDispatch();
    const history = useHistory();
    // const [loading, setLoading] = useState(false);
    const [type, setType] = useState("EXAM");
    const [page, setPage] = useState("info");

    const [form] = Form.useForm();

    const { edit, id } = useParams();

    // -------------------------show questions----------------------------
    const [quizName, setQuizName] = useState("");
    const [grade, setGrade] = useState("");
    const [subject, setSubject] = useState("");


    const [duration, setDuration] = useState(0);
    const [flutation, setFlutation] = useState(0);
    const [status, setStatus] = useState("");
    const [total, setTotal] = useState(0);
    const [questions, setQuestions] = useState([{ _id: '2222', image: '', numberOfAnswer: 2, multipleAnswers: false }]);
    const [answers, setAnswers] = useState([[0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0]]);
    const [correctAnswers, setCorrectAnswers] = useState([[0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0]]);
    const [current, setCurrent] = useState(1);
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [registrationDueDate, setRegistrationDueDate] = useState("");
    const [quizOpen, setQuizOpen] = useState("");

    const [loading, setLoading] = useState(false);



    const getInfo = async () => {
        try {
            setLoading(true);
            // let res = await getPracticeHistoryAPI({ combinedId: "5fd4b5ae1466f59f30fbdf11" });
            let res = await getQuizInfoAPI({ id: id });

            if (res.code === 1) {
                setDuration(res.data.duration);
                setFlutation(res.data.quizOpenFluctuation);
                setQuizName(res.data.name);
                setGrade(res.data.grade);
                setSubject(res.data.subject);
                setType(res.data.type);
                setRegistrationDueDate(res.data.registrationDueDate);
                setQuizOpen(res.data.quizOpen);

                setDescription(res.data.description);
                setImageUrl(res.data.images.cover);

                setTotal(res.data.numberOfQuestions);

                // setQuestions(res.data.quiz.questions);
                // setCorrectAnswers(res.data.correctAnswers);
                // console.log("RES DATA: ", res.data);


            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getQuestions = async () => {
        try {
            setLoading(true);
            // let res = await getPracticeHistoryAPI({ combinedId: "5fd4b5ae1466f59f30fbdf11" });
            let res = await getQuestionsAPI({ id: id });

            if (res.code === 1) {

                setQuestions(res.data);
                // setCorrectAnswers(res.data.correctAnswers);
                console.log("RES DATA: ", res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getInfo();
        getQuestions();
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
                <Checkbox value={index} className="my-checkbox-multiple">
                    {x}
                </Checkbox>
            ));
            return (
                <Checkbox.Group
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '0px' }}
                    // defaultValue={[1, 0]}
                    value={questions[current - 1].correctAnswers}
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
                    className="my-checkbox"
                >
                    {x}
                </Radio>
            ));
            return (
                <Radio.Group
                    size="large"
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '0px' }}
                    // defaultValue={0}
                    // value={correctAnswers[current - 1][0]}
                    value={questions[current - 1].correctAnswers[0]}
                // value={answers[current - 1][0]}
                // onChange={onChangeSingle}
                >
                    {optionsRender}
                </Radio.Group>
            )
        }
    }

    const buttonStatus = (x_, index, active) => {
        if (active === true) {
            return "active-question"
        }
        else {
            return "non-active-question"

        }

    }

    const buttonRender = questions.map((x, index) => (
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
    //--------------------------------------------------------------------



    const getTimeShow = (dateObject) => {
        const dd = dateObject.getDate();
        const mm = dateObject.getMonth() + 1;
        const yyyy = dateObject.getFullYear();
        var h = dateObject.getHours();
        var m = dateObject.getMinutes();
        var time = "";
        if (m < 10) {
            m = '0' + m
        }
        if (h > 12) {
            h = h - 12;
            time = "chiều"
        }
        else {
            time = "sáng"
        }
        return h + ":" + m + " " + time + ",  " + dd + "-" + mm + "-" + yyyy
    }

    return (
        <PreviewTestWrapper>
            <Spin spinning={loading} tip="Đang tải...">
                {
                    loading === false ?
                        <div>
                            <Row>
                                <Col span={12}>
                                    <Space style={{ marginTop: '30px' }}>
                                        <Button
                                            className={page == "info" ? "active-button" : "non-active-button"}
                                            size='large'
                                            style={{ borderRadius: '6px' }}
                                            onClick={() => { setPage("info") }}
                                        >
                                            Thông tin đề
                                        </Button>
                                        <Button
                                            className={page == "questions" ? "active-button" : "non-active-button"}
                                            size='large'
                                            style={{ borderRadius: '6px' }}
                                            onClick={() => { setPage("questions") }}
                                        >
                                            Câu hỏi
                                        </Button>
                                    </Space>
                                </Col>
                                <Col span={12}>
                                    {
                                        edit === "allow-edit" ?
                                            <Space style={{ marginTop: '30px' }}>
                                                <Button
                                                    className="edit-button"
                                                    size='large'
                                                    style={{ borderRadius: '6px' }}
                                                    onClick={() => {
                                                        if (page === "info") {
                                                            history.push(`/edit-test-info/${id}`)
                                                        }
                                                        else {
                                                            history.push(`/add-questions/${id}`)
                                                        }
                                                    }}
                                                >
                                                    <EditOutlined /> Chỉnh sửa
                                        </Button>
                                            </Space>
                                            : null
                                    }
                                </Col>
                            </Row>



                            {
                                page == "info" ?
                                    <div>
                                        <Row
                                            style={{ marginTop: '30px' }}
                                        >
                                            <Col
                                                span={16}
                                            >
                                                <Form
                                                    form={form}
                                                    style={{
                                                        // marginLeft: "10px" 
                                                    }}
                                                    {...layout2}
                                                    name='nest-messages'
                                                // onFinish={onFinish}
                                                // onFinishFailed={values => {
                                                //     console.log("fail");
                                                // }}
                                                // validateMessages={validateMessages}
                                                >
                                                    <Card
                                                        className="info-card"
                                                        title='Thông tin đề'
                                                        bordered={false}
                                                        style={{ minWidth: '210px', minHeight: '300px' }}
                                                    >
                                                        <Row>
                                                            <Col span={12}>
                                                                <Form.Item
                                                                    name='fullname'
                                                                    label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Tên đề</span>}
                                                                    style={{ borderRadius: '7px' }}
                                                                >
                                                                    <p>{quizName}</p>
                                                                </Form.Item>

                                                            </Col>
                                                            <Col span={12}>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col span={12}>
                                                                <Form.Item
                                                                    name='type'
                                                                    label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Loại đề</span>}
                                                                    style={{ borderRadius: '7px' }}
                                                                >
                                                                    <p>{type === "PRACTICE" ? "Luyện tập" : "Thi"}</p>
                                                                </Form.Item>

                                                            </Col>
                                                            <Col span={12}>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col span={12}>
                                                                <Form.Item
                                                                    name='subject'
                                                                    label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Môn</span>}
                                                                >
                                                                    <p>{subject}</p>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col span={12}>
                                                                <Form.Item
                                                                    name='duration'
                                                                    label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Thời gian làm bài</span>}
                                                                    style={{ borderRadius: '7px' }}
                                                                >
                                                                    {duration} phút
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>

                                                        {/* {type == "EXAM" ?
                                                            <Row>
                                                                <Col span={12}>
                                                                    <Form.Item
                                                                        name="registerDuetime"
                                                                        label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Hết hạn đăng ký lúc</span>}
                                                                    >
                                                                        <p>{getTimeShow(new Date("2020-12-15T13:34:19.458Z"))}</p>
                                                                    </Form.Item>

                                                                </Col>
                                                                <Col span={12}>
                                                                </Col>
                                                            </Row>
                                                            : null
                                                        } */}

                                                        {/* {type == "EXAM" ?
                                                            <Row>
                                                                <Col span={12}>
                                                                    <Form.Item
                                                                        name="openDuetime"
                                                                        label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Đề thi mở lúc</span>}
                                                                    >
                                                                        <p>{getTimeShow(new Date("2020-12-15T13:51:19.458Z"))}</p>
                                                                    </Form.Item>

                                                                </Col>
                                                                <Col span={12}>

                                                                </Col>
                                                            </Row>
                                                            : null
                                                        } */}





                                                        <Row>
                                                            <Col span={12}>
                                                                <Form.Item
                                                                    name='grade'
                                                                    label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Lớp</span>}
                                                                >
                                                                    <p>{grade}</p>
                                                                </Form.Item>

                                                            </Col>
                                                            <Col span={12}>
                                                                {type == "EXAM" ?
                                                                    <Form.Item
                                                                        name='flutation'
                                                                        label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Được phép trễ</span>}
                                                                        style={{ borderRadius: '7px' }}
                                                                    >
                                                                        <p>{flutation} phút</p>
                                                                    </Form.Item>

                                                                    : null
                                                                }
                                                            </Col>
                                                        </Row>



                                                    </Card>


                                                    {
                                                        type == "EXAM" ?
                                                            <Row gutter={[16, 0]}>
                                                                <Col span={12}>
                                                                    <Card
                                                                        className="time-card"
                                                                        title={<span style={{ color: '#411EAF', fontSize: '18px', fontWeight: '900' }}><HistoryOutlined style={{ marginRight: '10px' }} />
                                                                            Hạn đăng ký
                                                                                </span>}
                                                                        bordered={false}
                                                                        style={{ minWidth: '210px', width: '100%', marginTop: '30px' }}
                                                                    >
                                                                        <p>{getTimeShow(new Date(registrationDueDate))}</p>

                                                                    </Card>
                                                                </Col>
                                                                <Col span={12}>
                                                                    <Card
                                                                        className="time-card"
                                                                        title={<span style={{ color: 'green', fontSize: '18px', fontWeight: '900' }}><HistoryOutlined style={{ marginRight: '10px' }} />
                                                                                Thời gian mở đề
                                                                                </span>}
                                                                        bordered={false}
                                                                        style={{ minWidth: '210px', width: '100%', marginTop: '30px' }}
                                                                    >
                                                                        <p>{getTimeShow(new Date(quizOpen))}</p>
                                                                    </Card>
                                                                </Col>
                                                            </Row>

                                                            : null
                                                    }
                                                </Form>

                                            </Col>
                                            <Col span={8}>
                                                <Title
                                                    level={4}
                                                    style={{ color: '#113476', display: 'flex', justifyContent: 'center' }}
                                                >
                                                    <FileImageOutlined style={{ paddingRight: '10px', paddingTop: '2px' }} /> Ảnh đại diện
                                                </Title>
                                                <div
                                                // style={{
                                                //     position: 'absolute', left: '50%', top: '50%',
                                                //     transform: 'translate(-50%, -50%)'
                                                // }}
                                                >
                                                    <img src={`${imageUrl}?${Date.now()}`} alt="avatar"
                                                        style={{ width: '100%', paddingLeft: '10px' }}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>

                                        <div style={{ marginTop: '30px', marginBottom: '30px' }}>
                                            <Card
                                                className='description-card'
                                                title='Mô tả đề'
                                            >
                                                {/* <TextArea rows={4} /> */}
                                                <div> {ReactHtmlParser(description)} </div>
                                            </Card>
                                        </div>

                                    </div>
                                    : null
                            }

                            {
                                page == "questions"
                                    ?
                                    <div style={{ marginTop: '20px' }}>
                                        <div>
                                            <Row align='middle'>
                                                <Col span={3}>
                                                    <p style={{ fontSize: '18px', fontWeight: '900', margin: '0px' }}><CaretRightOutlined />Câu {current}/{total}</p>
                                                </Col>
                                                <Col span={12}>

                                                </Col>
                                                <Col span={4}>
                                                    {/* <p style={{ fontSize: '18px', margin: '0px' }}>Đáp án: {options[correctAnswers[current - 1][0]]}</p> */}
                                                    <p style={{ fontSize: '18px', margin: '0px' }}>Điểm: {questions[current - 1].passScore}</p>
                                                </Col>



                                            </Row>

                                            <Row align='middle' style={{ marginBottom: '50px' }}>
                                                <Col span={1}>
                                                    <LeftCircleOutlined
                                                        className="move-icon"
                                                        onClick={backQuestion}
                                                    />
                                                </Col>
                                                <Col span={22}>
                                                    <Card
                                                        style={{ marginTop: '20px' }}
                                                        className="question-card"
                                                    >
                                                        <div 
                                                            style={{ display: 'flex',
                                                                    justifyContent: 'center', 
                                                                    alignItems: 'center',
                                                                     }}
                                                        >
                                                            <img
                                                                src={questions[current - 1].image}
                                                                style={{
                                                                    maxWidth: '935px',
                                                                    height: 'auto'
                                                                }}
                                                            />
                                                        </div>
                                                        {oneAnswerRender(questions[current - 1].numberOfAnswer, questions[current - 1].correctAnswers.length > 1, null)}

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
                                    : null
                            }
                        </div>
                        :
                        <div>
                            <p>.</p>
                            <p>.</p>
                            <p>.</p>
                            <p>.</p>
                            <p>.</p>
                            <p>.</p>
                            <p>.</p>
                            <p>.</p>
                        </div>
                }

            </Spin>
        </PreviewTestWrapper>
    );
}

export default PreviewTest;
