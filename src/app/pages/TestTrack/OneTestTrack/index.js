import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, PageHeader, Card, Typography, Skeleton, Tabs, Select, Space, Modal, Table, Tag } from 'antd';
import { OneTestTrackWrapper } from './OneTestTrackStyle';

import { CardPractice } from 'app/components/CardPractice';
import { FolderOutlined, FileTextOutlined, UserOutlined, FieldTimeOutlined } from '@ant-design/icons';


import { useParams, useHistory } from "react-router-dom";

import {
    selectAllQuiz,
} from 'app/store/quiz';
import { selectAllStudent, selectKeyStatus } from 'app/store/student';

import {
    getListPraticeAPI,
    getListQuizAPI,
    getListExpiredQuizAPI,
    getDoneQuizListAPI
} from 'app/api/quiz';
import { xor } from 'lodash';


function OneTestTrack() {
    const { Title } = Typography;
    const { TabPane } = Tabs;
    const { Option } = Select;

    const { id } = useParams();
    const [data, setData] = useState();


    const dispatch = useDispatch();
    const history = useHistory();

    // const columns = [
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',
    //         defaultSortOrder: 'descend',
    //         sorter: (a, b) => a.name.length - b.name.length,
    //     },
    //     {
    //         title: 'Age',
    //         dataIndex: 'age',
    //         defaultSortOrder: 'descend',
    //         sorter: (a, b) => a.age - b.age,
    //     },
    //     {
    //         title: 'Address',
    //         dataIndex: 'address',
    //         sorter: (a, b) => a.address.length - b.address.length,
    //         sortDirections: ['descend', 'ascend'],
    //     },
    // ];
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Tên',
            dataIndex: 'fullname',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.fullname - b.fullname,
        },
        {
            title: 'Điểm',
            dataIndex: 'score',
            sorter: (a, b) => a.score - b.score,
            sortDirections: ['descend', 'ascend'],
        },
    ];

    const temp_data = [
        {
            key: '1',
            name: 'a',
            age: 2,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'b',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'c',
            age: 12,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'd',
            age: 32,
            address: 'London No. 2 Lake Park',
        },
    ];

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const getDoneList = async () => {
        try {
            // setExpiredQuizzesLoading(true);
            console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
            let res = await getDoneQuizListAPI({id: id});
            console.log(res);
            // if (res.code === 1) {
            //     setExpiredQuizzesLoading(false);
            //     setExpiredQuizzes(res.data);
            //     setExpiredNumber(res.data.length);
            //     console.log('dataaaaannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn', res.data);
            // }
            const doneList = res.data.map((x) => ({
                key: x.user._id,
                id: x.user.ID,
                fullname: x.user.fullname,
                score: x.score
            }));
            setData(doneList);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getDoneList()
    }, []);



    return (
        <OneTestTrackWrapper>
            <Table columns={columns} dataSource={data} onChange={onChange} />


        </OneTestTrackWrapper>
    );
}

export default OneTestTrack;