import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 30px 10px;
  border-radius: 10px;
  position: relative;
  transition: all 0.4s;
  :hover {
    transform: translateY(-2px);
    box-shadow: 1.5rem 1.5rem 1.5rem #ddd;
    background-color: #dddddd38;
  }

  .selected-question {
    &__header {
      position: absolute;
      top: 0px;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      text-transform: uppercase;
      letter-spacing: 0.3rem;
      font-weight: 700;
      padding: 5px 50px;
      border-radius: 40px;
      background: linear-gradient(
        -71deg,
        #15c39a,
        #19bea0 6%,
        #19bea0 7%,
        #4c7af1 95%
      );
    }

    &__body {
      padding-top: 10px;

      &--question {
        padding: 24px;
        padding-bottom: 10px;
        .ant-card {
          margin: 0;
          padding: 0;
          color: rgba(0, 0, 0, 1);
          font-size: 20px;
          border: 1px solid #c4cdd1;
          /* background: #F0F7FA; */
          border-radius: 10px;
          &-body {
            padding: 12px;
          }
        }
      }
    }

    &__footer {
      display: flex;
      justify-content: center;
      margin-top: 30px;
      padding: 0px 50px;
    }
  }

  .image-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 5px;
  }

  .ant-image-img {
    cursor: pointer;
  }
`;
