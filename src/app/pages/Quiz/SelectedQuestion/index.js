import React from 'react';
import PropTypes from 'prop-types';
import {
  LeftSquareOutlined,
  RightSquareOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import { Button, Card, Row, Col, Image } from 'antd';

import { Wrapper } from './SelectionQuestionStyle';

const SelectedQuestion = props => {
  const {
    selectedQuestion,
    onGoNextQuestion,
    onGoPrevQuestion,
    first,
    last
  } = props;
  return (
    <Wrapper className='selected-question'>
      <div className='selected-question__header'>
        Câu hỏi {selectedQuestion?.number + 1}
      </div>
      <div className='selected-question__body'>
        <div className='selected-question__body--question'>
          <Card>{selectedQuestion?.question}</Card>
          <div className='image-wrapper'>
            <Image width={300} src={selectedQuestion?.images[0]} />
          </div>
        </div>
        <div className='selected-question__body--answers'>{props.children}</div>
      </div>
      <div className='selected-question__footer'>
        <Row justify='space-between' style={{ width: '100%' }}>
          <Col>
            {selectedQuestion?.number !== first && (
              <Button
                size='small'
                style={{ borderRadius: '3px' }}
                onClick={onGoPrevQuestion}
              >
                <LeftOutlined />
              </Button>
            )}
          </Col>
          <Col>
            {selectedQuestion?.number !== last && (
              <Button
                size='small'
                style={{ borderRadius: '3px' }}
                onClick={onGoNextQuestion}
              >
                <RightOutlined />
              </Button>
            )}
          </Col>
        </Row>
      </div>
    </Wrapper>
  );
};

SelectedQuestion.propTypes = {};

export default SelectedQuestion;
