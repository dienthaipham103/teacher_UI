import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, PageHeader, Card, Typography, Skeleton, Tabs, Select, Space, Modal, Table, Tag } from 'antd';
import { OnePracticeTrackWrapper } from './OnePracticeTrackStyle';

import { CardPractice } from 'app/components/CardPractice';
import { FolderOutlined, FileTextOutlined, UserOutlined, FieldTimeOutlined } from '@ant-design/icons';


import { useParams, useHistory } from "react-router-dom";

import {
    selectAllQuiz
} from 'app/store/quiz';
import { selectAllStudent, selectKeyStatus } from 'app/store/student';

import {
    getListPraticeAPI,
    getListQuizAPI,
    getListExpiredQuizAPI,
    getDoneQuizListAPI,
    getDonePracticeListAPI,
    getQuizInfoAPI
} from 'app/api/quiz';
import { xor } from 'lodash';


function OnePracticeTrack() {
    const { Title } = Typography;
    const { TabPane } = Tabs;
    const { Option } = Select;
    const { Column } = Table;

    const [quizName, setQuizName] = useState(null);
    const [duration, setDuration] = useState(null);
    const [totalScore, setTotalScore] = useState(null);

    const [page, setPage] = React.useState(1);

    const { id } = useParams();
    const [data, setData] = useState();


    const dispatch = useDispatch();
    const history = useHistory();

    const formatDate = (d) => {
        return d.getUTCFullYear().toString() + "/" +
            (d.getUTCMonth() + 1).toString() +
            "/" + d.getUTCDate() + " " + d.getUTCHours() +
            ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds();
    }

    const getQuizInfo = async () => {
        try {
            let res = await getQuizInfoAPI({ id: id });
            console.log(res);

            setQuizName(res.data.name);
            setDuration(res.data.duration);
            setTotalScore(res.data.totalScore);

        } catch (error) {
            console.log(error);
        }
    }

    const getDoneList = async () => {
        try {
            let res = await getDonePracticeListAPI({ id: id });
            console.log(res);

            // const doneList = res.data.map((x) => ({
            //     key: x._id,
            //     id: x.user.ID,
            //     name: x.user.fullname,
            //     score: x.status === 'DONE' ? x.score : null,
            //     status: x.status === 'DONE' ? "Đã hoàn thành" : "Chưa hoàn thành",
            //     start: x.status === 'DONE' ? formatDate(new Date(x.startDate)) : null,
            //     time: x.status === 'DONE' ? ((new Date(x.submitDate) - new Date(x.startDate)) / 60 / 1000).toFixed(2) : null
            // }));

            const doneList = res.data.map((x) => ({
                key: x._id,
                id: x.user !== null? x.user.ID: "Đã xóa",
                name: x.user !== null? x.user.fullname: "Đã xóa",
                score: x.status === 'DONE' ? x.score : null,
                status: x.status === 'DONE' ? "Đã hoàn thành" : "Chưa hoàn thành",
                // start: null,
                // time: x.status === 'DONE' ? ((new Date(x.submitDate) - new Date(x.startDate)) / 60 / 1000).toFixed(2) : null
                number: x.practice.length
            }));
            setData(doneList);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getQuizInfo();
        getDoneList()
    }, []);



    return (
        <OnePracticeTrackWrapper>
            <div style={{ marginBottom: '20px' }}>
                <Card>
                    <Title level={4}>Tên đề: {quizName}</Title>
                    <Row>
                        <Col span={12}>
                            <p>Thời gian: {duration} phút</p>
                        </Col>
                        <Col span={12}>Tổng điểm: {totalScore}</Col>
                    </Row>
                </Card>
            </div>

            <Table
                dataSource={data}
                pagination={{
                    onChange(current) {
                        setPage(current);
                    }
                }}
                onRow={(r) => ({
                    onClick: () => {
                        if (r.status === 'Đã hoàn thành'){
                            // history.push(`/test-track/test-result-review/${r.key}`);
                        }
                    }
                })}
            >
                <Column
                    title="Số thứ tự"
                    key="index"
                    render={(value, item, index) => (page - 1) * 10 + index + 1}
                />
                <Column title="ID" dataIndex="id" key="id" />
                <Column
                    sorter={(a, b) => a.name - b.name}
                    sortDirections={["descend", "ascend"]}
                    title="Tên"
                    dataIndex="name"
                    key="name"
                />
                <Column
                    sorter={(a, b) => a.score - b.score}
                    sortDirections={["descend", "ascend"]}
                    title="Điểm"
                    dataIndex="score"
                    key="score"
                />
                <Column
                    sorter={(a, b) => a.status - b.status}
                    sortDirections={["descend", "ascend"]}
                    title="Trạng thái"
                    dataIndex="status"
                    key="status"
                />
                {/* <Column
                    sorter={(a, b) => a.start - b.start}
                    sortDirections={["descend", "ascend"]}
                    title="Bắt đầu thi"
                    dataIndex="start"
                    key="start"
                /> */}
                <Column
                    sorter={(a, b) => a.number - b.number}
                    sortDirections={["descend", "ascend"]}
                    title="Số lần luyện tập"
                    dataIndex="number"
                    key="number"
                />
            </Table>
        </OnePracticeTrackWrapper>
    );
}

export default OnePracticeTrack;