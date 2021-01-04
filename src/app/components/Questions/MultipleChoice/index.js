import React, { useState, useEffect } from 'react';
import { Checkbox, Row, Col, Card, Badge } from 'antd';
import { Fade } from 'react-reveal';

import { Wrapper } from './style';



const MultipleChoice = ({
  span,
  selectedQuestion,
  onChange,
  value: valueProps,
  correct,
  isReview
}) => {
  const [value, setValue] = useState(valueProps || []);
  function handleChange(checkedValues) {
    if (isReview) return;
    setValue(checkedValues);
    onChange(checkedValues);
  }

  useEffect(() => {
    setValue(valueProps);
    return () => {
      setValue([]);
    };
  }, [selectedQuestion, valueProps]);

  const { answers } = selectedQuestion;

  function renderIsReview({ value, label, span }) {
    if (
      selectedQuestion?.user_answer &&
      +selectedQuestion?.user_answer === value
    ) {
      return (
        <Col span={span}>
          <Card className='question__card'>
            <Checkbox className='question__card--checkbox' value={value}>
              {label}
            </Checkbox>
          </Card>
        </Col>
      );
    }
    return null;
  }
  console.log(selectedQuestion?.user_answer);
  return (
    <Checkbox.Group
      style={{ width: '100%' }}
      onChange={handleChange}
      value={value}
    >
      <Fade left cascade>
        <Row gutter={[2, 10]}>
          {answers &&
            answers.length > 0 &&
            answers.map((a, i) => (
              <Wrapper
                className='question'
                isSelected={value?.includes(i)}
                correct={correct}
                isReview={isReview}
                i={i}
                value={selectedQuestion?.user_answer}
                key={i}
              >
                {isReview ? (
                  renderIsReview({ value: i, label: a, span })
                ) : (
                  <Col span={span}>
                    <Card className='question__card'>
                      <Checkbox className='question__card--checkbox' value={i}>
                        {a}
                      </Checkbox>
                    </Card>
                  </Col>
                )}
              </Wrapper>
            ))}
        </Row>
      </Fade>
    </Checkbox.Group>
  );
};

MultipleChoice.defaultProps = {
  span: 24,
  selectedQuestion: {
    answers: []
  },
  isReview: false,
  onChange: () => {},
  correct: []
};

export default MultipleChoice;
