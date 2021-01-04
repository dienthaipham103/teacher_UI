import React from 'react';
import { Card, Button, Row, Col, Typography } from 'antd';
import { TableQuestionWrapper } from './TableQuestionStyle';

const { Text, Link } = Typography;

const TableQuestion = ({
  questions,
  setSelectedQuestion,
  gutter,
  span,
  selectedQuestion
}) => {
  return (
    <TableQuestionWrapper>
      <Card style={{ width: '100%' }}>
        <Row center='true'>
          <Text
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            // keyboard
          >
            Câu hỏi
          </Text>
        </Row>

        <Row gutter={gutter} style={{ marginTop: 20 }}>
          {questions?.length > 0 &&
            questions.map(q => (
              <Col span={span} key={q?.number}>
                <Button
                  type={selectedQuestion?.number === q?.number && 'primary'}
                  shape={'circle'}
                  size={'small'}
                  onClick={() => setSelectedQuestion(q)}
                >
                  {q?.number + 1}
                </Button>
              </Col>
            ))}
        </Row>
      </Card>
    </TableQuestionWrapper>
  );
};

TableQuestion.defaultProps = {
  gutter: [2, 8],
  span: 4
};

export default TableQuestion;
