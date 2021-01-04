import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Card, Radio, DatePicker, Select, Modal } from "antd";
import { EditTestInfoWrapper } from "./EditTestInfoStyle";
import { notification, Typography, Spin, Row, Col, Space } from "antd";
import { Upload, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { TimePicker } from 'antd';
import moment from 'moment';

import { LoadingOutlined, PlusOutlined, SaveOutlined, FileImageOutlined } from '@ant-design/icons';

import {
    getQuizInfoAPI,
    updateQuizAPI
} from 'app/api/quiz';


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
    labelCol: { span: 10 },
    wrapperCol: { span: 14 }
};

const layout3 = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 }
};

function EditTestInfo() {
    const { Title, Text } = Typography;
    const { Option } = Select;
    const { TextArea } = Input;
    const RadioGroup = Radio.Group;

    const { id } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("");

    const [quizName, setQuizName] = useState("");
    const [grade, setGrade] = useState("");
    const [subject, setSubject] = useState("");
    const [duration, setDuration] = useState(0);
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [total, setTotal] = useState(0);

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
                setQuizName(res.data.name);
                setGrade(res.data.grade);
                setSubject(res.data.subject);
                setType(res.data.type);

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
    const handleChange = ({ fileList }) => setFileList(fileList);
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải lên</div>
        </div>
    );

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log(values);
        let data = {}

        for (const [key, value] of Object.entries(values)) {
            if (values[key] !== undefined) {
                data[key] = values[key];
            }
        }

        try {
            // setLoading(true);
            // let res = await getPracticeHistoryAPI({ combinedId: "5fd4b5ae1466f59f30fbdf11" });
            let res = await updateQuizAPI({ id: id, data: data });
            console.log('Data', data);

            notification.success({
                message: "Cập nhật thông tin thành công!",
                duration: "2"
            });

            history.push(`/preview-test/${id}`); // be careful with the order

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
                                style={{ minWidth: '210px', width: '98%' }}
                            >
                                <Row>
                                    <Col span={16}>
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
                                    <Col span={8}>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={16}>
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
                                                    >
                                                        <Option value="EXAM">Thi</Option>
                                                        <Option value="PRACTICE">Luyện tập</Option>
                                                    </Select>
                                                    : null
                                            }
                                        </Form.Item>

                                    </Col>
                                    <Col span={8}>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={16}>
                                        <Form.Item
                                            name='email'
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
                                                        <Option value="1">Toán</Option>
                                                        <Option value="2">Lý</Option>
                                                        <Option value="3">Hóa</Option>
                                                        <Option value="4">Sinh</Option>
                                                        <Option value="5">Sử</Option>
                                                        <Option value="6">Địa</Option>
                                                        <Option value="13">Khác</Option>
                                                    </Select>
                                                    : null
                                            }
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
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
                                </Row>

                                {type == "EXAM" ?
                                    <Row>
                                        <Col span={16}>
                                            <Form.Item
                                                name="registerDuetime"
                                                // label='Ngày sinh'
                                                label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Hết hạn đăng ký lúc</span>}
                                            // rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
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
                                                // label='Ngày sinh'
                                                label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Ngày</span>}
                                            // rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
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
                                                // label='Ngày sinh'
                                                label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Đề thi mở lúc</span>}
                                            // rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
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
                                                name="openDueDate"
                                                // label='Ngày sinh'
                                                label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Ngày</span>}
                                            // rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
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
                                                name='flutation'
                                                label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Được phép trễ (phút)</span>}
                                                // rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                                                style={{ borderRadius: '7px' }}
                                            >
                                                <Input style={{ height: '36px', fontSize: '16px', fontWeight: '400', width: '25%' }}
                                                // onChange={onFullnameChanged} 
                                                />
                                            </Form.Item>

                                        </Col>
                                        <Col span={8}>
                                        </Col>
                                    </Row>
                                    : null
                                }


                                <Row>
                                    <Col span={16}>
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
                                    <Col span={8}>
                                    </Col>
                                </Row>



                            </Card>

                        </Col>
                        <Col span={5}>
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
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                >
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                                <Modal
                                    visible={previewVisible}
                                    title={previewTitle}
                                    footer={null}
                                    onCancel={handleCancel}
                                >
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
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

            </Spin>


        </EditTestInfoWrapper>
    );
}

export default EditTestInfo;
