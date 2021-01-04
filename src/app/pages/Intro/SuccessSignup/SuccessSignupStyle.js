import styled from "styled-components";

export const SuccessSignupWrapper = styled.div`

    .ant-card-head {
        min-height: 48px;
        margin-bottom: 0px;
        padding: 0 24px;
        color: #14148A;
        font-weight: 500;
        font-size: 24px;
        text-align: center;
        background: transparent;
        border-bottom: 0px solid #f0f0f0;
        border-radius: 5px 2px 0 0;
    }

    .ant-card {
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        background: white;
        border-radius: 6px;
        box-shadow: 0px 0px 6px 0px #E7EAEC;
    }

    .ant-form {
        margin: 0;
        padding-left: 20px;
        padding-right: 20px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
    }  

    .ant-form-item {
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        margin-bottom: 25px;
    }

    .ant-input {
        margin: 0;
        padding: 0;
        width: 100%;
        min-width: 0;
        padding: 4px 11px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        background-color: #fff;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
    }

    .register-form-button{
        width: 100%;
        height: 55px;
        background: #302ed0;
        border-color: #3ba1cd;
        color: white;
        font-size: 18px;
        font-weight: 500;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: #417DAD !important;
            border-color: var(--primary-hover-color) !important;
        }
        border-radius: 6px;
    }

    a:hover{
        font-weight: 26px;
        color: #2E2E94;
        text-decoration: underline;
    }

 
`;
