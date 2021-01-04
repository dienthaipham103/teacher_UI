import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Card, Radio, DatePicker, Select, Space, Avatar, Skeleton } from "antd";
import { EditStudentWrapper } from "./EditStudentStyle";
import { BackgroundWrapper } from "./EditStudentStyle";
import { addAccountAPI } from "app/api/user";
import { notification, Typography, Spin, Row, Col } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
// uhm
import { nanoid } from '@reduxjs/toolkit';
import { editStudent } from 'app/store/student';
import { useParams, useHistory } from "react-router-dom";
// uhm

import { ProfileOutlined } from '@ant-design/icons';

import {
  selectStudentById,
  selectAllStudent
} from 'app/store/student';

import {
  editStudentAPI
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

function EditStudent() {
  const { Title } = Typography;

  const { studentId } = useParams();

  const [fullname, setFullname] = useState("");
  const [ID, setID] = useState("");
  const [sex, setSex] = useState("");
  const [birthday, setBirthday] = useState("");
  const [grade, setGrade] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [teacher, setTeacher] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [commune, setCommune] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");



  const studentInfo0 = useSelector((state) =>
    state.student.studentList.find((student) => student._id === studentId));

  const loadingStudentStatus = useSelector(state =>
    state.student.status
  );

  useEffect(() => {
    if (loadingStudentStatus === "succeeded") {
      // get data
      setFullname(studentInfo0.fullname);
      setID(studentInfo0.ID);
      setSex(studentInfo0.sex);
      setBirthday(studentInfo0.birthday);
      setGrade(studentInfo0.grade);
      setEmail(studentInfo0.email);
      setSchool(studentInfo0.school);
      setTeacher(studentInfo0.teacher);
      setTeacherEmail(studentInfo0.teacherEmail);
      setSchoolEmail(studentInfo0.schoolEmail);
      setCommune(studentInfo0.commune);
      setDistrict(studentInfo0.district);
      setProvince(studentInfo0.province);
    }
  }, [loadingStudentStatus]);



  const studentInfo1 = {}

  const [fullnameValidate, setfullnameValidate] = useState(false);
  const [emailValidate, setEmailValidate] = useState(false);
  const [birthdayValidate, setBirthdayValidate] = useState(false);
  const [sexValidate, setSexValidate] = useState(false);
  const [gradeValidate, setGradeValidate] = useState(false);
  let x = true;

  // const [fullname, setFullname] = useState(studentInfo0.fullname);
  // const [email, setEmail] = useState(studentInfo0.email);
  // console.log('---------------', studentInfo0.birthday);

  const [editLoading, setEditLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  // const onFullnameChanged = e => setFullname(e.target.value)
  // const onEmailChanged = e => setEmail(e.target.value)
  const label = (fullname) => {
    let label = "";
    if (fullname.length > 0) {
      for (let i = fullname.length - 1; i--; i >= 0) {
        if (fullname[i] === " ") {
          label = fullname[i + 1]
          break;
        }
      }

      if (label === "") {
        label = fullname[0]
      }
    }
    return label
  }

  const onFinish = async (values) => {
    setfullnameValidate(false);
    setEmailValidate(false);
    setBirthdayValidate(false);
    setSexValidate(false);
    setGradeValidate(false);

    x = true;
    console.log(values);
    if (Object.values(values).every(x => (x === undefined))) {
      console.log('Not change');
      notification.warning({
        message: "Thông tin chưa được thay đổi!",
        duration: "3"
      });
    }
    else {
      for (const [key, value] of Object.entries(values)) {
        if (values[key] !== undefined) {
          studentInfo1[key] = values[key];

          // set validation if required box is empty
          if (values[key] === "") {
            switch (key) {
              case 'fullname':
                x = false;
                setfullnameValidate(true);
                break;
              case 'email':
                x = false;
                setEmailValidate(true);
                break;
              case 'birthday':
                x = false;
                setBirthdayValidate(true);
                break;
              case 'sex':
                x = false;
                setSexValidate(true);
                break;
              case 'grade':
                x = false;
                setGradeValidate(true);
                break;
            }
          }
          if (values[key] == null) {
            x = false;
            setBirthdayValidate(true);
          }
        }
      }
      if (x) {
        try {
          setEditLoading(true);
          let res = await editStudentAPI({ data: studentInfo1, id: studentId });
          if (res.code === 1) {
            notification.success({
              message: "Cập nhật thông tin thành công!",
              duration: "2"
            });

            history.push(`/student-profile/${studentId}`); // be careful with the order
            await dispatch(editStudent({ data: studentInfo1, id: studentId }));

          }
        } catch (error) { }
      }
      console.log(studentInfo1)
    }

  };

  const [form] = Form.useForm();

  return (
    <EditStudentWrapper>
      <Skeleton loading={!(loadingStudentStatus === "succeeded")}>
        <Spin tip="Đang cập nhật..." spinning={editLoading}>
          <div className="container">
            <div className="item">
              <Avatar style={{ color: '#272755', backgroundColor: '#a5dff8' }} size={64}>
                {/* {label(studentInfo0.fullname)} */}
                {label(fullname)}
              </Avatar>
            </div>
            <div className="item">
              <Title level={3}>
                {/* {studentInfo0.fullname} */}
                {fullname}
              </Title>
            </div>
          </div>

          <Form
            form={form}
            // style={{ marginLeft: "10px" }}
            {...layout2}
            name='nest-messages'
            onFinish={onFinish}
            onFinishFailed={values => {
              console.log("fail");
            }}
            validateMessages={validateMessages}
          >
            <div className='bg'>
              {/* <Title level={3} style={{ paddingTop: "25px", paddingBottom: "15px" }}>
              <ProfileOutlined style={{ marginRight: '10px' }} />Cập nhật thông tin
            </Title> */}

              <Row
                style={{ marginTop: '20px' }}
                gutter={[16, 16]}

              >
                <Col
                  sm={24}
                  xl={12}
                  style={{ paddingRight: 30, display: 'flex' }}
                >
                  <Card
                    title='Thông tin cá nhân'
                    bordered={false}
                    style={{ minWidth: '210px', width: '100%' }}
                  >
                    <Form.Item
                      name='fullname'
                      label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Họ và tên</span>}
                      // rules={[{ required: true }]}
                      validateStatus={fullnameValidate ? "error" : null}
                      help={fullnameValidate ? "Thông tin bắt buộc" : null}
                      // validateStatus="error"
                      // help="hhhhh"
                      style={{ borderRadius: '7px' }}
                    >
                      {
                        fullname !== "" ?
                          <Input
                            style={{ height: '36px', fontSize: '16px', fontWeight: '400' }}
                            // defaultValue={studentInfo0.fullname}
                            defaultValue={fullname}
                          // onChange={onFullnameChanged} 
                          />
                          :
                          null
                      }
                    </Form.Item>

                    <Form.Item
                      name='birthday'
                      label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Ngày sinh</span>}
                      validateStatus={birthdayValidate ? "error" : null}
                      help={birthdayValidate ? "Thông tin bắt buộc" : null}
                    >
                      {
                        birthday !== "" ?
                          <DatePicker
                            format="YYYY/MM/DD"
                            style={{ height: '36px', borderRadius: '6px' }}
                            size="large"
                            defaultValue={moment(birthday, "YYYY/MM/DD")}
                            placeholder="Chọn ngày sinh"
                          />
                          : null
                      }

                    </Form.Item>

                    <Form.Item
                      name='sex'
                      label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Giới tính</span>}
                      validateStatus={sexValidate ? "error" : null}
                      help={sexValidate ? "Thông tin bắt buộc" : null}
                    >
                      {
                        sex !== "" ?
                          <RadioGroup
                            defaultValue={sex}
                          >
                            <Radio value="MALE" style={{ fontSize: '16px', fontWeight: '400' }}>Nam</Radio>
                            <Radio value="FEMALE" style={{ fontSize: '16px', fontWeight: '400' }}>Nữ</Radio>
                            <Radio value="OTHER" style={{ fontSize: '16px', fontWeight: '400' }}>Khác</Radio>
                          </RadioGroup>
                          : null
                      }
                    </Form.Item>

                    <Form.Item
                      name='grade'
                      label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Lớp</span>}
                      validateStatus={gradeValidate ? "error" : null}
                      help={gradeValidate ? "Thông tin bắt buộc" : null}
                    >
                      {
                        grade !== "" ?
                          <Select
                            style={{ width: 120, fontSize: '16px', fontWeight: '900' }}
                            placeholder="Chọn lớp"
                            defaultValue={grade}
                            size="default"
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
                  </Card>
                </Col>
                <Col
                  sm={24}
                  xl={12}
                  style={{
                    display: 'flex'
                  }}
                >
                  <Card
                    title='Thông tin trường'
                    bordered={false}
                    style={{ minWidth: '210px', width: '100%' }}
                  >
                    <Form.Item
                      name='school'
                      label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Tên trường</span>}
                    >
                      {
                        school !== "" ?
                          <Input
                            style={{ height: '36px', fontSize: '16px', fontWeight: '400' }}
                            defaultValue={school}
                          />
                          : null
                      }

                    </Form.Item>

                    <Form.Item
                      name='teacher'
                      label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Giáo viên</span>}
                    >
                      {
                        teacher !== "" ?
                          <Input
                            style={{ height: '36px', fontSize: '16px', fontWeight: '400' }}
                            defaultValue={teacher}
                          />
                          : null
                      }
                    </Form.Item>

                    <Form.Item
                      name='teacherEmail'
                      // label='Email giáo viên'
                      label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Email giáo viên</span>}
                      rules={[{ type: "email" }]}
                    >
                      {
                        teacherEmail !== "" ?
                          <Input
                            style={{ height: '36px', fontSize: '16px', fontWeight: '400', maxWidth: '250px' }}
                            defaultValue={teacherEmail}
                          />
                          : null
                      }
                    </Form.Item>

                    <Form.Item
                      name='schoolEmail'
                      // label='Email trường'
                      label={<span style={{ color: '#000', fontSize: '16px', fontWeight: '900' }}>Email trường</span>}
                      rules={[{ type: "email" }]}
                    >
                      {
                        schoolEmail !== "" ?
                          <Input
                            style={{ height: '36px', fontSize: '16px', fontWeight: '400', maxWidth: '250px' }}
                            defaultValue={schoolEmail}
                          />
                          : null
                      }

                    </Form.Item>

                    <Form.Item
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
                        {
                          commune !== "" ?
                            <Input
                              placeholder='Xã/Phường'
                              style={{ height: '36px', fontSize: '16px', fontWeight: '400' }}
                              defaultValue={commune}
                            />
                            : null
                        }

                      </Form.Item>

                      <Form.Item
                        name='district'
                        style={{
                          display: "inline-block",
                          width: "calc(33% - 0px)",
                          margin: "0 2px"
                        }}
                      >
                        {
                          district !== "" ?
                            <Input
                              placeholder='Quận/Huyện'
                              style={{ height: '36px', fontSize: '16px', fontWeight: '400' }}
                              defaultValue={district}
                            />
                            : null
                        }
                      </Form.Item>

                      <Form.Item
                        name='province'
                        style={{
                          display: "inline-block",
                          width: "calc(30% - 0px)",
                          margin: "0 2px"
                        }}
                      >
                        {
                          province !== "" ?
                            <Input
                              placeholder='Tỉnh'
                              style={{ height: '36px', fontSize: '16px', fontWeight: '400' }}
                              defaultValue={province}
                            />
                            : null
                        }
                      </Form.Item>
                    </Form.Item>
                  </Card>
                </Col>
              </Row>

              <Space size="small" style={{ paddingTop: "12px", paddingBottom: '30px' }}>
                <Button
                  className="edit-button"
                  size='large'
                  // type="primary" 
                  htmlType='submit'
                  style={{ borderRadius: '6px' }}>
                  Cập nhật
              </Button>
                <Button
                  className="cancel-button"
                  size='large'
                  style={{ borderRadius: '6px' }}
                  onClick={() => { history.push(`/student-profile/${studentId}`) }}
                >
                  Hủy
              </Button>
              </Space>
            </div>
          </Form>
        </Spin>
      </Skeleton>

    </EditStudentWrapper>
  );
}

export default EditStudent;
