import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import { StudentProfileWrapper, ModalWrapper } from "./StudentProfileStyle";
import { Button, Modal } from 'antd';
import { Card, Spin } from 'antd';
import { notification, Popconfirm, message, Avatar, Typography, Col, Row, Space, Skeleton } from "antd";

import { deleteStudentAPI } from 'app/api/user';
import { deleteStudent } from 'app/store/student';
import { updateNotRegisterByRemoveStudent } from 'app/store/quiz';
import { CaretRightOutlined, SendOutlined, UserOutlined, HomeOutlined, GlobalOutlined, SearchOutlined, HistoryOutlined } from '@ant-design/icons';
import Trash from "assets/images/trash.png";


function StudentProfile() {
    const { Title, Text } = Typography;

    const { studentId } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [hover, setHover] = useState(false);
    // modal for delete feature
    const [visible, setVisible] = useState(false);
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

    const studentProfile = useSelector(state =>
        state.student.studentList.find(oneStudent => oneStudent._id === studentId)
    )

    const loadingStudentStatus = useSelector(state =>
        state.student.status
    )

    useEffect(() => {
        if (loadingStudentStatus === "succeeded") {
            // get data
            setFullname(studentProfile.fullname);
            setID(studentProfile.ID);
            setSex(studentProfile.sex);
            setBirthday(studentProfile.birthday);
            setGrade(studentProfile.grade);
            setEmail(studentProfile.email);
            setSchool(studentProfile.school);
            setTeacher(studentProfile.teacher);
            setTeacherEmail(studentProfile.teacherEmail);
            setSchoolEmail(studentProfile.schoolEmail);
            setCommune(studentProfile.commune);
            setDistrict(studentProfile.district);
            setProvince(studentProfile.province);
        }
    }, [loadingStudentStatus]);

    // get data
    // setFullname(studentProfile.fullname);
    // setID(studentProfile.ID);
    // setSex(studentProfile.sex);
    // setBirthday(studentProfile.birthday);
    // setGrade(studentProfile.grade);
    // setEmail(studentProfile.email);
    // setSchool(studentProfile.school);
    // setTeacher(studentProfile.teacher);
    // setTeacherEmail(studentProfile.teacherEmail);
    // setSchoolEmail(studentProfile.schoolEmail);
    // setCommune(studentProfile.commune);
    // setDistrict(studentProfile.district);
    // setProvince(studentProfile.province);

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

    const onClickDelete = async () => {
        try {
            setVisible(false);
            setDeleteLoading(true);
            let res = await deleteStudentAPI({ id: studentId });
            if (res.code === 1) {
                notification.success({
                    message: "Xóa học sinh thành công!",
                    duration: "2"
                });

                history.push("/student-list"); // be careful with the order
                await dispatch(deleteStudent(studentId));
                await dispatch(updateNotRegisterByRemoveStudent({ studentId: studentId }));

            }
        } catch (error) { }
    };

    const onClickEdit = () => {
        history.push(`/edit-student/${studentId}`);
    }

    return (
        <StudentProfileWrapper>
            <Skeleton loading={!(loadingStudentStatus === "succeeded")}>
                <Spin tip="Đang xóa..." spinning={deleteLoading}>
                    {/* <Text style={{ paddingBottom: '20', color: '#1273EB' }} type="secondary">Thông tin học viên</Text> */}
                    <div className="container">
                        <div className="item">
                            <Avatar style={{ color: '#272755', backgroundColor: '#a5dff8' }} size={64}>
                                {/* {label(studentProfile.fullname)} */}
                                {label(fullname)}
                            </Avatar>
                        </div>
                        <div className="item">
                            <Title level={3}>
                                {/* {studentProfile.fullname} */}
                                {fullname}
                            </Title>
                        </div>
                    </div>

                    <Row
                        gutter={[16, 16]}
                    >
                        <Col
                            sm={24}
                            xl={5}
                        >
                            <Button onClick={onClickEdit}
                                // type="primary"
                                className="edit-button"
                                size="large"
                                style={{ borderRadius: '6px' }}>
                                Cập nhật thông tin
                        </Button>
                        </Col>
                        <Col
                            sm={24}
                            xl={5}
                        // style={{ paddingRight: 30 }}
                        >
                            <Button
                                className="delete-button"
                                onClick={() => { setVisible(true) }}
                                size="large"
                            // style={{ borderRadius: '6px', color: 'red', borderColor: 'red' }}
                            >
                                Xóa học sinh
                        </Button>
                            <ModalWrapper>
                                <Modal
                                    // title="Basic Modal"
                                    // className='modal'
                                    closable={false}
                                    visible={visible}
                                    // onOk={onClickDelete}
                                    okText="Xóa"
                                    // onCancel={this.handleCancel}
                                    onCancel={() => setVisible(false)}
                                    cancelText="Hủy"
                                    footer={null}
                                    // footer={null}
                                    style={{
                                        borderRadius: '10px',
                                        background: '#fff',
                                        // color: '#fff',
                                        padding: '5px',
                                    }}
                                    maskStyle={{
                                        // borderRadius: '20px',
                                        // background: 'gray'
                                    }}
                                    bodyStyle={{
                                        borderRadius: '5px',
                                        // color: 'gray',
                                        background: '#fff',
                                        boxShadow: '0px 0px 3.5px 3.5px #fff'
                                    }}
                                    width={460}
                                // maskStyle={{backgroundColor: 'rgba(24,16,85,0.3)'}}
                                >
                                    {/* <p style={{ fontSize: '20px', fontWeight: '900', marginBottom: '0px' }}>Xóa học viên?</p> */}
                                    <Title level={4} style={{ fontWeight: '900', margin: '0px', padding: '0px', color: '#150C58' }}>
                                        <img className="trash-icon" src={Trash} style={{ marginRight: '10px', marginBottom: '8px' }} />
                                    Xóa học viên?
                                </Title>
                                    <hr style={{ height: '1px', border: 'none', backgroundColor: '#E5E5E6', marginTop: '10px', marginBottom: '10px' }} />
                                    <p style={{ fontSize: '16px', fontWeight: '400', marginBottom: '0px' }}>Bạn có chắc chắn muốn xóa học viên này không?</p>
                                    {/* Bạn chắc chắn muốn xóa học viên này? */}
                                    <Space size="large" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button
                                            onMouseEnter={() => {
                                                setHover(true);
                                            }}
                                            onMouseLeave={() => {
                                                setHover(false);
                                            }}
                                            size="large"
                                            style={{
                                                borderRadius: '5px', marginTop: '20px', fontSize: '17px', fontWeight: '900', borderColor: '#fff',
                                                color: '#1273EB',
                                                ...(hover ? { background: '#f3f3f4' } : null)
                                            }}
                                            onClick={() => setVisible(false)}
                                        >
                                            Thoát
                                    </Button>
                                        <Button
                                            type="primary"
                                            size="large"
                                            style={{ borderRadius: '5px', marginTop: '20px', fontSize: '16px', fontWeight: '900' }}
                                            onClick={onClickDelete}
                                        >
                                            Xóa
                                    </Button>
                                    </Space>

                                </Modal>
                            </ModalWrapper>

                        </Col>
                    </Row>

                    <Row
                        style={{ marginTop: '10px' }}
                        gutter={[16, 16]}
                    >
                        <Col
                            sm={24}
                            xl={12}
                            style={{ paddingRight: 30 }}
                        >
                            <Card
                                style={{ minWidth: '210px' }}
                                bordered={false}
                                hoverable
                            >
                                <Title level={5} style={{ marginBottom: '0px' }}><CaretRightOutlined style={{ marginRight: '10px' }} />ID</Title>
                                {/* <p>{studentProfile.ID}</p> */}
                                <p>{ID}</p>

                                <Title level={5} style={{ marginBottom: '0px' }}><UserOutlined style={{ marginRight: '10px' }} />Tên</Title>
                                {/* <p>{studentProfile.fullname}</p> */}
                                <p>{fullname}</p>

                                <Title level={5} style={{ marginBottom: '0px' }}><UserOutlined style={{ marginRight: '10px' }} />Giới tính</Title>
                                {/* {studentProfile.sex == "MALE" &&
                                <p>Nam</p>
                            }
                            {studentProfile.sex == "FEMALE" &&
                                <p>Nữ</p>
                            }
                            {studentProfile.sex == "OTHER" &&
                                <p>Khác</p>
                            } */}
                                {sex == "MALE" &&
                                    <p>Nam</p>
                                }
                                {sex == "FEMALE" &&
                                    <p>Nữ</p>
                                }
                                {sex == "OTHER" &&
                                    <p>Khác</p>
                                }

                                <Title level={5} style={{ marginBottom: '0px' }}><HistoryOutlined style={{ marginRight: '10px' }} />Ngày sinh</Title>
                                {/* <p>{studentProfile.birthday ? studentProfile.birthday.substring(0, 10) : null}</p> */}
                                <p>{birthday ? birthday.substring(0, 10) : null}</p>

                                <Title level={5} style={{ marginBottom: '0px' }}><HomeOutlined style={{ marginRight: '10px' }} />Lớp</Title>
                                {/* <p>{studentProfile.grade}</p> */}
                                <p>{grade}</p>

                                <Title level={5} style={{ marginBottom: '0px' }}><GlobalOutlined style={{ marginRight: '10px' }} />Email</Title>
                                {/* <p>{studentProfile.email}</p> */}
                                <p>{email}</p>
                            </Card>
                        </Col>
                        <Col
                            sm={24}
                            xl={12}
                            style={{ paddingRight: 30 }}
                        >
                            <Card
                                style={{ minWidth: '210px' }}
                                bordered={false}
                                hoverable>
                                {/* <Title level={4} style={{color: "#1273EB"}}>Thông tin trường</Title> */}

                                <Title level={5} style={{ marginBottom: '0px' }}><HomeOutlined style={{ marginRight: '10px' }} />Tên trường</Title>
                                {/* <p style={{ marginLeft: '26px' }}>{studentProfile.school}</p> */}
                                <p style={{ marginLeft: '26px' }}>{school}</p>

                                <Title level={5} style={{ marginBottom: '0px' }}><UserOutlined style={{ marginRight: '10px' }} />Giáo viên</Title>
                                {/* <p style={{ marginLeft: '26px' }}>{studentProfile.teacher}</p> */}
                                <p style={{ marginLeft: '26px' }}>{teacher}</p>

                                <Title level={5} style={{ marginBottom: '0px' }}><GlobalOutlined style={{ marginRight: '10px' }} />Email giáo viên</Title>
                                {/* <p style={{ marginLeft: '26px' }}>{studentProfile.teacherEmail}</p> */}
                                <p style={{ marginLeft: '26px' }}>{teacherEmail}</p>

                                <Title level={5} style={{ marginBottom: '0px' }}><GlobalOutlined style={{ marginRight: '10px' }} />Email trường</Title>
                                {/* <p style={{ marginLeft: '26px' }}>{studentProfile.schoolEmail}</p> */}
                                <p style={{ marginLeft: '26px' }}>{schoolEmail}</p>

                                <Title level={5} style={{ marginBottom: '0px' }}><SearchOutlined style={{ marginRight: '10px' }} />Địa chỉ trường</Title>
                                <p style={{ marginBottom: '0px', marginLeft: '26px' }}>
                                    {/* Xã/Phường: {studentProfile.commune} */}
                                Xã/Phường: {commune}
                                </p>
                                <p style={{ marginBottom: '0px', marginLeft: '26px' }}>
                                    {/* Quận/Huyện: {studentProfile.district} */}
                                Quận/Huyện: {district}
                                </p>
                                <p style={{ marginBottom: '0px', marginLeft: '26px' }}>
                                    {/* Tỉnh: {studentProfile.province} */}
                                Tỉnh: {province}
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </Spin>
            </Skeleton>

        </StudentProfileWrapper>
    )
}

export default StudentProfile;
