import styled from "styled-components";
import Background from 'assets/images/background.png';

export const LoginWrapper = styled.div`

    a{
        text-decoration: none !important;
    }

    .active-button{
        background: #2596be;
        font-size: 16px;
        font-weight: 900;
        border-color: #2596be;
        color: white;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: #1F6C89 !important;
            border-color: #1F6C89 !important;
            color: white;
        }
    }

    .non-active-button{
        /* background: gray; */
        background: #F6F8F8;
        font-size: 16px;
        font-weight: 900;
        border-color: gray;
        color: gray;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: #1F6C89 !important;
            border-color: #1F6C89 !important;
            color: white;
        }
    }

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
        font-weight: 900;
        background: #1A2274;
        color: #fff;
        border-color: #1A2274;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
    }

    a:hover{
        font-weight: 26px;
        color: #2E2E94;
        text-decoration: underline;
    }

    .btnFacebook { 
        width: 100%;
        height: 46px;  
        border-radius: 5px;
        /* background: #3b5998; */
        background: #fff;
        /* color: #1877f2; */
        color: #000;
        /* border: 1px solid #d9d9d9; */
        /* border-top: 0px solid #d9d9d9; */
        border: 0px transparent;  
        box-shadow: 0px 2.5px 2.5px 0px #C3C3C4;
        text-align: center;
        font-size: 16px;
        font-weight: 600;
        /* margin:5px; */
        display: inline-block;
        cursor: pointer;
    }

    /* .btnGoogle { 
        margin:5px;
        width: 100%;
        height: 46px;
        border-radius: 5px;
        background: #db3236;
        color: white;
        border: 1px #000;
        text-align: center;
    } */

    .btnFacebook:hover {
        /* color: #fff;
        background: #1877f2; */
        /* opacity: 0.6; */
        border: 1px #ffffff solid;
        box-shadow: 2px 2px 2px 2px blue;
        -webkit-box-shadow: 0 0 4px 2px #9EDAE9;
        -moz-box-shadow: 0 0 4px 2px #9EDAE9;
        box-shadow: 0 0 4px 2px #9EDAE9;
    }

    /* .btnGoogle:hover {
        background: #db3236;
        opacity: 0.6;
    } */

    .google-login{
        width: 100%;
        height: 46px;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        /* color: #EA4335;  */
        color: #000; 
        background: #fff;
        border: 0px transparent;  
        box-shadow: 0px 2.5px 2.5px 0px #C3C3C4;
        &:hover {
            color: #000;
            /* background-color: #fff !important;
            border-color: #fff !important;
            -webkit-box-shadow: 0 0 4px 2px #F56958;
            -moz-box-shadow: 0 0 4px 2px #F56958;
            box-shadow: 0 0 4px 2px #F56958; */
            /* box-shadow: 2px 2px 2px 2px blue; */
            background-color: #fff !important;
            box-shadow: 2px 2px 2px 2px blue;
            -webkit-box-shadow: 0 0 4px 2px #9EDAE9;
            -moz-box-shadow: 0 0 4px 2px #9EDAE9;
            box-shadow: 0 0 4px 2px #9EDAE9;
            }
    }

    /* .google-login:hover {
        -webkit-box-shadow: 0 0 4px 2px #9EDAE9;
        -moz-box-shadow: 0 0 4px 2px #9EDAE9;
        box-shadow: 0 0 4px 2px #9EDAE9;
    } */

    /* .container{
        display: 'flex'
    } */

    /* .item{
        margin-right: 10px;
    } */

`;
