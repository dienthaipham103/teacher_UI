import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectAllStudent,
    getAllStudent,
    changeFirstLoading
} from 'app/store/student';
import { StudentListWrapper } from './StudentListStyle';
import { Timeline, Card, Typography, Skeleton, Divider, Descriptions, PageHeader, Col, Row, Input, Select, Button, Form, Space } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import MainLogin from 'assets/images/main-logo.png';

import { TeamOutlined, LineChartOutlined, RiseOutlined } from '@ant-design/icons';


function StudentList() {
    const { Title, Text } = Typography;
    const { Option } = Select;
    const [form] = Form.useForm();

    // const [selected, setSelected] = useState(true);

    // handler
    // const clearSelected = () => {
    //     setSelected(!selected);
    // }


    const renderContent = (column = 2) => (
        <Descriptions size='default' column={column}>
            <Descriptions.Item>
                <Title level={2}>Quản lí các học viên cùng WiiQuiz</Title>
            </Descriptions.Item>
        </Descriptions>
    );
    const Content = ({ children, extra }) => {
        return (
            <div className='content'>
                <div className='main'>{children}</div>
                <div className='extra'>{extra}</div>
            </div>
        );
    };

    // useEffect(() => {
    //     if (firstLoading) {
    //         dispatch(getAllStudent({}));
    //         dispatch(changeFirstLoading());
    //     }
    // }, []);

    const dispatch = useDispatch();
    const history = useHistory();

    const [quizButtonClick, setQuizButtonClick] = useState(false);
    const [cardHover, setCardHover] = useState(null);

    const [filteredValue, setFilteredValue] = useState("");
    const [field, setField] = useState("");
    const getStudentStatus = useSelector(state => state.student.status);
    // const firstLoading = useSelector(state => state.student.firstLoading);
    const allStudent = useSelector(selectAllStudent);
    const [filteredStudents, setFilteredStudents] = useState("");
    console.log('Hello.....', allStudent);
    console.log('Hello.....', filteredStudents);

    // get list of fullnames
    let fullnames = []
    allStudent.map((student) => (
        fullnames.push(student.fullname)
    ));
    console.log(allStudent);
    fullnames = [...new Set(fullnames)];
    const nameOptions = fullnames.map((fullname, index) => (
        <Option key={index} value={fullname}>{<p style={{ fontSize: '16px', padding: '0px', margin: '0px', fontWeight: '500' }}>{fullname}</p>}</Option>
    ));

    // get list of grades
    let sex = [['Nam', 'MALE'], ['Nữ', 'FEMALE'], ['Khác', 'OTHER']];
    const sexOptions = sex.map((x, index) => (
        <Option key={index} value={x[1]}>{<p style={{ fontSize: '16px', padding: '0px', margin: '0px', fontWeight: '500' }}>{x[0]}</p>}</Option>
    ));

    // get list of grade
    let grades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
    const gradeOptions = grades.map((x, index) => (
        x == '13' ? <Option key={index} value={x}>{<p style={{ fontSize: '16px', padding: '0px', margin: '0px', fontWeight: '500' }}>Khác</p>}</Option> :
            <Option key={index} value={x}>{<p style={{ fontSize: '16px', padding: '0px', margin: '0px', fontWeight: '500' }}>{x}</p>}</Option>
    ));
    // let gradeShow = true;

    function handleChange(values) {
        // gradeShow = "";
        // clearSelected();
        // onFinish()
        setField(values);
        // clearSelected();

    }

    // function onFinish(){
    //     form.resetFields();
    // }

    function handleFilterChange(values) {
        // clearSelected();
        setFilteredValue(values);
        // setGradeShow(true);
        // console.log(filteredValue);
        console.log(filteredValue);
    }

    function handleClick() {
        // console.log('---------');
        if ((filteredValue != "Tất cả") && (filteredValue != "")) {
            console.log('******');
            if (field == "1") {
                // let students = allStudent.filter(x => x.fullname == filteredValue);
                setFilteredStudents(allStudent.filter(x => x.fullname == filteredValue));
            }
            else if (field == "2") {
                let students = allStudent.filter(x => x.grade == filteredValue);
                if (students.length == 0) {
                    setFilteredStudents([{}]);
                }
                else {
                    setFilteredStudents(students);
                }
            }
            else if (field == "3") {
                // let students = allStudent.filter(x => x.sex == filteredValue);
                setFilteredStudents(allStudent.filter(x => x.sex == filteredValue));
            }

            // setFilteredStudents(students);
            console.log(filteredStudents);
        }
        else {
            setFilteredStudents(allStudent);
        }
    }

    const renderStudentList = (filteredStudents == "" ? allStudent : filteredStudents).map((student) => (
        <Col
            sm={24}
            xl={8}
            style={{
                paddingRight: 30,
                display: 'flex'
            }}
            key={student._id}
        >
            {student.ID != null ?
                <Card
                    title={student.fullname}
                    bordered={false}
                    hoverable={true}
                    style={{
                        width: '100%',
                        marginTop: cardHover == student._id ? '10px' : '15px',
                        marginBottom: cardHover == student._id ? '15px' : '10px',
                    }}
                    onMouseEnter={() => {
                        setCardHover(student._id);
                    }}
                    onMouseLeave={() => {
                        setCardHover(null);
                    }}
                    onClick={() => {
                        if (quizButtonClick == false) {
                            history.push(`/student-profile/${student._id}`);
                        }
                    }}
                >
                    <p style={{ color: 'gray' }}><span style={{ fontWeight: 'bold', color: '#000', marginRight: '6px' }}>ID: </span>
                        {student.ID}</p>
                    <p style={{ color: 'gray' }}><span style={{ fontWeight: 'bold', color: '#000', marginRight: '6px' }}>Email: </span>
                        {student.email}</p>

                    <div style={{ marginBottom: '0px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* <Link
                            onMouseEnter={() => {
                                setQuizButtonClick(true);
                            }}
                            onMouseLeave={() => {
                                setQuizButtonClick(false);
                            }}
                            to={`/student-practice/${student._id}`}
                            className="button muted-button"
                        >
                            Luyện tập
                        </Link> */}

                        <Link
                            className="my-link"
                            // style={{ fontSize: '16px', fontWeight: '900', color: 'gray' }}
                            onMouseEnter={() => {
                                setQuizButtonClick(true);
                            }}
                            onMouseLeave={() => {
                                setQuizButtonClick(false);
                            }}
                            to={`/student-practice/${student._id}`}
                        >
                            <RiseOutlined style={{ marginRight: '10px' }} />Luyện tập
                        </Link>

                        {/* <Link to={`/student-quiz/${student._id}`} className="button muted-button">
                            Bài thi
                        </Link> */}
                        <Button
                            size="large"
                            className="quiz-button"
                            style={{ borderRadius: '5px', fontSize: '16px' }}
                            onMouseEnter={() => {
                                setQuizButtonClick(true);
                            }}
                            onMouseLeave={() => {
                                setQuizButtonClick(false);
                            }}
                            onClick={() => {
                                history.push(`/student-quiz/${student._id}`)
                            }}
                        >
                            Bài thi
                        </Button>
                    </div>
                </Card>
                : null
            }

        </Col>
    ))

    return (
        <StudentListWrapper>
            {/* <div
                style={{
                    backgroundColor: '#d4d5f5', paddingTop: '20px', paddingBottom: '20px',
                    borderRadius: '2px',
                    // boxShadow: '0px 3px 3px 0px #d4d5f5' 
                    boxShadow: '3px 3px 3px 3px #D7D8D9',
                    minWidth: '260px'
                }}>
                <PageHeader
                    avatar={{ src: MainLogin }}
                    className='site-page-header-responsive'
                    title='WiiQuiz'
                    subTitle='Nền tảng thi online '
                >
                    <Content>{renderContent()}</Content>

                    <div className="search-container">
                        <div
                            className="search-item"
                        >
                            <span style={{ fontStyle: 'italic', color: '#1273EB', fontSize: '16px' }}>Tìm kiếm học viên theo: </span>
                        </div>
                        <div
                            className="search-item"
                        >
                            <Select
                                style={{ borderRadius: '5px', minWidth: '80px' }}
                                placeholder="Chọn"
                                // defaultValue="0"
                                size="default"
                                onChange={handleChange}
                            >
                                <Option value="1">Tên</Option>
                                <Option value="2">Lớp</Option>
                                <Option value="3">Giới tính</Option>
                            </Select>
                        </div>
                        <div
                            className="search-item"
                        >
                            {field == "1" &&
                                <Select
                                    style={{ borderRadius: '5px', minWidth: '160px' }}
                                    // defaultValue="Tất cả"
                                    // value="Tất cả"
                                    // placeholder="Giá trị"
                                    size="default"
                                    onChange={handleFilterChange}
                                >
                                    <Option value="Tất cả">Tất cả</Option>
                                    {nameOptions}
                                </Select>
                            }
                            {field == "2" &&
                                <Select
                                    style={{ borderRadius: '3px', minWidth: '160px' }}
                                    // defaultValue="Tất cả"
                                    // value="Tất cả"
                                    // placeholder="Giá trị"
                                    size="default"
                                    onChange={handleFilterChange}
                                >
                                    <Option value="Tất cả">Tất cả</Option>
                                    {gradeOptions}
                                </Select>
                            }
                            {field == "3" &&
                                <Select
                                    style={{ borderRadius: '3px', minWidth: '160px' }}
                                    // defaultValue="Tất cả"
                                    // value="Tất cả"
                                    // placeholder="Giá trị"
                                    size="default"
                                    onChange={handleFilterChange}
                                >
                                    <Option value="Tất cả">Tất cả</Option>
                                    {sexOptions}
                                </Select>
                            }
                        </div>
                        <div
                            className="search-item"
                        >
                            <Button type="primary" onClick={handleClick}>Tìm kiếm</Button>
                        </div>
                    </div>


                </PageHeader>
            </div> */}

            <div className="search-container">
                <div
                    className="search-item"
                >
                    <span style={{ fontStyle: 'italic', color: '#1273EB', fontSize: '16px' }}>Tìm kiếm học viên theo: </span>
                </div>
                <div
                    className="search-item"
                >
                    <Select
                        style={{ borderRadius: '5px', minWidth: '100px' }}
                        placeholder={<p style={{ color: '#000' }}>Chọn</p>}
                        // defaultValue="0"
                        size="default"
                        onChange={handleChange}
                    >
                        <Option value="1">{<p style={{ fontSize: '16px', padding: '0px', margin: '0px', fontWeight: '500' }}>Tên</p>}</Option>
                        <Option value="2">{<p style={{ fontSize: '16px', padding: '0px', margin: '0px', fontWeight: '500' }}>Lớp</p>}</Option>
                        <Option value="3">{<p style={{ fontSize: '16px', padding: '0px', margin: '0px', fontWeight: '500' }}>Giới tính</p>}</Option>
                    </Select>
                </div>
                <div
                    className="search-item"
                >
                    {field == "1" &&
                        <Select
                            style={{ borderRadius: '5px', minWidth: '180px' }}
                            // defaultValue="Tất cả"
                            // value="Tất cả"
                            // placeholder="Giá trị"
                            size="default"
                            onChange={handleFilterChange}
                        >
                            <Option value="Tất cả">{<p style={{ fontSize: '16px', padding: '0px', margin: '0px', fontWeight: '500' }}>Tất cả</p>}</Option>
                            {nameOptions}
                        </Select>
                    }
                    {field == "2" &&
                        <Select
                            style={{ borderRadius: '3px', minWidth: '180px' }}
                            // defaultValue="Tất cả"
                            // value="Tất cả"
                            // placeholder="Giá trị"
                            size="default"
                            onChange={handleFilterChange}
                        >
                            <Option value="Tất cả">{<p style={{ fontSize: '16px', padding: '0px', margin: '0px', fontWeight: '500' }}>Tất cả</p>}</Option>
                            {gradeOptions}
                        </Select>
                    }
                    {field == "3" &&
                        <Select
                            style={{ borderRadius: '3px', minWidth: '160px' }}
                            // defaultValue="Tất cả"
                            // value="Tất cả"
                            // placeholder="Giá trị"
                            size="default"
                            onChange={handleFilterChange}
                        >
                            <Option value="Tất cả">{<p style={{ fontSize: '16px', padding: '0px', margin: '0px', fontWeight: '500' }}>Tất cả</p>}</Option>
                            {sexOptions}
                        </Select>
                    }
                </div>
                <div
                    className="search-item"
                >
                    <Button
                        type="primary"
                        onClick={handleClick}
                        size="large"
                    >
                        Tìm kiếm
                    </Button>
                </div>
            </div>

            <Title level={3} style={{ paddingBottom: "10px", paddingTop: "20px" }}>
                <TeamOutlined style={{ marginRight: '10px' }} />Tất cả học viên
            </Title>
            <Skeleton active loading={getStudentStatus !== 'succeeded'}>
                <div>
                    <Row gutter={[16, 16]}>
                        {renderStudentList}
                    </Row>
                </div>
            </Skeleton>
        </StudentListWrapper>
    )
}

export default StudentList;
