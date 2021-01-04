import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, PageHeader, Card, Typography, Skeleton, Tabs, Select, Space, Modal, Table } from 'antd';
import { openModal } from 'app/store/modal';
import { PracticeWrapper } from './PracticeStyle';

import { CardPractice } from 'app/components/CardPractice';
import { getListQuizAPI } from 'app/api/quiz';
import { ASSGIN_CHILD_TO_TEST } from 'app/constants/modalName';
import { getChildOfQuizAPI } from 'app/api/user';
import { FolderOutlined, FileTextOutlined, UserOutlined, FieldTimeOutlined } from '@ant-design/icons';

import { onVisible, offVisible } from 'app/store/modal';
import AssignChildToTest from 'app/components/ModalManager/AssignChildToTest';

import { useParams, useHistory } from "react-router-dom";

import {
  selectAllQuiz,
} from 'app/store/quiz';
import { selectAllStudent, selectKeyStatus } from 'app/store/student';

import {
  getListPraticeAPI,
  getListExpiredQuizAPI
} from 'app/api/quiz';


function Practice() {
  const { Title } = Typography;
  const { Option } = Select;

  const [practices, setPratices] = useState([]);
  const [practicesLoading, setPraticesLoading] = useState(true);

  const [quizButtonClick, setQuizButtonClick] = useState(false);
  const [click, setClick] = useState(false);

  const [buttonLoading, setButtonLoading] = useState(false);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  // const columns = [{ title: "Tên", dataIndex: "fullname" }];
  const columns = [{
    title: () => { return (<p style={{ margin: '0px', fontSize: '16px', fontWeight: '900' }}>Tên</p>) },
    dataIndex: "fullname",
    render: text =>
      <p style={{ fontSize: '16px', margin: '0px', fontWeight: '500', color: '#667B89' }}>
        {text}
      </p>
  }];

  const rowSelection = {
    // type,
    selectedRowKeys,
    onChange: selectedRowKeys => {
      setSelectedRowKeys(selectedRowKeys);
    }
  };

  const allStudent = useSelector(selectAllStudent);
  const dataSource = allStudent.map(student => (
    { _id: student._id, fullname: student.fullname, key: student._id }
  ));

  // let dataSource;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    getPratices();
  }, []);

  const getPratices = async () => {
    try {
      // setExpiredQuizzesLoading(true);
      let res = await getListPraticeAPI();
      if (res.code === 1) {
        setPraticesLoading(false);
        setPratices(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <PracticeWrapper>
      <Title level={3}><FileTextOutlined style={{ marginRight: '10px' }} />Tất cả các bài luyện tập </Title>

      <Skeleton active loading={practicesLoading}>
        <div>
          <Row gutter={[16, 16]}>
            {practices.map(practice => (
              <Col sm={12} xl={8} style={{ paddingRight: 30 }} key={practice._id}>
                <CardPractice
                  quizOfStudent={false}
                  status={null}
                  quizId={practice._id}
                  studentId={null}
                  quizButtonClick={quizButtonClick}
                  title={practice.name}
                  imgUrl={practice.images.cover}
                  description={
                    practice.description.length < 60 ?
                      <div>
                        <p style={{ padding: '0px', margin: '0px' }}>
                          {practice.description}
                        </p>
                        <span style={{ color: '#fff' }}>{'.'.repeat(60 - practice.description.length)}</span>
                      </div>
                      :
                      <p>
                        {practice.description.substring(0, 60) + '...'}
                      </p>
                  }
                  actions={[
                    <Row align="middle">
                      <Col span={7}>
                        <p className="quiz-info">
                          {/* <UserOutlined style={{paddingRight: '5px'}}/> */}
                              Lớp {practice.grade}
                        </p>
                      </Col>
                      <Col span={7}>
                        <p className="quiz-info">
                          <FieldTimeOutlined style={{ paddingRight: '5px' }} />{practice.duration} phút
                            </p>
                      </Col>
                      <Col span={10}>
                        <Button
                          className="active-button"
                          size="large"
                          onMouseEnter={() => {
                            setQuizButtonClick(true);
                          }}
                          onMouseLeave={() => {
                            if (click == false) {
                              setQuizButtonClick(false);
                            }

                          }}
                          onClick={() => {
                            setSelectedStudentId(practice._id);
                            setClick(true);
                            setQuizButtonClick(true);
                            setVisible(true);
                          }}
                        >
                          Làm bài
                        </Button>
                        <Modal
                          centered
                          onCancel={() => {
                            setQuizButtonClick(false);
                            setVisible(false);
                            setSelectedRowKeys([]);
                            setButtonLoading(false);
                          }}
                          visible={visible}
                          closable={false}
                          footer={null}
                          style={{
                            borderRadius: '10px',
                            background: '#fff',
                            padding: '5px',
                          }}
                          bodyStyle={{
                            borderRadius: '5px',
                            background: '#fff',
                            boxShadow: '0px 0px 3.5px 3.5px #fff'
                          }}
                          maskStyle={{
                            background: 'rgba(0, 0, 0, 0.2)'
                          }}
                        >
                          <Title level={4} style={{ fontWeight: '900', marginBottom: '20px', padding: '0px', color: '#150C58' }}>
                            Chọn học sinh
                          </Title>
                          {visible ?
                            <Table
                              dataSource={dataSource}
                              columns={columns}
                              scroll={{ y: "300px" }}
                              pagination={false}
                              rowSelection={{
                                type: "radio",
                                ...rowSelection,
                              }}
                            />
                            : null}
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
                                borderRadius: '5px', marginTop: '20px', fontSize: '16px', fontWeight: '900', borderColor: '#fff',
                                color: '#1273EB',
                                ...(hover ? { background: '#f3f3f4' } : null)
                              }}
                              onClick={() => {
                                setQuizButtonClick(false);
                                setVisible(false);
                                setSelectedRowKeys([]);
                                setButtonLoading(false);
                              }}
                            >
                              Hủy
                            </Button>
                            <Button
                              size="large"
                              type="primary"
                              loading={buttonLoading}
                              style={{ borderRadius: '5px', marginTop: '20px', fontSize: '16px', fontWeight: '900' }}
                              onClick={() => {
                                // handleAssignChildToTest(selectedRowKeys);
                                console.log('((((((((((((SELECTED))', selectedRowKeys);
                                if (selectedRowKeys.length > 0) {
                                  history.push(`practice/${selectedStudentId}/${selectedRowKeys[0]}`)
                                }
                              }}
                            >
                              Đồng ý
                            </Button>
                          </Space>
                        </Modal>
                      </Col>
                    </Row>
                  ]}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Skeleton>



    </PracticeWrapper>
  );
}

export default Practice;