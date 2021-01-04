import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Card, Radio, DatePicker, Select } from "antd";
import { AddStudentWrapper } from "./AddStudentStyle";
import { BackgroundWrapper } from "./AddStudentStyle";
import { addAccountAPI } from "app/api/user";
import { notification, Typography, Spin, Row, Col } from "antd";
import { useDispatch, useSelector } from 'react-redux';
// uhm
import { nanoid } from '@reduxjs/toolkit';
import { addStudent } from 'app/store/student';
import { updateNotRegisterByAddStudent } from 'app/store/quiz';
import { useHistory } from "react-router-dom";
// uhm

import { UserAddOutlined } from '@ant-design/icons';

import {
  createNewStudentAPI
} from 'app/api/user';

const { Option } = Select;
const RadioGroup = Radio.Group;

const layout1 = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 }
};

const layout2 = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const validateMessages = {
  required: "${label} là thông tin bắt buộc!",
  types: {
    email: "${label} is not validate email!",
    number: "${name} is not a validate number!"
  },
  number: {
    range: "${label} must be between ${min} and ${max}"
  }
};

function AddStudent() {
  const { Title } = Typography;

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [emailValidate, setEmailValidate] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  // const onFullnameChanged = e => setFullname(e.target.value)
  // const onEmailChanged = e => setEmail(e.target.value)

  const onFinish = async (values) => {
    // prepare data
    // let birthday = values.birthday.getValue().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    values.birthday = values.birthday.format('YYYY/MM/DD');
    console.log(values);

    try {
      setAddLoading(true);
      let res = await createNewStudentAPI(values);
      console.log(res);

      // handle exist email
      if ('errors' in res) {
        setAddLoading(false);
        setEmailValidate(true);
      }
      else {
        console.log('Helo..........................................')
        let studentInfo = values;
        studentInfo._id = res.id;
        studentInfo.ID = res.ID;
        await dispatch(addStudent(studentInfo));
        await dispatch(updateNotRegisterByAddStudent({fullname: studentInfo.fullname, _id: res.id}));

        console.log(res)
        if (res.code === 1) {
          notification.success({
            message: "Thêm học sinh thành công!",
            duration: "2"
          });
          history.push("/student-list");
        }
      }

  
      
    } catch (error) { }
  };

  const [form] = Form.useForm();

  return (
    <AddStudentWrapper>
      <Spin tip="Đang thêm học viên..." spinning={addLoading}>
        <Form
          form={form}
          style={{
            // marginLeft: "10px" 
          }}
          {...layout2}
          name='nest-messages'
          onFinish={onFinish}
          onFinishFailed={values => {
            console.log("fail");
          }}
          validateMessages={validateMessages}
        >

          <Row
            style={{marginTop: '30px'}}
            gutter={[16, 16]}
          >
            <Col
              sm={24}
              xl={12}
              style={{ paddingRight: 30 }}
            >
              <Card
                title='Thông tin cá nhân'
                bordered={false}
                style={{ minWidth: '210px' }}
              >
                <Form.Item
                  name='fullname'
                  label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Họ và tên</span>}
                  rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                  style={{ borderRadius: '7px' }}
                >
                  <Input style={{ height: '36px', fontSize: '16px', fontWeight: '400' }}
                  // onChange={onFullnameChanged} 
                  />
                </Form.Item>

                <Form.Item
                  name='email'
                  label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Email</span>}
                  rules={[{ type: "email", required: true, message: <p style={{color: '#F82C4D'}}>Thông tin bắt buộc</p> }]}
                  validateStatus={emailValidate ? "error" : null}
                  help={emailValidate ? "Email đã được đăng ký!" : null}
                >
                  <Input style={{ height: '36px', fontSize: '16px', fontWeight: '400' }}
                  // onChange={onEmailChanged} 
                  />
                </Form.Item>

                <Form.Item
                  name="birthday"
                  // label='Ngày sinh'
                  label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Ngày sinh</span>}
                  rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                >
                  <DatePicker
                    format="YYYY/MM/DD"
                    size="large"
                    style={{ height: '36px', borderRadius: '6px' }}
                    placeholder=""
                  />
                </Form.Item>

                <Form.Item
                  name='sex'
                  // label='Giới tính'
                  label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Giới tính</span>}
                  rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
                >
                  <RadioGroup>
                    <Radio value="MALE" style={{ fontSize: '16px', fontWeight: '400' }}>Nam</Radio>
                    <Radio value="FEMALE" style={{ fontSize: '16px', fontWeight: '400' }}>Nữ</Radio>
                    <Radio value="OTHER" style={{ fontSize: '16px', fontWeight: '400' }}>Khác</Radio>
                  </RadioGroup>
                </Form.Item>

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
              </Card>
            </Col>
            <Col
              sm={24}
              xl={12}
              style={{ paddingRight: 30 }}
            >
              <Card
                title='Thông tin trường'
                bordered={false}
                style={{ minWidth: '210px' }}
              >
                <Form.Item
                  name='school'
                  // label='Tên trường'
                  label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Tên trường</span>}
                // rules={[{ required: true }]}
                >
                  <Input style={{ height: '36px', fontSize: '16px', fontWeight: '400' }} />
                </Form.Item>

                <Form.Item
                  name='teacher'
                  // label='Giáo viên'
                  label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Giáo viên</span>}
                >
                  <Input style={{ height: '36px', fontSize: '16px', fontWeight: '400' }} />
                </Form.Item>

                <Form.Item
                  name='teacherEmail'
                  // label='Email giáo viên'
                  label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Email giáo viên</span>}
                  rules={[{ type: "email" }]}
                >
                  <Input style={{ height: '36px', fontSize: '16px', fontWeight: '400', maxWidth: '250px' }} />
                </Form.Item>

                <Form.Item
                  name='schoolEmail'
                  // label='Email trường'
                  label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Email trường</span>}
                  rules={[{ type: "email" }]}
                >
                  <Input style={{ height: '36px', fontSize: '16px', fontWeight: '400', maxWidth: '250px' }} />
                </Form.Item>

                <Form.Item
                  // label='Địa chỉ trường'
                  label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Địa chỉ trường</span>}
                >
                  <Form.Item
                    name='commune'
                    style={{
                      display: "inline-block",
                      width: "calc(32% - 0px)",
                      margin: "0 2px"
                    }}
                  >
                    <Input placeholder='Xã/Phường' style={{ height: '36px', fontSize: '16px', fontWeight: '400' }} />
                  </Form.Item>

                  <Form.Item
                    name='district'
                    style={{
                      display: "inline-block",
                      width: "calc(33% - 0px)",
                      margin: "0 2px"
                    }}
                  // rules={[{ type: "number", min: 1, max: 12 }]}
                  >
                    <Input placeholder='Quận/Huyện' style={{ height: '36px', fontSize: '16px', fontWeight: '400' }} />
                  </Form.Item>

                  <Form.Item
                    name='province'
                    style={{
                      display: "inline-block",
                      width: "calc(30% - 0px)",
                      margin: "0 2px"
                    }}
                  >
                    <Input placeholder='Tỉnh' style={{ height: '36px', fontSize: '16px', fontWeight: '400' }} />
                  </Form.Item>
                </Form.Item>
              </Card>
            </Col>
          </Row>

          <div style={{ paddingTop: "4px" }}>
            <Button
              className="add-button"
              size='large'
              htmlType='submit'
              style={{ borderRadius: '6px' }}
            >
              Thêm học sinh
              </Button>
          </div>
        </Form>
      </Spin>
    </AddStudentWrapper>
  );
}

export default AddStudent;
