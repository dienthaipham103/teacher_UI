import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Card, Radio, DatePicker, Select, Modal } from "antd";
import { CreateTestWrapper } from "./CreateTestStyle";
import { notification, Typography, Spin, Row, Col, Space } from "antd";
import { Upload, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { TimePicker } from 'antd';
import moment from 'moment';

import { LoadingOutlined, PlusOutlined, FileImageOutlined } from '@ant-design/icons';

import {
    createQuizAPI,
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

const layout2 = {
    labelCol: { span: 14 },
    wrapperCol: { span: 10 }
};

const layout3 = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 }
};

function CreateTest() {
    const { Title, Text } = Typography;
    const { Option } = Select;
    const { TextArea } = Input;
    const RadioGroup = Radio.Group;

    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("EXAM");

    const [imageAvailable, setImageAvailable] = useState(false);
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

    const handleCancel = () => setPreviewVisible(false);
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList }) => {
        setFileList(fileList)
        // will do something here
        setImageAvailable(true);
        console.log('IMAGE OBJECT: ', fileList[0])
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải lên</div>
        </div>
    );

    const [form] = Form.useForm();

    const getDate = (t, d) => {
        const hour = t.toDate().getHours();
        const minute = t.toDate().getMinutes();
        const second = t.toDate().getSeconds();
        const year = d.toDate().getFullYear();
        const month = d.toDate().getMonth() - 1;
        const day = d.toDate().getDay();
        return new Date(year, month, day, hour, minute, second)
    }

    const onFinish = async (values) => {
        // values.birthday = values.birthday.format('YYYY/MM/DD');
        console.log(values);
        const data = {
            type: type,
            name: values.quizname,
            registrationDueDate: type === 'EXAM' ? getDate(values.registerDuetime, values.registerDuedate) : '2019-06-11T00:00',
            quizOpen: type === 'EXAM' ? getDate(values.openDuetime, values.openDueDate) : '2019-06-11T00:00',
            quizOpenFluctuation: type === 'EXAM' ? values.flutation : 0,
            // numberOfQuestions: 20,
            description: values.description,
            subject: values.subject,
            grade: values.grade,
            duration: values.duration
            // numberOfQuestions: 0
        }


        try {
            // setAddLoading(true);
            let res = await createQuizAPI(data);
            console.log(res);
            console.log('CHECK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>', fileList);

            // if there is no image uploaded
            if (fileList.length === 0) {
                notification.success({
                    message: 'Tạo đề thành công!',
                    duration: "2"
                });
                // history.push("/student-list");
                console.log('QUIZ ID: ', res.data._id);
                history.push(`/add-questions/${res.data._id}`);
            }
            else if (res.code === 1) {
                let res1 = await getImageUrlAPI({ id: res.data._id });
                console.log(res1);
                if (res1.code === 1) {
                    // ---------------------//

                    // image object
                    const imageFile = fileList[0]


                    let res2 = await axios.put(res1.data, imageFile.originFileObj, {
                        headers: { 'content-type': 'image' }
                    });
                    console.log('SEND IMAGE', res2)

                    if (res2.statusText === "OK") {
                        notification.success({
                            message: 'Tạo đề thành công!',
                            duration: "2"
                        });
                        // history.push("/student-list");
                        console.log('QUIZ ID: ', res.data._id);
                        history.push(`/add-questions/${res.data._id}`);
                    }

                    // -------------------------//
                }

            }


        } catch (error) {
            console.log('Error when creating quiz: ', error)
        }
    };



    return (
        <CreateTestWrapper>

            <Space style={{ marginTop: '30px' }}>
                <Button
                    className={type == "EXAM" ? "active-button" : "non-active-button"}
                    size='large'
                    style={{ borderRadius: '6px' }}
                    onClick={() => { setType("EXAM") }}
                >
                    Đề thi
                </Button>
                <Button
                    className={type == "PRACTICE" ? "active-button" : "non-active-button"}
                    size='large'
                    style={{ borderRadius: '6px' }}
                    onClick={() => { setType("PRACTICE") }}
                >
                    Đề luyện tập
                </Button>
            </Space>
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
                                        name='quizname'
                                        label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Tên đề</span>}
                                        rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                        style={{ borderRadius: '7px' }}
                                    >
                                        <Input style={{ height: '36px', fontSize: '16px', fontWeight: '400' }}
                                        // onChange={onFullnameChanged} 
                                        />
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
                                        rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                    // rules={[{ type: "email", required: true, message: <p style={{ color: '#F82C4D' }}>Thông tin bắt buộc</p> }]}
                                    // validateStatus={emailValidate ? "error" : null}
                                    // help={emailValidate ? "Email đã được đăng ký!" : null}
                                    >
                                        <Select style={{ width: 120, fontSize: '16px', fontWeight: '900' }} placeholder="Chọn môn"
                                            size="default">
                                            <Option value="1">Toán</Option>
                                            <Option value="2">Lý</Option>
                                            <Option value="3">Hóa</Option>
                                            <Option value="4">Sinh</Option>
                                            <Option value="5">Sử</Option>
                                            <Option value="6">Địa</Option>
                                            <Option value="13">Khác</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name='duration'
                                        label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Thời gian làm bài (phút)</span>}
                                        rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                        style={{ borderRadius: '7px' }}
                                    >
                                        <Input style={{ height: '36px', fontSize: '16px', fontWeight: '400', width: '50%' }}
                                        />
                                    </Form.Item>

                                </Col>
                            </Row>

                            {/* {type == "EXAM" ?
                                <Row>
                                    <Col span={16}>
                                        <Form.Item
                                            name="registerDuetime"
                                            label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Hết hạn đăng ký lúc</span>}
                                            rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                        >
                                            <TimePicker
                                                // onChange={onChange} 
                                                size="large"
                                                style={{ height: '36px', borderRadius: '6px' }}
                                                defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                                            />
                                        </Form.Item>

                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name="registerDuedate"
                                            label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Ngày</span>}
                                            rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
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
                            }

                            {type == "EXAM" ?
                                <Row>
                                    <Col span={16}>
                                        <Form.Item
                                            name="openDuetime"
                                            label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Đề thi mở lúc</span>}
                                            rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                        >
                                            <TimePicker
                                                size="large"
                                                style={{ height: '36px', borderRadius: '6px' }}
                                                defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                                            />
                                        </Form.Item>

                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name="openDueDate"
                                            label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Ngày</span>}
                                            rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
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
                                    <Col span={16}>
                                        <Form.Item
                                            name='flutation'
                                            label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Được phép trễ (phút)</span>}
                                            rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                            style={{ borderRadius: '7px' }}
                                        >
                                            <Input style={{ height: '36px', fontSize: '16px', fontWeight: '400', width: '25%' }}
                                            />
                                        </Form.Item>

                                    </Col>
                                    <Col span={8}>
                                    </Col>
                                </Row>
                                : null
                            } */}

                            {
                                type === "PRACTICE" ?
                                    <Row>
                                        <Col span={12}>
                                            {/* <Form.Item
                                                name='duration'
                                                label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Thời gian làm bài (phút)</span>}
                                                rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                                style={{ borderRadius: '7px' }}
                                            >
                                                <Input style={{ height: '36px', fontSize: '16px', fontWeight: '400', width: '50%' }}
                                                />
                                            </Form.Item> */}
                                            <Form.Item
                                                name='grade'
                                                // label='Lớp'
                                                label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Lớp</span>}
                                                rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                            >
                                                {/* <InputNumber min='1' max='12' type='number' style={{height: '40px'}} /> */}
                                                <Select style={{ width: 120, fontSize: '16px', fontWeight: '900' }} placeholder="Chọn lớp"
                                                    size="default">
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
                                            </Form.Item>

                                        </Col>
                                        <Col span={12}>
                                        </Col>
                                    </Row>
                                    : null
                            }

                            {
                                type === "EXAM" ?
                                    <Row>
                                        <Col span={12}>
                                            {/* <Form.Item
                                                name='duration'
                                                label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Thời gian làm bài (phút)</span>}
                                                rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                                style={{ borderRadius: '7px' }}
                                            >
                                                <Input style={{ height: '36px', fontSize: '16px', fontWeight: '400', width: '50%' }}
                                                />
                                            </Form.Item> */}
                                            <Form.Item
                                                name='grade'
                                                // label='Lớp'
                                                label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Lớp</span>}
                                                rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                            >
                                                {/* <InputNumber min='1' max='12' type='number' style={{height: '40px'}} /> */}
                                                <Select style={{ width: 120, fontSize: '16px', fontWeight: '900' }} placeholder="Chọn lớp"
                                                    size="default">
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
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name='flutation'
                                                label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Được phép trễ (phút)</span>}
                                                rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                                style={{ borderRadius: '7px' }}
                                            >
                                                <Input style={{ height: '36px', fontSize: '16px', fontWeight: '400', width: '50%' }}
                                                // onChange={onFullnameChanged} 
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    : null
                            }

                        </Card>

                        {
                            type == "EXAM" ?
                                <Row gutter={[16, 24]}>
                                    <Col span={12}>
                                        <Card
                                            title='Hạn đăng ký'
                                            bordered={false}
                                            style={{ minWidth: '210px', width: '100%', marginTop: '30px' }}
                                        >
                                            <Col span={16}>
                                                <Form.Item
                                                    name="registerDuetime"
                                                    label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Thời gian</span>}
                                                    rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                                >
                                                    <Input style={{ height: '36px', fontSize: '16px', fontWeight: '400', width: '50%' }}
                                                    // onChange={onFullnameChanged} 
                                                    />
                                                </Form.Item>

                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    name="registerDuedate"
                                                    label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Ngày</span>}
                                                    rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                                >
                                                    <DatePicker
                                                        format="YYYY/MM/DD"
                                                        size="large"
                                                        style={{ height: '36px', borderRadius: '6px' }}
                                                        placeholder=""
                                                    />
                                                </Form.Item>

                                            </Col>
                                        </Card>
                                    </Col>
                                    <Col span={12}>
                                        <Card
                                            title='Thời gian mở đề'
                                            bordered={false}
                                            style={{ minWidth: '210px', width: '100%', marginTop: '30px' }}
                                        >
                                            Hello
                                        </Card>
                                    </Col>
                                </Row>

                                : null
                        }

                    </Col>
                    <Col span={5}>
                        {/* <Card
                        style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center'}}
                    > */}
                        {/* <Row justify="space-around" align="middle">
                            
                        </Row> */}
                        <Title
                            level={4}
                            style={{ color: '#113476', display: 'flex', justifyContent: 'center' }}
                        >
                            <FileImageOutlined style={{ paddingRight: '10px', paddingTop: '2px' }} /> Ảnh đại diện
                        </Title>

                        <div
                            style={{
                                // position: 'absolute', left: '50%', top: '50%',
                                // transform: 'translate(-50%, -50%)'
                                // display: 'flex',
                                // justifyContent: 'center'
                            }}
                        >
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
                                imageAvailable === true ?
                                    <div>
                                        {
                                            fileList.length > 0 ?
                                                // <img src={`${questions[current - 1].image}?${Date.now()}`} style={{ width: "100%" }} />
                                                <p>Already uploaded</p>
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
                                    // onClick={() => {
                                    //     if (current === questions.length) {
                                    //         console.log("GGGGGGGGGGGGGGGGGGGGG")
                                    //         addQuestion(null, "image")
                                    //     }
                                    // }
                                    // }
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
                        </div>
                        {/* </Card> */}
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
                            rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                            style={{ marginBottom: '0px' }}
                        >
                            <TextArea rows={4} allowClear />
                        </Form.Item>
                    </Card>
                </div>

                <div style={{ paddingTop: "30px", paddingBottom: '30px' }}>
                    <Button
                        className="add-questions-button"
                        size='large'
                        htmlType='submit'
                        style={{ borderRadius: '6px' }}
                    // onClick={() => { history.push('/add-questions/56677hghg') }}
                    >
                        <PlusOutlined /> Tạo câu hỏi
                    </Button>
                </div>
            </Form>

        </CreateTestWrapper >
    );
}

export default CreateTest;
