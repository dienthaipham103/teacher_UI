import React, { useState } from "react";
import { Card, Badge, Typography } from "antd";
import { CardQuizWrapper } from "./CardQuizStyle";
import { useHistory } from 'react-router-dom';

const { Meta } = Card;
const { Title } = Typography;




export const CardQuiz = ({
  quizOfStudent,
  status,
  combinedId,
  quizId,
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

  return (
    <CardQuizWrapper>
      <Card
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        onClick={() => {
          console.log('quiz click')
          if (quizButtonClick == false) {
            if (quizOfStudent){
              history.push(`/student-quiz/${status}/${combinedId}/${quizId}`);
            }
            else{
              history.push(`/Quiz-info/${quizId}`);
            }
            
          }
        }}
        // loading
        cover={<img alt='example' src={imgUrl} />}
        actions={actions}
        style={{ marginTop: hover ? '15px': '20px',  marginBottom: hover ? '20px': '15px'}}
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
    </CardQuizWrapper>
  );
};
