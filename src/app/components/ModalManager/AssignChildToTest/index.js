import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Table, message, Button, Space, Typography, notification } from "antd";
import { assignChildToTestAPI } from "app/api/user";
import { AssignChildToTestWrapper } from "./AssignChildToTestStyle";

import { onVisible, offVisible } from 'app/store/modal';
import { selectNotRegisterChild, register } from 'app/store/quiz';

import { ScheduleOutlined } from '@ant-design/icons';

import {
  changeCurrentNumOfReg
} from 'app/store/quiz';

// const initSource = data => data.filter(i => i.isAssigned).map(i => i._id);

const AssignChildToTest = ({ quizId }) => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  // const notRegisterChild = useSelector(selectNotRegisterChild);
  // console.log('===', notRegisterChild);
  // const [x, setX] = useState("");

  const notRegisterChild = useSelector(state =>
    state.quizzes.notRegisterChild[quizId]
  );
  console.log('notRegister Child', notRegisterChild);

  const columns = [{ title: () => {return (<p style={{margin: '0px', fontSize: '16px', fontWeight: '900'}}>Tên</p>)},
                     dataIndex: "fullname", 
                     render: text => 
                     <p style={{fontSize: '16px', margin: '0px', fontWeight: '500', color: '#667B89'}}>
                       {text}
                      </p>
                     }];
  let dataSource;
 
  const rowSelection = {
    // type,
    selectedRowKeys,
    onChange: selectedRowKeys => {
      setSelectedRowKeys(selectedRowKeys);
    }
  };

  // const render = <p>{x[0].fullname}</p>
  // console.log('AssignChildToTest', props);
  const getVisible = useSelector(state => state.modal.visible);


  if (getVisible == true) {
    console.log('quizId', quizId);
    dataSource = notRegisterChild.map(i => ({ ...i, key: i._id }));
    console.log('(((((((((((((())))))))))))))))', dataSource);

    // console.log('===......', notRegisterChild);
    // setNotRegisterList(notRegisterChild[quizId]);
    // console.log(notRegisterList)
    // console.log('quizId', x);
    // const render = <p>{x[0].fullname}</p>
    // console.log('not register child', notRegisterChild[0]);
  }



  const handleAssignChildToTest = async child => {
    console.log('handleAssignChildToTest', child);
    console.log('handleAssignChildToTest', quizId);
    // const body = {child: user};
    try {
      if(selectedRowKeys.length > 0){
        console.log('NUMBER OF REGISTER: ', selectedRowKeys.length);
        setButtonLoading(true);
      }
     
      let res = await assignChildToTestAPI({
        data: { child: child },
        id: quizId
      });
      if (res.code === 1) {
        dispatch(offVisible());
        setSelectedRowKeys([]);
        notification.success({
          message: "Đăng ký thành công!",
          duration: "2"
        });
        dispatch(changeCurrentNumOfReg(child.length));
        await dispatch(register({ quizId: quizId, childList: child }));
        setButtonLoading(false);

      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AssignChildToTestWrapper>
      <Modal
        // title='Chọn học viên để thi'
        centered
        // onOk={() => {
        //   handleAssignChildToTest(selectedRowKeys);
        //   setSelectedRowKeys([]);
        // }}

        // onCancel={onCancel || defaultCancel}
        onCancel={() => {
          dispatch(offVisible());
          setSelectedRowKeys([]);
          setButtonLoading(false);
        }}
        visible={getVisible}
        // visible
        // okText='Đồng ý'
        // cancelText='Huỷ'
        closable={false}
        footer={null}
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
      >
        <Title level={4} style={{ fontWeight: '900', marginBottom: '20px', padding: '0px', color: '#150C58' }}>
          {/* <img className="trash-icon" src={Trash} style={{ marginRight: '10px', marginBottom: '8px' }} /> */}
          {/* <ScheduleOutlined style={{ marginRight: '10px' }} /> */}
        Chọn học sinh
        </Title>
        {/* <hr style={{ height: '1px', border: 'none', backgroundColor: '#E5E5E6', marginTop: '10px', marginBottom: '10px' }} /> */}
        {getVisible ?
          <Table
            dataSource={dataSource}
            columns={columns}
            scroll={{ y: "300px" }}
            pagination={false}
            rowSelection={{
              type: "checkbox",
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
              borderRadius: '5px', marginTop: '20px', fontSize: '16px', fontWeight: '600', borderColor: '#fff',
              color: '#1273EB',
              ...(hover ? { background: '#f3f3f4' } : null)
            }}
            onClick={() => {
              dispatch(offVisible());
              setSelectedRowKeys([]);
              setButtonLoading(false);
            }}
          >
            Hủy
        </Button>
          <Button
            type="primary"
            loading={buttonLoading}
            size="large"
            style={{ borderRadius: '5px', marginTop: '20px', fontSize: '16px', fontWeight: '600' }}
            onClick={() => {
              handleAssignChildToTest(selectedRowKeys);
              // setSelectedRowKeys([]);
            }}
          >
            Đồng ý
        </Button>
        </Space>
      </Modal>
    </AssignChildToTestWrapper>

  );
};

// AssignChildToTest.defaultProps = {
//   data: [],
//   onOk: () => { },
//   type: "checkbox"
// };

export default AssignChildToTest;
