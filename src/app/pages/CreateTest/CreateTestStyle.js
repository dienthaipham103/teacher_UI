import styled from "styled-components";
import Background from 'assets/images/71.jpg';


export const CreateTestWrapper = styled.div`

    .change-button{
        background: #F6F8F8;
        font-size: 16px;
        font-weight: 900;
        border-color: #F6F8F8;
        color: #3F5681;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: #F2F4F7 !important;
            border-color: #F2F4F7 !important;
            color: green;
        }
    }

    /* .avatar-uploader > .ant-upload {
        width: 220px;
        height: 256px;
    } */
    .ant-upload {
        /* width: 220px; */
        /* width: 120%; */
        /* height: 256px; */
        /* height: 120%; */
    }

    .ant-upload.ant-upload-select-picture-card {
        width: 220px;
        height: 200px;
        /* margin-right: 8px; */
        /* margin-bottom: 8px; */
        margin: 0px;
        text-align: center;
        vertical-align: top;
        background-color: #fafafa;
        border: 1px dashed #d9d9d9;
        border-radius: 2px;
        cursor: pointer;
        -webkit-transition: border-color 0.3s;
        transition: border-color 0.3s;
    }



    .ant-upload-list-picture-card .ant-upload-list-item{
        width: 220px;
        height: 200px;
    }




    .add-questions-button{
        background: green;
        font-size: 16px;
        font-weight: 900;
        border-color: green;
        color: white;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: #025618 !important;
            border-color: #025618 !important;
            color: white;
        }
    }

    .active-button{
        background: #748E93;
        font-size: 16px;
        font-weight: 900;
        border-color: #748E93;
        color: white;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: #43646B !important;
            border-color: #43646B !important;
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
            background-color: #43646B !important;
            border-color: #43646B !important;
            color: white;
        }
    }

    .info {
        width: 90%;
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 1);
        font-size: 14px;
        /* background: rgba(255, 255, 255, 0.8); */
        /* background: #F7F8FA; */
        border-radius: 10px;
        border:  1px solid #f0f2f5;
        /* border:  1px solid #C2C9D6; */
        box-shadow: 0px 6px 6px 0px #DADFDF;
    }

    .ant-card-head {
        color: #00008a;
        /* color: white; */
        font-weight: 900;
        font-size: 20px;
        border-bottom: 0px solid #f0f0f0;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: rgba(255, 255, 255, 0.1);
        /* background: #163C63; */
    }

    .ant-form-item {
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.65);
        font-size: 16px;
        font-variant: tabular-nums;
        line-height: 1.5715;
        list-style: none;
        -webkit-font-feature-settings: 'tnum';
                font-feature-settings: 'tnum';
        margin-bottom: 24px;
        vertical-align: top;
        border-radius: 10px;
    }

    .ant-input{
        border-radius: 6px;
        /* box-shadow: 0px 2px 2px #D6D8D7 inset; */
    }

    .ant-input-number{
        border-radius: 6px;
    }

    .add-button{
        /* background: #1273EB; */
        font-size: 16px;
        font-weight: 900;
        border-color: green;
        color: green;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: green !important;
            border-color: green !important;
            color: white;
        }
    }

    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
        border-radius: 5px;
        height: 34px;
        /* font-size: 26px; */
    }

    .create-button{
        margin-top: 30px;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        &:hover{
            background-color: #1273EB !important;
            border-color: var(--primary-hover-color) !important;
            color: white;
        }
    }

    .description-card{
        .ant-card-body{
            padding-top: 0px; 
            padding-left: 15px; 
            padding-right: 15px; 
            padding-bottom: 15px; 
        }
    }

`;
