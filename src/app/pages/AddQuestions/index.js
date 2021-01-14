import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Card, Radio, DatePicker, Select, Checkbox, Affix, } from "antd";
import { AddQuestionsWrapper } from "./AddQuestionsStyle";
import { notification, Typography, Spin, Row, Col, Space, Modal } from "antd";
import { Upload, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { TimePicker } from 'antd';
import moment from 'moment';

import { EditOutlined, CheckOutlined, DeleteOutlined, SaveOutlined, LoadingOutlined, PlusOutlined, CaretRightOutlined, LeftCircleOutlined, RightCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

import {
    getPracticeHistoryAPI,
    getQuestionsAPI,
    createQuestionAPI,
    updateQuestionAPI,
    getQuestionImageUrlAPI,
    deleteQuestionAPI
} from 'app/api/quiz';
import axios from 'axios';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 }
};

function AddQuestions() {
    const { Title, Text } = Typography;
    const { Option } = Select;
    const { TextArea } = Input;
    const RadioGroup = Radio.Group;

    const dispatch = useDispatch();
    const history = useHistory();
    const [type, setType] = useState("quiz");

    const { id } = useParams();

    const [form] = Form.useForm();

    // -------------------------show questions----------------------------
    // const [studentId, setStudentId] = useState("");

    const [submitTime, setSubmitTime] = useState(0);

    const [remaining, setRemaining] = useState(0);
    const [flagTime, setFlagTime] = useState(new Date());
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);
    const [status, setStatus] = useState("");
    const [total, setTotal] = useState(0);
    const [questions, setQuestions] = useState(Array(100).fill({ _id: '2222', image: '', numberOfAnswer: 2, multipleAnswers: false, correctAnswers: [null] }));
    const [answers, setAnswers] = useState([[0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0]]);
    const [correctAnswers, setCorrectAnswers] = useState([[0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0]]);
    const [current, setCurrent] = useState(1);
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);
    const [deleting, setDeleting] = useState(0);
    const [prevAnswer, setPrevAnswer] = useState(null);

    // handle add image
    const [firstChange, setFirstChange] = useState(null);

    const [uploadImageDone, setUploadImageDone] = useState(false);

    ////////important/////

    // new //
    const [allQuestions, setAllQuestions] = useState([{
        correctAnswers: [0],
        image: "",
        multipleAnswers: false,
        numberOfAnswer: 0,
        _id: ""
    }]);

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [questionImages, setQuestionImages] = useState(Array(100).fill({ fileList: [], _id: "" }));
    // const [fileList, setFileList] = useState([
    //     {
    //         uid: '-1',
    //         name: 'image.png',
    //         status: 'done',
    //         url: 'https://wiiquiz.s3-ap-southeast-1.amazonaws.com/quiz/2020/math/Kangraroo_2015_11_12/5.png',
    //     },
    // ]);

    // useEffect(() => {
    //     console.log("ADD IMAGES ----------------------------------------------------------------,")
    // }, questionImages);

    const handleCancel = () => setPreviewVisible(false);
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = async ({ fileList }) => {
        console.log("change >>>>>>>>>>>>>>>>>>>>>>>>>>>>> FILE LIST: ", fileList);
        console.log('IMAGE OBJECT: ', fileList[0]);

        const current_id = questions[current - 1]._id
        // get link to up images
        try {
            let res = await getQuestionImageUrlAPI({ id: id, questionId: current_id });
            console.log('URLLLLLLLLLLLL: ', res)


            if (res.code === 1) {
                console.log('...........Update successful')

                // send image into server
                // image object
                const imageFile = fileList[0]

                let res1 = await axios.put(res.data, fileList.length > 0 ? imageFile.originFileObj : null, {
                    headers: { 'content-type': 'image' }
                });
                console.log('SEND IMAGE', res1);
                try {
                    const data = {
                        imageAvailable: fileList.length > 0 ? true : false
                    }
                    let res2 = await updateQuestionAPI({ id: id, questionId: current_id, data: data });
                    console.log('createQuestionAPI', res2)
                    console.log('...........Update successful SET UPDATE');

                    let temp_questionImages = [...questionImages];
                    const _id = temp_questionImages[current - 1]._id;
                    temp_questionImages[current - 1] = {
                        fileList:
                            [{
                                uid: '-1',
                                name: 'image.png',
                                status: 'done',
                                url: questions[current - 1].image
                            }],
                        _id: _id
                    };
                    setQuestionImages(temp_questionImages);

                    // change local state questions: imageAvailable => true
                    let temp_questions = [...questions];
                    temp_questions[current - 1].imageAvailable = fileList.length > 0 ? true : false;
                    setQuestions(temp_questions);



                    if (res.code === 1) {
                        console.log('...........Update successful SET UPDATE');
                        // setUploadImageDone(true);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const removeImage = async () => {
        let temp_questionImages = [...questionImages];
        const _id = temp_questionImages[current - 1]._id;
        temp_questionImages[current - 1] = {
            fileList:
                [],
            _id: _id
        };
        setQuestionImages(temp_questionImages);

        // change local state questions: imageAvailable => true
        let temp_questions = [...questions];
        temp_questions[current - 1].imageAvailable = false;
        setQuestions(temp_questions);

        // call api
        const current_id = questions[current - 1]._id
        try {
            let res = await getQuestionImageUrlAPI({ id: id, questionId: current_id });
            console.log('URLLLLLLLLLLLL: ', res)

            if (res.code === 1) {
                console.log('...........Update successful')

                let res1 = await axios.put(res.data, null, {
                    headers: { 'content-type': 'image' }
                });
                console.log('SEND IMAGE', res1);
                try {
                    const data = {
                        imageAvailable: false
                    }
                    let res2 = await updateQuestionAPI({ id: id, questionId: current_id, data: data });
                    console.log('createQuestionAPI', res2)
                    console.log('...........Update successful SET UPDATE');

                    if (res.code === 1) {
                        console.log('...........Update successful SET UPDATE');
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải lên</div>
        </div>
    );
    // new //



    const getResult = async () => {
        try {
            setLoading(true);
            // let res = await getPracticeHistoryAPI({ combinedId: "5fd4b5ae1466f59f30fbdf11" });
            let res = await getQuestionsAPI({ id: id });
            console.log('RES: ', res);

            if (res.code === 1) {

                setQuestions([...res.data, {
                    imageAvailable: false,
                    correctAnswers: [null],
                    image: "",
                    multipleAnswers: false,
                    numberOfAnswer: 0,
                    _id: ""
                }]);

                console.log('QUESTION AFTER ADDING: ', questions);
                // temp_questions = null;

                /////////////////////////////////*********************************//////////////// *///
                let temp_questionImages = res.data.map(item => {
                    return {
                        _id: item._id,
                        fileList: item.imageAvailable ? [
                            {
                                uid: '-1',
                                name: 'image.png',
                                status: 'done',
                                url: item.image,
                            }
                        ] : []
                    }
                });
                temp_questionImages.push({
                    _id: "",
                    fileList: [
                    ]
                })
                setQuestionImages(temp_questionImages);
                console.log('Temp images hehehehe: ', temp_questionImages);
                console.log('QUestion IMAGES: ', questionImages);
                /////////////////////////////////*******************************/////////////////// */

                // new
                // console.log('question TEST: ', res.data.quiz.questions[4].image);
                console.log('question TEST 1: ', res.data);
                // new //
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // studentDoPractice();
        // return () => { };
        getResult();
        console.log("KAKAKAKAKAKAKKAKAKAKAKAKKAKAKAKAKKAKAKak")
    }, []);




    const handleButtonClick = async (value) => {
        setAdding(false);
        setDeleting(0);
        setCurrent(value);
    }

    const nextQuestion = async () => {
        setAdding(false);
        setDeleting(0);
        setCurrent(current + 1 > questions.length ? 1 : current + 1);
    }

    const backQuestion = async () => {
        setAdding(false);
        setDeleting(0);
        setCurrent(current - 1 === 0 ? questions.length : current - 1);
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


    const options = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
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
                    value={correctAnswers[current - 1][0]}
                // value={answers[current - 1][0]}
                // onChange={onChangeSingle}
                >
                    {optionsRender}
                </Radio.Group>
            )
        }
    }


    const buttonRender = questions.map((x, index) => (
        <div >
            {((index + 1) === current && index !== questions.length - 1) ?
                <Button
                    key={index}
                    className="button-item"
                    // id="active"
                    id="active-question"
                    // size="small"
                    onClick={() => handleButtonClick(index + 1)}>
                    {index + 1}
                </Button>
                : null}
            {((index + 1) !== current && index !== questions.length - 1) ?
                <Button
                    key={index}
                    className="button-item"
                    id="non-active-question"
                    // size="small"
                    onClick={() => handleButtonClick(index + 1)}>
                    {index + 1}
                </Button>
                : null}
            {((index === questions.length - 1) && (index + 1) === current) ?
                <Button
                    key={index}
                    className="button-item"
                    id="active-question"
                    // size="small"
                    onClick={() => handleButtonClick(index + 1)}>
                    +
                </Button>
                : null}
            {((index === questions.length - 1) && (index + 1) !== current) ?
                <Button
                    key={index}
                    className="button-item"
                    id="non-active-question"
                    // size="small"
                    onClick={() => handleButtonClick(index + 1)}>
                    +
                </Button>
                : null}
        </div>
    ));
    //--------------------------------------------------------------------

    const addQuestion = async (value, changeIs) => {

        // check _id = "", create a empty question to get id
        if (questions[current - 1]._id === "") {
            // call api
            try {
                const initialData = {
                    index: current - 1,
                    numberOfAnswer: 5,
                    multipleAnswers: false,
                    // api mistake
                    correctAnswers: changeIs === "answer" ? [value] : [0],
                    passScore: changeIs === "score" ? value : null,
                    // imageAvailable: changeIs === "image" ? true : false,
                }
                let res = await createQuestionAPI({ id: id, data: initialData });
                if (res.code === 1) {
                    // change question array
                    let temp_questions = [...questions];

                    temp_questions[current - 1] = {
                        correctAnswers: changeIs === "answer" ? [value] : [null],
                        passScore: changeIs === "score" ? value : null,
                        image: "",
                        multipleAnswers: false,
                        numberOfAnswer: 5,
                        _id: res.data._id,
                        // imageAvailable: changeIs === "image" ? true : false,
                        image: res.data.image
                        // Isavailable
                        // image
                    };
                    temp_questions.push({
                        correctAnswers: [null],
                        image: "",
                        multipleAnswers: false,
                        numberOfAnswer: 0,
                        _id: "",
                        imageAvailable: false
                        // available
                    });
                    setQuestions(temp_questions);
                    console.log('TIME 1: ', res);
                    console.log('TEMP QUESTIONS: ', temp_questions);

                    // change images
                    let temp_questionImages = [...questionImages];

                    temp_questionImages[current - 1] = {
                        fileList: changeIs === "image" ? [] : [],
                        // _id: res.data.questions[current - 1]
                        _id: res.data._id
                    };
                    temp_questionImages.push({
                        _id: "",
                        fileList: []
                    })
                    setQuestionImages(temp_questionImages);
                }


            } catch (error) {
                console.log(error);
            }
        }


    }

    const insertQuestionLeft = async () => {



        // call api for adding question
        // call api
        try {
            const initialData = {
                index: current - 1,
                numberOfAnswer: 5,
                multipleAnswers: false,
                correctAnswers: [null]
            }
            let res = await createQuestionAPI({ id: id, data: initialData });
            console.log('createQuestionAPI', res)

            if (res.code === 1) {
                console.log('...........Create successful')

                // insert to questions
                let temp_questions = [...questions];
                temp_questions.splice(current - 1, 0, {
                    correctAnswers: [null],
                    image: "",
                    multipleAnswers: false,
                    numberOfAnswer: 0,
                    // _id: res.data.questions[current - 1]
                    _id: res.data._id,
                    image: res.data.image
                });
                setQuestions(temp_questions);

                // insert to images
                let temp_questionImages = [...questionImages];
                temp_questionImages.splice(current - 1, 0, {
                    // _id: res.data.questions[current - 1],
                    _id: res.data._id,
                    fileList: []
                });
                setQuestionImages(temp_questionImages);
            }


        } catch (error) {
            console.log(error);
        }

        // setQuestions(temp_questions);
        console.log('CHECK CHECK ')
        console.log('QUESTIONS ==================: ', questions);
    }

    const insertQuestionRight = async () => {


        try {
            const initialData = {
                index: current,
                numberOfAnswer: 5,
                multipleAnswers: false,
                correctAnswers: [null]
            }
            let res = await createQuestionAPI({ id: id, data: initialData });
            console.log('createQuestionAPI', res)
            if (res.code === 1) {
                console.log('...........Create successful')
                // insert to questions
                let temp_questions = [...questions];
                temp_questions.splice(current, 0, {
                    correctAnswers: [null],
                    image: "",
                    multipleAnswers: false,
                    numberOfAnswer: 0,
                    _id: res.data._id,
                    image: res.data.image
                });
                setQuestions(temp_questions);

                // insert to images
                let temp_questionImages = [...questionImages];
                temp_questionImages.splice(current, 0, {
                    _id: res.data._id,
                    fileList: []
                });
                setQuestionImages(temp_questionImages);
            }


        } catch (error) {
            console.log(error);
        }

        setCurrent(current + 1);

        // setQuestions(temp_questions);
        console.log('CHECK CHECK ')
        console.log('QUESTIONS ==================: ', questions);
    }

    const deleteQuestion = async () => {
        setDeleting(deleting + 1);
        console.log('DELETE TIME: ', deleting);
        // setPrevAnswer(questions[current].correctAnswers[0]);
        // console.log("DIEN: ", prevAnswer);
        console.log('QUESTION BEFORE DELETING: ', questions);

        // delete in questions
        const questionId = questions[current - 1]._id;
        const new_questions = questions.filter(q => q._id !== questionId);
        setQuestions(new_questions);

        // delete in images
        const new_questionImages = questionImages.filter(q => q._id !== questionId);
        setQuestionImages(new_questionImages);

        console.log('QUESTION BEFORE DELETING: ', questions);

        // call api to delete question
        try {
            let res = await deleteQuestionAPI({ id: id, questionId: questionId });
            console.log('deleteQuestionAPI', res)
            if (res.code === 1) {
                console.log('...........Delete successful')
            }
        } catch (error) {
            console.log(error);
        }

    }

    // new //

    const onChangeAnswer = async (value) => {
        if (current === questions.length) {
            addQuestion(value, "answer");
        }
        else {
            const current_id = questions[current - 1]._id
            setQuestions(
                questions.map((item, index) =>
                    item._id === current_id && index === current - 1
                        ? { ...item, correctAnswers: [value] }
                        : item
                ))

            // call api
            try {
                const data = {
                    correctAnswers: [value]
                }
                let res = await updateQuestionAPI({ id: id, questionId: current_id, data: data });
                console.log('createQuestionAPI', res)
                if (res.code === 1) {
                    console.log('...........Update successful')
                }
            } catch (error) {
                console.log(error);
            }

        }
        console.log("ONCHANGE: ", value)
    }

    const answersRenderDelete = Array(100).fill({}).map((item, index_) => (
        <div>
            {
                deleting === index_ + 1 ?
                    <Select style={{ width: 150, fontSize: '16px', fontWeight: '900' }}
                        placeholder="Nhập đáp án"
                        size="default"
                        // defaultValue={questions[current - 1].correctAnswers[0]}
                        defaultValue={current === questions.length ? null : questions[current - 1].correctAnswers[0]}
                        onChange={onChangeAnswer}
                    >
                        <Option value={0}>A</Option>
                        <Option value={1}>B</Option>
                        <Option value={2}>C</Option>
                        <Option value={3}>D</Option>
                        <Option value={4}>E</Option>
                        <Option value={5}>F</Option>
                    </Select>
                    : null
            }
        </div>
    ));

    const answersRender = questions.map((question, index) => (
        <div>
            {
                index === current - 1 && adding === false && deleting === 0 ?
                    <Select style={{ width: 150, fontSize: '16px', fontWeight: '900' }}
                        placeholder="Nhập đáp án"
                        size="default"
                        // defaultValue={questions[current - 1].correctAnswers[0]}
                        defaultValue={question.correctAnswers[0]}
                        onChange={onChangeAnswer}
                    >
                        <Option value={0}>A</Option>
                        <Option value={1}>B</Option>
                        <Option value={2}>C</Option>
                        <Option value={3}>D</Option>
                        <Option value={4}>E</Option>
                        <Option value={5}>F</Option>
                    </Select>
                    : null
            }
            {
                index === current - 1 && adding === false ?
                    <div>
                        {answersRenderDelete}
                    </div>
                    : null
            }
            {
                index === current - 1 && adding === true ?
                    <Select style={{ width: 150, fontSize: '16px', fontWeight: '900' }}
                        placeholder="Nhập đáp án"
                        size="default"
                        // defaultValue={questions[current - 1].correctAnswers[0]}
                        // defaultValue={}
                        onChange={onChangeAnswer}
                    >
                        <Option value={0}>A</Option>
                        <Option value={1}>B</Option>
                        <Option value={2}>C</Option>
                        <Option value={3}>D</Option>
                        <Option value={4}>E</Option>
                        <Option value={5}>F</Option>
                    </Select>
                    : null
            }
        </div>
    ));
    // new //

    const onChangeScore = async (value) => {
        console.log('VALUE:   >>>>', value);
        if (current === questions.length) {
            addQuestion(value, "score");
        }
        else {
            const current_id = questions[current - 1]._id
            setQuestions(
                questions.map((item, index) =>
                    item._id === current_id && index === current - 1
                        ? { ...item, passScore: value }
                        : item
                ))

            try {
                const data = {
                    passScore: value
                }
                let res = await updateQuestionAPI({ id: id, questionId: current_id, data: data });
                console.log('createQuestionAPI', res)
                if (res.code === 1) {
                    console.log('...........Update successful')
                }
            } catch (error) {
                console.log(error);
            }
        }

    }

    const scoreRenderDelete = Array(100).fill({}).map((item, index_) => (
        <div>
            {
                deleting === index_ + 1 ?
                    <InputNumber min={1} max={20}
                        style={{ height: '34px', fontSize: '16px', fontWeight: '400' }}
                        defaultValue={current === questions.length ? null : questions[current - 1].passScore}
                        onChange={onChangeScore}
                    />
                    : null
            }
        </div>
    ));

    const scoreRender = questions.map((question, index) => (
        <div>
            {
                index === current - 1 && adding === false && deleting === 0 ?
                    // <Input style={{ height: '34px', fontSize: '16px', fontWeight: '400' }}
                    //     defaultValue={question.passScore}
                    //     onChange={onChangeScore}
                    // />
                    <InputNumber min={1} max={20}
                        style={{ height: '34px', fontSize: '16px', fontWeight: '400' }}
                        defaultValue={question.passScore}
                        onChange={onChangeScore}
                    />
                    : null
            }
            {
                index === current - 1 && adding === false ?
                    <div>
                        {scoreRenderDelete}
                    </div>
                    : null
            }
            {
                index === current - 1 && adding === true ?
                    // <Input style={{ height: '34px', fontSize: '16px', fontWeight: '400' }}
                    //     // defaultValue={question.passScore}
                    //     onChange={onChangeScore}
                    // />
                    <InputNumber min={1} max={20}
                        style={{ height: '34px', fontSize: '16px', fontWeight: '400' }}
                        // defaultValue={question.passScore}
                        onChange={onChangeScore}
                    />
                    : null
            }
        </div>
    ));


    const onFinish = async (values) => {
        console.log(values.q1 + 2);
        const q1 = values.q1;
        const q2 = values.q2;

        let temp_questions = [...questions];
        const question1 = temp_questions[q1 - 1]
        const question2 = temp_questions[q2 - 1]

        temp_questions[q1 - 1] = question2;
        temp_questions[q2 - 1] = question1;

        setQuestions(temp_questions);
        console.log('q1: ', question1)
        console.log('q2: ', question2)
        console.log('change position: ', questions);
        console.log('change position temp: ', temp_questions);

        // set images

        if (current === q1) {
            setCurrent(q2)
        }
        if (current === q2) {
            setCurrent(q1)
        }

        form.resetFields();
    }








    return (
        <AddQuestionsWrapper>
            <Spin spinning={loading}>
                {
                    loading === false ?
                        <div>
                            <div style={{ paddingTop: "20px", paddingBottom: '20px' }}>
                                <Button
                                    className="add-questions-button"
                                    size='large'
                                    htmlType='submit'
                                    style={{ borderRadius: '6px' }}
                                    onClick={
                                        () => { history.push(`/preview-test/${id}`) }
                                    }
                                >
                                    <CheckOutlined /> Xong
                    </Button>
                            </div>

                            <div>
                                <div>
                                    <Row align='middle'>
                                        <Col span={3}>
                                            <p style={{ fontSize: '18px', fontWeight: '900', margin: '0px' }}><CaretRightOutlined />Câu {current}</p>
                                        </Col>
                                        <Col span={10}>
                                            <Row>
                                                <Col span={14}>
                                                    <Form.Item
                                                        name='subject'
                                                        label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Đáp án</span>}
                                                    // rules={[{ type: "email", required: true, message: <p style={{ color: '#F82C4D' }}>Thông tin bắt buộc</p> }]}
                                                    // validateStatus={emailValidate ? "error" : null}
                                                    // help={emailValidate ? "Email đã được đăng ký!" : null}
                                                    >
                                                        {answersRender}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={10}>
                                                    <Form.Item
                                                        name='grade'
                                                        // label='Lớp'
                                                        label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Điểm</span>}
                                                    // rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                                    >
                                                        {scoreRender}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={4}>
                                            {
                                                current !== questions.length ?
                                                    <Button
                                                        className="change-button"
                                                        size='large'
                                                        style={{ borderRadius: '6px' }}
                                                        onClick={() => {
                                                            removeImage();
                                                        }}
                                                    >
                                                        <EditOutlined /> Đổi câu hỏi
                                                    </Button>
                                                    : null
                                            }
                                        </Col>
                                        <Col span={2}>
                                            {
                                                current !== questions.length ?
                                                    <Button
                                                        className="delete-button"
                                                        size='large'
                                                        style={{ borderRadius: '6px' }}
                                                        onClick={() => {
                                                            deleteQuestion();
                                                        }}
                                                    >
                                                        <DeleteOutlined /> Xóa câu hỏi
                                                    </Button>
                                                    : null
                                            }
                                        </Col>

                                    </Row>


                                    <Row
                                        align='middle'
                                        justify='center'
                                    >
                                        <Col span={1}>
                                            <LeftCircleOutlined
                                                className="move-icon"
                                                onClick={backQuestion}
                                            />
                                        </Col>
                                        <Col
                                            span={22}
                                            style={{ display: 'flex', justifyContent: 'center' }}
                                        >
                                            <div
                                                style={{
                                                    // display: 'flex',
                                                    // justifyContent: 'space-around',
                                                    marginTop: '20px',
                                                    // marginLeft: '30px', 
                                                    marginBottom: questionImages[current - 1].fileList.length >= 1 ? '40px' : '20px'
                                                }}
                                            >

                                                {/* <Upload
                                                    className="avatar-uploader"
                                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                    listType="picture-card"
                                                    fileList={questionImages[current - 1].fileList}
                                                    showUploadList={true}
                                                    onPreview={handlePreview}
                                                    onChange={handleChange}
                                                    onClick={() => {
                                                        if (current === questions.length) {
                                                            console.log("GGGGGGGGGGGGGGGGGGGGG")
                                                            addQuestion(null, "image")
                                                        }
                                                    }
                                                    }
                                                >
                                                    {questionImages[current - 1].fileList.length >= 1 ?
                                                        null
                                                        : uploadButton}
                                                </Upload> */}
                                                {
                                                    questions[current - 1].imageAvailable === true ?
                                                        <div>
                                                            {
                                                                questionImages[current - 1].fileList.length > 0 ?
                                                                    // <img src={questionImages[current - 1].fileList[0].url} style={{ width: "100%" }} />
                                                                    // <img src={questions[current - 1].image} style={{ width: "100%" }} />
                                                                    <img src={`${questions[current - 1].image}?${Date.now()}`} style={{ width: "100%" }} />
                                                                    // <img src="https://wiiquiz.s3-ap-southeast-1.amazonaws.com/quiz/5f85584906427b5500f7e4ee/1/2/ssdvvv/5ff1719e0720850eb77405dc.png" style={{ width: "100%" }} />
                                                                    // <p>Hello</p>
                                                                    : null
                                                            }
                                                            {/* {
                                                                questionImages[current - 1].fileList[0].url !== undefined ?
                                                                    <img src={questionImages[current - 1].fileList[0].url} style={{ width: "100%" }} />
                                                                    : null
                                                            } */}
                                                        </div>
                                                        :
                                                        <Upload
                                                            className="avatar-uploader"
                                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                            listType="picture-card"
                                                            fileList={questionImages[current - 1].fileList}
                                                            onPreview={handlePreview}
                                                            onChange={handleChange}
                                                            onClick={() => {
                                                                if (current === questions.length) {
                                                                    console.log("GGGGGGGGGGGGGGGGGGGGG")
                                                                    addQuestion(null, "image")
                                                                }
                                                            }
                                                            }
                                                        >
                                                            {questionImages[current - 1].fileList.length >= 1 ?
                                                                null
                                                                : uploadButton}
                                                        </Upload>
                                                }


                                                <Modal
                                                    visible={previewVisible}
                                                    title={previewTitle}
                                                    footer={null}
                                                    onCancel={handleCancel}
                                                >
                                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                                </Modal>
                                            </div>
                                            {/* {oneAnswerRender(questions[current - 1].numberOfAnswer, questions[current - 1].multipleAnswers, answers[current - 1])} */}

                                            {/* </Card> */}
                                        </Col>
                                        <Col span={1}>
                                            <RightCircleOutlined
                                                className="move-icon"
                                                onClick={nextQuestion}
                                            />
                                        </Col>
                                    </Row>


                                    <Row justify="space-around" align="top" style={{ padding: '0px', margin: '0px' }}>
                                        <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
                                            {
                                                current !== questions.length ?
                                                    <Button className="add-button"
                                                        onClick={() => {
                                                            setAdding(true);
                                                            insertQuestionLeft();
                                                        }}
                                                    >
                                                        + Thêm câu hỏi bên trái
                                                    </Button>
                                                    : null
                                            }

                                        </Col>
                                        <Col span={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Form
                                                form={form}
                                                style={{
                                                    // marginLeft: "10px" 
                                                }}
                                                {...layout}
                                                name='nest-messages'
                                                onFinish={onFinish}
                                            >
                                                <Button
                                                    className="change-position-button"
                                                    htmlType='submit'
                                                >
                                                    Đổi vị trí giữa
                                                </Button>
                                                <Space>
                                                    <Form.Item
                                                        name='q1'
                                                        style={{ borderRadius: '7px' }}
                                                    >
                                                        <InputNumber
                                                            style={{ height: '34px', fontSize: '16px', fontWeight: '400', width: '60px' }}
                                                            min={1}
                                                            max={100}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        name='q2'
                                                        style={{ borderRadius: '7px' }}
                                                    >
                                                        <InputNumber
                                                            style={{ height: '34px', fontSize: '16px', fontWeight: '400', width: '60px' }}
                                                            min={1}
                                                            max={100}
                                                        />
                                                    </Form.Item>
                                                </Space>
                                            </Form>
                                        </Col>
                                        <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
                                            {
                                                current !== questions.length ?
                                                    <Button className="add-button"
                                                        onClick={() => {
                                                            if (current === questions.length - 1) {
                                                                setCurrent(questions.length)
                                                            }
                                                            else {
                                                                insertQuestionRight();
                                                            }

                                                        }}
                                                    >
                                                        + Thêm câu hỏi bên phải
                                    </Button>
                                                    : null
                                            }
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
                        </div>
                        : null
                }

            </Spin>

        </AddQuestionsWrapper>
    );
}

export default AddQuestions;
