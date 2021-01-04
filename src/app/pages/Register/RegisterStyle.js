import styled from "styled-components";
import Background from 'assets/images/background.png';

export const RegisterWrapper = styled.div`

    .ant-card-head {
        min-height: 48px;
        /* margin-bottom: -1px; */
        /* padding: 0 24px; */
        /* color: gray; */
        font-weight: 900;
        font-size: 26px;
        text-align: center;
        background: transparent;
        border-bottom: 0px solid #f0f0f0;
        /* border-radius: 5px 2px 0 0; */
    }

    .ant-card {
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        /* background: rgba(0, 0, 0, 0.05);; */
        border-radius: 10px;
        box-shadow: 4px 4px 4px 0px #E7EAEC;
    }

    .ant-form {
        margin: 0;
        padding-left: 18px;
        padding-right: 18px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
    }  

    .ant-form-item {
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        margin-bottom: 6px;
    }

    .ant-input {
        margin: 0;
        padding: 0;
        width: 100%;
        min-width: 0;
        padding: 4px 11px;
        color: rgba(0, 0, 0, 1);
        font-size: 16px;
        background-color: #fff;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
    }

    .login-button{
        width: 100%;
        height: 46px;
        border-radius: 5px;
        font-size: 16px;
        background: #1A2274;
        color: #fff;
        border-color: #1A2274;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
    }

    
    /* .ant-btn-primary {
        background: linear-gradient(-90deg, #1d729c, #3ba1cd);
        border-color: #3ba1cd;
        color: #000;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
    } */

    a:hover{
        font-weight: 26px;
        color: #2E2E94;
        text-decoration: underline;
    }

    .google-login{
        width: 100%;
        /* border: 1px solid #d9d9d9; */
        height: 46px;
        border-radius: 10px;
    }

    .facebook-login{
        width: 100%;
        height: 46px;
        border-radius: 5px;
    }

`;
