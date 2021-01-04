import React from 'react';
import styled from 'styled-components';

const WrapperResult = styled.div`
  display: inline-block;
  padding: 5px;
  border: 1px solid blue;
  border-radius: 50%;
  width: 10px;
  height: 10px;
`;

const Result = ({ text, status }) => {
  return (
    <WrapperResult>
      <span>{text}</span>
    </WrapperResult>
  );
};

export default Result;
