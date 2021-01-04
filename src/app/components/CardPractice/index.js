import React, { useState } from "react";
import { Card, Badge, Typography } from "antd";
import { CardPracticeWrapper } from "./CardPracticeStyle";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeStudentPracticeStatus } from "app/store/student";

const { Meta } = Card;
const { Title } = Typography;





export const CardPractice = ({
  quizOfStudent,
  status,
  quizId,
  studentId,
  quizButtonClick,
  title,
  description,
  // imgUrl = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  // imgUrl = "https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/7be5719f67c943288b0e601bc2f55fb6.jpg",
  imgUrl,
  actions
}) => {
  const [hover, setHover] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <CardPracticeWrapper>
      <Card
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        onClick={() => {
          if (quizButtonClick == false) {
            if (quizOfStudent === true) {
              if(status==="done"){
                dispatch(changeStudentPracticeStatus('1'));
              }
              history.push(`/student-practice/${status}/${quizId}/${studentId}`);
              // history.push(`/home`);
            }
            else {
              history.push(`practice/${quizId}`);
            }

          }
          console.log('quiz click')
        }}
        // loading
        cover={<img alt='example' src={imgUrl} />}
        actions={actions}
        style={{ marginTop: hover ? '15px' : '20px', marginBottom: hover ? '20px' : '15px' }}
      // style={{ marginTop: '35px', 
      //   paddingRight: hover ? '0px': '5px',
      //   paddingLeft: hover ? '0px': '5px',
      // }}
      >
        <Meta
          title={<Title level={4} style={{ color: '#1F1F74', fontWeight: '900' }}>{title}</Title>}
          description={<p style={{ color: '#000' }}>{description}</p>}
          style={{ color: '#000', fontSize: '16px', fontWeight: '400' }}
        />
      </Card>
    </CardPracticeWrapper>
  );
};
