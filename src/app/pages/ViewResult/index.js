import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Divider,
  Card,
  Typography,
  Descriptions,
  Image,
  Button
} from 'antd';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useParams } from 'react-router-dom';

import MultipleChoice from 'app/components/Questions/MultipleChoice';
import TableQuestion from 'app/components/Questions/TableQuestion';
import { initQuestion, convertStringToArray } from 'app/utils/question';
import { getResultOfQuizAPI } from 'app/api/user';
import { ViewResultWrapper } from './ViewResultStyle';
import Result from './Result';

const { Title } = Typography;

const ViewResult = () => {
  const { width, height } = useWindowSize();
  const { quizId, userId } = useParams();
  const [result, setResult] = useState([]);
  const [user, setUser] = useState(undefined);
  const [score, setScore] = useState(undefined);
  const [selectedQuestion, setSelectedQuestion] = useState(undefined);

  const getResultQuiz = async () => {
    try {
      let res = await getResultOfQuizAPI({
        id: quizId,
        data: { user: userId }
      });

      setResult(initQuestion(res.data.result));
      setSelectedQuestion(initQuestion(res.data.result)[0]);
      setUser(res.data.user);
      setScore(res.data.score);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getResultQuiz();
  }, []);

  return (
    <ViewResultWrapper status={selectedQuestion?.status}>
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={1000}
      />

      {user && (
        <Row justify='center' style={{ marginTop: 30 }}>
          <Col span={16}>
            <div className='user_info'>
              <Card>
                <Card.Grid className='user-info--above w-100'>
                  <div> Student : {user?.fullname}</div>
                  <div> Email : {user?.email}</div>
                </Card.Grid>
                <Card.Grid className='user-info--below w-100'>
                  <Descriptions column={2}>
                    <Descriptions.Item label='Điểm'>{score}</Descriptions.Item>
                    <Descriptions.Item>
                      {`Câu ${selectedQuestion?.number + 1 || 0} trên ${
                        result?.length
                      }`}
                    </Descriptions.Item>
                  </Descriptions>
                </Card.Grid>
              </Card>
            </div>
          </Col>
        </Row>
      )}

      <Row justify='center' className='qna'>
        <Col span={16}>
          <Divider plain>
            <Title level={2}>Câu hỏi</Title>{' '}
          </Divider>
          <Card>{selectedQuestion?.question}</Card>
          <div
            style={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}
          >
            <Image width={300} src={selectedQuestion?.images[0]}></Image>
          </div>
          <Divider plain>
            <Title level={2}>Đáp án</Title>{' '}
          </Divider>
          {/* <MultipleChoice
            selectedQuestion={selectedQuestion}
            value={convertStringToArray(selectedQuestion?.user_answer)}
            correct={convertStringToArray(selectedQuestion?.correct)}
            isReview
          /> */}
          <div>
            Câu trả lời của bạn:{' '}
            <Button
              id='answer'
              status={selectedQuestion?.status}
              shape='circle'
            >
              {selectedQuestion?.user_answer}
            </Button>
          </div>
          <div style={{ marginTop: 10 }}>
            Câu trả lời đúng:{' '}
            <Button shape='circle'>{selectedQuestion?.correct}</Button>
          </div>
        </Col>
      </Row>

      <Row justify='center' className='table-question'>
        <Col span={16}>
          <TableQuestion
            questions={initQuestion(result)}
            setSelectedQuestion={setSelectedQuestion}
            span={1}
            gutter={[8, 8]}
            selectedQuestion={selectedQuestion}
          />
        </Col>
      </Row>
    </ViewResultWrapper>
  );
};

export default ViewResult;
