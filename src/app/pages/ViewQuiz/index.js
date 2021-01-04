import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Select } from 'antd';

import { ViewQuizWrapper } from './ViewQuizStyle';
import { CardQuiz } from 'app/components/CardQuiz';

const { Panel } = Collapse;
const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const ViewQuiz = props => {
  const [activeKey, setActiveKey] = useState([]);
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <ViewQuizWrapper>
      <div>
        <Select
          mode='multiple'
          style={{ width: '300px' }}
          placeholder='Please select'
          defaultValue={['a10', 'c12']}
          onChange={handleChange}
          maxTagCount={3}
        >
          {children}
        </Select>
      </div>

      <div className='list-children'>
        <Collapse ghost>
          <Panel header='This is panel header 1' key='1'>
            <CardQuiz />
          </Panel>
          <Panel header='This is panel header 2' key='2'>
            <p>{text}</p>
          </Panel>
          <Panel header='This is panel header 3' key='3'>
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>
    </ViewQuizWrapper>
  );
};

ViewQuiz.propTypes = {};

export default ViewQuiz;
