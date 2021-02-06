import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Card, Radio, DatePicker, Select, Modal } from "antd";
import { EditTestInfoWrapper } from "./EditTestInfoStyle";
import { notification, Typography, Spin, Row, Col, Space } from "antd";
import { Upload, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { TimePicker } from 'antd';
import moment from 'moment';

import { LoadingOutlined, PlusOutlined, SaveOutlined, FileImageOutlined, EditOutlined, HistoryOutlined } from '@ant-design/icons';

import {
    getQuizInfoAPI,
    updateQuizAPI,
    getImageUrlAPI
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

const layout3 = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 }
};

const layout4 = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 }
};

function EditTestInfo() {
    const { Title, Text } = Typography;
    const { Option } = Select;
    const { TextArea } = Input;

    const { id } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("");

    const [quizName, setQuizName] = useState("");
    const [grade, setGrade] = useState("");
    const [subject, setSubject] = useState("");
    const [duration, setDuration] = useState(0);
    const [flutation, setFlutation] = useState(0);
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [total, setTotal] = useState(0);
    const [registrationDueDate, setRegistrationDueDate] = useState("");
    const [quizOpen, setQuizOpen] = useState("");

    // const [imageAvailable, setImageAvailable] = useState(true);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
        // {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
    ]);

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

                console.log('res: ', res);
                console.log(typeof (res.data.quizOpen));
                console.log('REGISTER year: ', new Date(res.data.registrationDueDate).getFullYear());
                console.log('REGISTER month: ', new Date(res.data.registrationDueDate).getMonth());
                console.log('REGISTER date: ', new Date(res.data.registrationDueDate).getDate());

                // console.log('OPEN year: ', res.data.quizOpen.getFullYear());
                // console.log('OPEN month: ', res.data.quizOpen.getMonth());
                // console.log('OPEN date: ', res.data.quizOpen.getDate());

                setDescription(res.data.description);
                setImageUrl(res.data.images.cover);

                setTotal(res.data.numberOfQuestions);

                setFileList([{
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: res.data.images.cover,
                }])

                // setQuestions(res.data.quiz.questions);
                // setCorrectAnswers(res.data.correctAnswers);


            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getInfo();
        console.log("KAKAKAKAKAKAKKAKAKAKAKAKKAKAKAKAKKAKAKak")
    }, []);

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
        setFileList(fileList);

        // setPreviewImage(fileList[0].url || fileList[0].preview);
        if (!fileList[0].url && !fileList[0].preview) {
            fileList[0].preview = await getBase64(fileList[0].originFileObj);
        }
        setPreviewImage(fileList[0].url || fileList[0].preview);

        // will do something here
        // setImageAvailable(true);
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải lên</div>
        </div>
    );

    const [form] = Form.useForm();


    const onFinish = async (values) => {
        // current datetime of registerDue
        const registerDue_hour = new Date(registrationDueDate).getHours();
        const registerDue_minute = new Date(registrationDueDate).getMinutes();
        const registerDue_second = new Date(registrationDueDate).getSeconds();
        const registerDue_year = new Date(registrationDueDate).getFullYear();
        const registerDue_month = new Date(registrationDueDate).getMonth();
        const registerDue_day = new Date(registrationDueDate).getDate();

        // current datetime of quizOpen
        const quizOpen_hour = new Date(quizOpen).getHours();
        const quizOpen_minute = new Date(quizOpen).getMinutes();
        const quizOpen_second = new Date(quizOpen).getSeconds();
        const quizOpen_year = new Date(quizOpen).getFullYear();
        const quizOpen_month = new Date(quizOpen).getMonth();
        const quizOpen_day = new Date(quizOpen).getDate();



        console.log('VALUES: ', values);
        let changeRegisterDue = 0;
        let changeQuizOpen = 0;
        let data = {}

        for (const [key, value] of Object.entries(values)) {
            if (values[key] !== undefined) {
                data[key] = values[key];
                if (key === "registerDuetime") {
                    changeRegisterDue = changeRegisterDue + 1;
                }
                if (key === "registerDuedate") {
                    changeRegisterDue = changeRegisterDue + 2;
                }
                if (key === "openDuetime") {
                    changeQuizOpen = changeQuizOpen + 1;
                }
                if (key === "openDueDate") {
                    changeQuizOpen = changeQuizOpen + 2;
                }
            }

        }


        console.log("count: ", changeRegisterDue);
        // handdle for registerDue
        if (changeRegisterDue === 1) {
            data = {
                ...data,
                registrationDueDate: new Date(registerDue_year, registerDue_month, registerDue_day,
                    values.registerDuetime.toDate().getHours(),
                    values.registerDuetime.toDate().getMinutes(),
                    values.registerDuetime.toDate().getSeconds()
                )
            }
        }
        else if (changeRegisterDue === 2) {
            data = {
                ...data,
                registrationDueDate: new Date(
                    values.registerDuedate.toDate().getFullYear(),
                    values.registerDuedate.toDate().getMonth(),
                    values.registerDuedate.toDate().getDate(),
                    registerDue_hour, registerDue_minute, registerDue_second,
                )
            }
        }
        else if (changeRegisterDue === 3) {
            data = {
                ...data,
                registrationDueDate: new Date(
                    values.registerDuedate.toDate().getFullYear(),
                    values.registerDuedate.toDate().getMonth(),
                    values.registerDuedate.toDate().getDate(),
                    values.registerDuetime.toDate().getHours(),
                    values.registerDuetime.toDate().getMinutes(),
                    values.registerDuetime.toDate().getSeconds()
                )
            }
        }

        // handdle for quizOpen
        if (changeQuizOpen === 1) {
            data = {
                ...data,
                quizOpen: new Date(quizOpen_year, quizOpen_month, quizOpen_day,
                    values.openDuetime.toDate().getHours(),
                    values.openDuetime.toDate().getMinutes(),
                    values.openDuetime.toDate().getSeconds()
                )
            }
        }
        else if (changeQuizOpen === 2) {
            data = {
                ...data,
                quizOpen: new Date(
                    values.openDueDate.toDate().getFullYear(),
                    values.openDueDate.toDate().getMonth(),
                    values.openDueDate.toDate().getDate(),
                    quizOpen_hour, quizOpen_minute, quizOpen_second,
                )
            }
        }
        else if (changeQuizOpen === 3) {
            data = {
                ...data,
                quizOpen: new Date(
                    values.openDueDate.toDate().getFullYear(),
                    values.openDueDate.toDate().getMonth(),
                    values.openDueDate.toDate().getDate(),
                    values.openDuetime.toDate().getHours(),
                    values.openDuetime.toDate().getMinutes(),
                    values.openDuetime.toDate().getSeconds()
                )
            }
        }

        try {
            // setLoading(true);
            // let res = await getPracticeHistoryAPI({ combinedId: "5fd4b5ae1466f59f30fbdf11" });
            let res = await updateQuizAPI({ id: id, data: data });
            console.log('Data', data);

            if (fileList.length === 0 || fileList[0].type !== undefined) {
                let res1 = await getImageUrlAPI({ id: id });
                console.log(res1);
                if (res1.code === 1) {
                    // ---------------------//

                    // image object
                    const imageFile = fileList[0];
                    console.log("IMAGE FILE: ", imageFile);
                    console.log("FILE LIST: ", fileList);
                    console.log("RES>DATA: ", res1.data);

                    // let res2 = await axios.put(res1.data, null, {
                    //     headers: { 'content-type': 'image' }
                    // });
                    let res2 = await axios.put(res1.data, fileList.length > 0 ? imageFile.originFileObj : null, {
                        headers: { 'content-type': 'image' }
                    });
                    console.log('SEND IMAGE', res2)

                    // -------------------------//
                }
            }

            notification.success({
                message: "Cập nhật thông tin thành công!",
                duration: "2"
            });

            history.push(`/preview-test/allow-edit/${id}`); // be careful with the order

            // if (res.code === 1) {

            //     notification.success({
            //         message: "Cập nhật thông tin thành công!",
            //         duration: "2"
            //     });

            //     history.push(`/preview-test/${id}`); // be careful with the order
            // }
        } catch (error) {
            console.log(error);
        } finally {
            // setLoading(false);
        }


    };

    return (
        <EditTestInfoWrapper>
            <Spin tip="Đang tải..." spinning={loading}>
                {
                    loading === false ?
                        <div>
                            <Form
                                form={form}
                                style={{
                                    // marginLeft: "10px" 
                                }}
                                {...layout2}
                                name='nest-messages'
                                onFinish={onFinish}
                            // onFinishFailed={values => {
                            //     console.log("fail");
                            // }}
                            // validateMessages={validateMessages}
                            >

                                <Row
                                    gutter={[16, 24]}
                                    style={{ marginTop: '30px' }}
                                    justify="space-around"
                                    align="top"
                                >
                                    <Col
                                        span={19}
                                    >

                                        <Card
                                            title='Thông tin đề'
                                            bordered={false}
                                            style={{ minWidth: '210px', width: '100%', paddingRight: '10px' }}
                                        >
                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name='name'
                                                        label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Tên đề</span>}
                                                        // rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                                        style={{ borderRadius: '7px' }}
                                                    >
                                                        {
                                                            quizName !== "" ?
                                                                <Input style={{ height: '36px', fontSize: '16px', fontWeight: '400' }}
                                                                    // onChange={onFullnameChanged} 
                                                                    defaultValue={quizName}
                                                                />
                                                                :
                                                                null
                                                        }
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
                                                        // rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                                        style={{ borderRadius: '7px' }}
                                                    >
                                                        {
                                                            type !== "" ?
                                                                <Select style={{ width: 120, fontSize: '16px', fontWeight: '900' }} placeholder="Chọn loại đề"
                                                                    size="default"
                                                                    defaultValue={type}
                                                                    onChange={() => {
                                                                        if (type === "PRACTICE"){
                                                                            setType("EXAM");
                                                                        }
                                                                        else{
                                                                            setType("PRACTICE")
                                                                        }

                                                                    }}
                                                                >
                                                                    <Option value="EXAM">Thi</Option>
                                                                    <Option value="PRACTICE">Luyện tập</Option>
                                                                </Select>
                                                                : null
                                                        }
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
                                                    // rules={[{ type: "email", required: true, message: <p style={{ color: '#F82C4D' }}>Thông tin bắt buộc</p> }]}
                                                    // validateStatus={emailValidate ? "error" : null}
                                                    // help={emailValidate ? "Email đã được đăng ký!" : null}
                                                    >
                                                        {
                                                            subject !== "" ?
                                                                <Select style={{ width: 120, fontSize: '16px', fontWeight: '900' }} placeholder="Chọn môn"
                                                                    size="default"
                                                                    defaultValue={subject}
                                                                >
                                                                    <Option value="Toán">Toán</Option>
                                                                    <Option value="Lý">Lý</Option>
                                                                    <Option value="Hóa">Hóa</Option>
                                                                    <Option value="Sinh">Sinh</Option>
                                                                    <Option value="Sử">Sử</Option>
                                                                    <Option value="Địa">Địa</Option>
                                                                    <Option value="Khác">Khác</Option>
                                                                </Select>
                                                                : null
                                                        }
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name='duration'
                                                        label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Thời gian làm bài (phút)</span>}
                                                        // rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                                        style={{ borderRadius: '7px' }}
                                                    >
                                                        {
                                                            duration !== 0 ?
                                                                <Input style={{ height: '36px', fontSize: '16px', fontWeight: '400', width: '25%' }}
                                                                    // onChange={onFullnameChanged} 
                                                                    defaultValue={duration}
                                                                />
                                                                : null
                                                        }

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
                                                            <TimePicker
                                                                size="large"
                                                                style={{ height: '36px', borderRadius: '6px' }}
                                                                defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                                                            />
                                                        </Form.Item>

                                                    </Col>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            name="registerDuedate"
                                                            label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Ngày</span>}
                                                        >
                                                            <DatePicker
                                                                format="YYYY/MM/DD"
                                                                size="large"
                                                                style={{ height: '36px', borderRadius: '6px' }}
                                                                placeholder=""
                                                            />
                                                        </Form.Item>

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
                                                            <TimePicker
                                                                size="large"
                                                                style={{ height: '36px', borderRadius: '6px' }}
                                                                defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                                                            />
                                                        </Form.Item>

                                                    </Col>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            name="openDueDate"
                                                            label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Ngày</span>}
                                                        >
                                                            <DatePicker
                                                                format="YYYY/MM/DD"
                                                                size="large"
                                                                style={{ height: '36px', borderRadius: '6px' }}
                                                                placeholder=""
                                                            />
                                                        </Form.Item>

                                                    </Col>
                                                </Row>
                                                : null
                                            } */}





                                            <Row>
                                                <Col span={12}>

                                                    <Form.Item
                                                        name='grade'
                                                        // label='Lớp'
                                                        label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Lớp</span>}
                                                    // rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                                    >
                                                        {/* <InputNumber min='1' max='12' type='number' style={{height: '40px'}} /> */}
                                                        {
                                                            grade !== "" ?
                                                                <Select style={{ width: 120, fontSize: '16px', fontWeight: '900' }} placeholder="Chọn lớp"
                                                                    size="default"
                                                                    defaultValue={grade}
                                                                >
                                                                    <Option value="1">1</Option>
                                                                    <Option value="2">2</Option>
                                                                    <Option value="3">3</Option>
                                                                    <Option value="4">4</Option>
                                                                    <Option value="5">5</Option>
                                                                    <Option value="6">6</Option>
                                                                    <Option value="7">7</Option>
                                                                    <Option value="8">8</Option>
                                                                    <Option value="9">9</Option>
                                                                    <Option value="10">10</Option>
                                                                    <Option value="11">11</Option>
                                                                    <Option value="12">12</Option>
                                                                    <Option value="13">Khác</Option>
                                                                </Select>
                                                                : null
                                                        }
                                                    </Form.Item>

                                                </Col>
                                                <Col span={12}>
                                                    {type == "EXAM" ?
                                                        <Form.Item
                                                            name='flutation'
                                                            label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Được phép trễ (phút)</span>}
                                                            style={{ borderRadius: '7px' }}
                                                        >
                                                            <Input style={{ height: '36px', fontSize: '16px', fontWeight: '400', width: '25%' }}
                                                                defaultValue={flutation}
                                                            />
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
                                                            title={<span style={{ color: '#411EAF', fontSize: '18px', fontWeight: '900' }}><HistoryOutlined style={{ marginRight: '10px' }} />
                                                                Hạn đăng ký
                                                                    </span>}
                                                            bordered={false}
                                                            style={{ minWidth: '210px', width: '100%', marginTop: '30px' }}
                                                        >
                                                            {/* <Form.Item
                                                {...layout4}
                                                label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Thời gian</span>}
                                                style={{ marginBottom: 0 }}
                                            >
                                                <Input.Group compact>
                                                    <Form.Item
                                                        noStyle
                                                        name="register_hour"
                                                        rules={[{ required: true }]}
                                                        style={{ display: 'inline-block', width: 'calc(50% - 2px)' }}
                                                    >
                                                        <InputNumber min={0} max={24}
                                                            placeholder="Giờ"
                                                            style={{
                                                                height: '34px', fontSize: '16px', fontWeight: '400',
                                                                borderRadius: '5px', marginBottom: '20px', marginRight: '5px', width: '30%'
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        noStyle
                                                        name="register_minute"
                                                        rules={[{ required: true }]}
                                                        style={{ display: 'inline-block', width: 'calc(50% - 2px)' }}
                                                    >
                                                        <InputNumber min={0} max={60}
                                                            placeholder="Phút"
                                                            style={{
                                                                height: '34px', fontSize: '16px', fontWeight: '400',
                                                                borderRadius: '5px', marginBottom: '20px', marginRight: '5px', width: '30%'
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        noStyle
                                                        name="register_second"
                                                        rules={[{ required: true }]}
                                                        style={{ display: 'inline-block', width: 'calc(50% - 2px)' }}
                                                    >
                                                        <InputNumber min={0} max={60}
                                                            placeholder="Giây"
                                                            style={{
                                                                height: '34px', fontSize: '16px', fontWeight: '400', width: '25%',
                                                                borderRadius: '5px', marginBottom: '20px'
                                                            }}
                                                        />
                                                    </Form.Item>
                                                </Input.Group>

                                            </Form.Item> */}
                                                            <Form.Item
                                                                {...layout4}
                                                                name="registerDuetime"
                                                                label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Thời gian</span>}
                                                            // rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                                            >
                                                                <TimePicker
                                                                    // onChange={onChange} 
                                                                    size="large"
                                                                    style={{ height: '36px', borderRadius: '6px' }}
                                                                    defaultValue={moment(new Date(registrationDueDate), 'HH:mm:ss')}
                                                                />
                                                            </Form.Item>


                                                            <Form.Item
                                                                {...layout4}
                                                                name="registerDuedate"
                                                                label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Ngày</span>}
                                                            // rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                                            >
                                                                <DatePicker
                                                                    format="YYYY/MM/DD"
                                                                    size="large"
                                                                    style={{ height: '36px', borderRadius: '6px' }}
                                                                    placeholder=""
                                                                    defaultValue={moment(new Date(registrationDueDate), 'YYYY-MM-DD')}
                                                                />
                                                            </Form.Item>
                                                        </Card>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Card
                                                            title={<span style={{ color: 'green', fontSize: '18px', fontWeight: '900' }}><HistoryOutlined style={{ marginRight: '10px' }} />
                                                    Thời gian mở đề
                                                    </span>}
                                                            bordered={false}
                                                            style={{ minWidth: '210px', width: '100%', marginTop: '30px' }}
                                                        >
                                                            {/* <Form.Item
                                                {...layout4}
                                                label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Thời gian</span>}
                                                style={{ marginBottom: 0 }}
                                            >
                                                <Input.Group compact>
                                                    <Form.Item
                                                        noStyle
                                                        name="open_hour"
                                                        rules={[{ required: true }]}
                                                        style={{ display: 'inline-block', width: 'calc(50% - 2px)' }}
                                                    >
                                                        <InputNumber min={0} max={24}
                                                            placeholder="Giờ"
                                                            style={{
                                                                height: '34px', fontSize: '16px', fontWeight: '400',
                                                                borderRadius: '5px', marginBottom: '20px', marginRight: '5px', width: '30%'
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        noStyle
                                                        name="open_minute"
                                                        rules={[{ required: true }]}
                                                        style={{ display: 'inline-block', width: 'calc(50% - 2px)' }}
                                                    >
                                                        <InputNumber min={0} max={60}
                                                            placeholder="Phút"
                                                            style={{
                                                                height: '34px', fontSize: '16px', fontWeight: '400',
                                                                borderRadius: '5px', marginBottom: '20px', marginRight: '5px', width: '30%'
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        noStyle
                                                        name="open_second"
                                                        rules={[{ required: true }]}
                                                        style={{ display: 'inline-block', width: 'calc(50% - 2px)' }}
                                                    >
                                                        <InputNumber min={0} max={60}
                                                            placeholder="Giây"
                                                            style={{
                                                                height: '34px', fontSize: '16px', fontWeight: '400', width: '25%',
                                                                borderRadius: '5px', marginBottom: '20px'
                                                            }}
                                                        />
                                                    </Form.Item>
                                                </Input.Group>

                                            </Form.Item> */}
                                                            <Form.Item
                                                                {...layout4}
                                                                name="openDuetime"
                                                                label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Thời gian</span>}
                                                            // rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                                            >
                                                                <TimePicker
                                                                    size="large"
                                                                    style={{ height: '36px', borderRadius: '6px' }}
                                                                    defaultValue={moment(new Date(quizOpen), 'HH:mm:ss')}
                                                                />
                                                            </Form.Item>

                                                            <Form.Item
                                                                {...layout4}
                                                                name="openDueDate"
                                                                label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Ngày</span>}
                                                            // rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                                            >
                                                                <DatePicker
                                                                    format="YYYY/MM/DD"
                                                                    size="large"
                                                                    style={{ height: '36px', borderRadius: '6px' }}
                                                                    placeholder=""
                                                                    defaultValue={moment(new Date(quizOpen), 'YYYY-MM-DD')}
                                                                />
                                                            </Form.Item>
                                                        </Card>
                                                    </Col>
                                                </Row>

                                                : null
                                        }

                                    </Col>
                                    <Col span={5}>
                                        <Title
                                            level={4}
                                            style={{ color: '#113476', display: 'flex', justifyContent: 'center' }}
                                        >
                                            <FileImageOutlined style={{ paddingRight: '10px', paddingTop: '2px' }} /> Ảnh đại diện
                                        </Title>
                                        <div>
                                            {/* <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                >
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload> */}
                                            {
                                                fileList.length > 0 ?
                                                    <div>
                                                        {
                                                            fileList.length > 0 ?
                                                                // <img src={previewImage} style={{ width: "100%" }} />
                                                                // <img src={`${fileList[0].url || previewImage}?${Date.now()}`} style={{ width: "100%" }} />
                                                                fileList[0].url !== undefined ? <img src={`${fileList[0].url}?${Date.now()}`} style={{ width: "100%" }} /> :
                                                                    <img src={previewImage} style={{ width: "100%" }} />
                                                                : null
                                                        }
                                                    </div>
                                                    :
                                                    <Upload
                                                        className="avatar-uploader"
                                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                        listType="picture-card"
                                                        fileList={fileList}
                                                        onPreview={handlePreview}
                                                        onChange={handleChange}
                                                    >
                                                        {fileList.length >= 1 ?
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
                                            {
                                                fileList.length > 0 ?
                                                    <div
                                                        style={{ display: 'flex', justifyContent: 'center' }}
                                                    >
                                                        <Button
                                                            className="change-button"
                                                            size='large'
                                                            style={{ borderRadius: '6px' }}
                                                            onClick={() => {
                                                                // setImageAvailable(false);
                                                                setFileList([]);
                                                            }}
                                                        >
                                                            <EditOutlined /> Đổi hình
                                            </Button>
                                                    </div>
                                                    : null
                                            }
                                        </div>
                                    </Col>
                                </Row>

                                <div style={{ marginTop: '30px' }}>
                                    {/* <Text>Mô tả đề thi</Text> */}
                                    <Card
                                        className='description-card'
                                        title='Mô tả đề'
                                    >
                                        <Form.Item
                                            name='description'
                                            {...layout3}
                                            // label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Thời gian làm bài (phút)</span>}
                                            // rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                            style={{ marginBottom: '0px' }}
                                        >
                                            {
                                                description !== "" ?
                                                    <TextArea rows={4} allowClear
                                                        defaultValue={description}
                                                    />
                                                    : null
                                            }

                                        </Form.Item>
                                    </Card>
                                </div>


                                <div style={{ paddingTop: "30px", paddingBottom: '30px' }}>
                                    <Button
                                        className="add-questions-button"
                                        size='large'
                                        htmlType='submit'
                                        style={{ borderRadius: '6px' }}
                                    >
                                        <SaveOutlined /> Lưu thay đổi
                                    </Button>
                                </div>
                            </Form>
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
                            <p>.</p>
                        </div>
                }


            </Spin>


        </EditTestInfoWrapper>
    );
}

export default EditTestInfo;
