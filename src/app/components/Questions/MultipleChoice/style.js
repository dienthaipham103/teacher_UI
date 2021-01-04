import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  padding: 0 50px;
  margin-left: ${({ isSelected, isReview }) => {
    if (isSelected && !isReview) {
      return '15px';
    }
  }};
  transition: all 0.4s;

  .question__card {
    border: 1px solid #f1f7f2;
    /* background: #F0F7FA; */
    border-radius: 10px;
    border: ${({ isSelected, isReview, correct, value, i }) => {
      if (isReview) {
        if (correct.includes(+value)) {
          return '1px solid green';
        } else {
          return isSelected && '1px solid #1890ff';
        }
      } else {
        return isSelected && '1px solid #1890ff';
      }
    }};
    &--checkbox:hover .ant-checkbox-input {
      visibility: hidden;
    }
  }

  /* .ant-checkbox-input {
    visibility: hidden;
  }
  span.ant-checkbox-inner {
    visibility: hidden;
  }
  span.ant-checkbox.ant-checkbox-checked {
    visibility: hidden;
  }
  span.ant-checkbox.ant-checkbox-checked:hover {
    visibility: hidden;
  } */
`;
