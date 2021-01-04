import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Statistic, Spin } from 'antd';
import { ClockCircleTwoTone, SendOutlined } from '@ant-design/icons';
import { useParams, useHistory } from 'react-router-dom';

import MultipleChoice from 'app/components/Questions/MultipleChoice';
import TableQuestion from 'app/components/Questions/TableQuestion';
import SelectedQuestion from '../SelectedQuestion';
import { childDoTestAPI, submitQuizAPI } from 'app/api/user';
import { initQuestion } from 'app/utils/question';
import { StartTestWrapper } from './StartTestStyle';

const { Countdown } = Statistic;

const StartTest = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(undefined);
  const [answers, setAnswers] = useState([]);
  const [duration, setDuration] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const history = useHistory();

  const { quizId, userId } = useParams();

  const childDotest = async () => {
    try {
      setIsLoading(true);
      let res = await childDoTestAPI({
        id: quizId,
        user: userId
      });
      const { questions, duration } = res.data;
      setQuestions(initQuestion(questions));
      setDuration(duration);
      setSelectedQuestion(initQuestion(questions)[0]);
      setAnswers([...questions.map((_, i) => ({ key: i, value: [] }))]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    childDotest();
    return () => {};
  }, []);

  const goNextQuestion = () => {
    let nextQuestion = questions.filter(
      q => selectedQuestion.number + 1 === q.number
    )[0];
    if (!nextQuestion) {
      nextQuestion = questions[0];
    }

    setSelectedQuestion(nextQuestion);
  };
  const goPrevQuestion = () => {
    const nextQuestion = questions.filter(
      q => selectedQuestion.number - 1 === q.number
    )[0];
    setSelectedQuestion(nextQuestion);
  };
  const onChangeMultiple = checkedValues => {
    setAnswers(prev =>
      prev.map(item => {
        if (item.key === selectedQuestion.number) {
          item.value = checkedValues;
        }
        return item;
      })
    );
  };

  const submit = async () => {
    let newAnws = answers.map(a => a.value.sort((a, b) => a - b).join(''));
    try {
      setLoadingBtn(true);
      let res = await submitQuizAPI({
        id: quizId,
        data: { answers: newAnws, user: userId }
      });
      if (res.code === 1) {
        history.push(`/quiz/${quizId}/${userId}/result`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <StartTestWrapper>
      <Spin tip='Đang vào bài thi...' spinning={isLoading}>
        <div style={{ padding: '10px 30px' }}>
          <Row gutter={[16, 8]}>
            <Col span={19}>
              {selectedQuestion && (
                <SelectedQuestion
                  selectedQuestion={selectedQuestion}
                  onGoNextQuestion={goNextQuestion}
                  onGoPrevQuestion={goPrevQuestion}
                  first={0}
                  last={questions.length - 1}
                >
                  <MultipleChoice
                    setQuestions={setQuestions}
                    selectedQuestion={selectedQuestion}
                    onChange={onChangeMultiple}
                    value={answers[selectedQuestion?.number]?.value}
                  />
                </SelectedQuestion>
              )}
            </Col>

            <Col span={5}>
              <Col span={24}>
                {duration && (
                  <Countdown
                    prefix={<ClockCircleTwoTone />}
                    value={Date.now() + duration * 60}
                    onFinish={submit}
                    style={{ paddingTop: 50, paddingBottom: 20 }}
                  />
                )}
              </Col>
              {questions.length > 0 && (
                <TableQuestion
                  questions={questions}
                  selectedQuestion={selectedQuestion}
                  setSelectedQuestion={setSelectedQuestion}
                />
              )}
              {!isLoading && (
                <div style={{ marginTop: 40 }}>
                  <Row justify='center'>
                    <Button
                      type='primary'
                      shape='round'
                      size='large'
                      onClick={submit}
                      icon={<SendOutlined />}
                      loading={loadingBtn}
                    >
                      Nộp bài
                    </Button>
                  </Row>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </Spin>
    </StartTestWrapper>
  );
};

export default StartTest;
