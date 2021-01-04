import styled from 'styled-components';
import { Button } from 'antd';

export const ViewResultWrapper = styled.div`
  .w-100 {
    width: 100%;
  }
  .user-info {
    &__container {
      background-color: #1273eb;
      width: 100%;

      /* &--above {
          color: white;
        } */
    }
  }

  .table-question {
    margin-top: 30px;
  }

  td.ant-descriptions-item {
    padding: 0;
  }

  .qna {
    margin-top: 30px;
    padding-bottom: 30px;
  }

  .table-question {
    padding-bottom: 30px;
  }

  #answer {
    border-color: ${({ status }) => {
      return status ? 'green' : 'red';
    }};
    color: ${({ status }) => {
      return status ? 'green' : 'red';
    }};
    &:hover {
      border-color: ${({ status }) => {
        return status ? 'green' : 'red';
      }};
      color: ${({ status }) => {
        return status ? 'green' : 'red';
      }};
      background-color: white !important;
    }
  }
`;
