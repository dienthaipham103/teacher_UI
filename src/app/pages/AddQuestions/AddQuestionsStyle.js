import styled from "styled-components";
import Background from 'assets/images/71.jpg';


export const AddQuestionsWrapper = styled.div`

    .ant-image-preview-wrap {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        /* left: 200; */
        overflow: auto;
        outline: 0;
        -webkit-overflow-scrolling: touch;
    }

    .ant-upload-list.ant-upload-list-picture-card{
        display: flex;
        justify-content: center;
    }

    .ant-upload.ant-upload-select-picture-card {
        /* display: flex; */
        /* justify-content: center; */
        width: 928px;
        height: 251px;
        margin: 0px;
        padding: 0px;
        /* text-align: center; */
        /* vertical-align: top; */
        background-color: #fafafa;
        border: 1px dashed #d9d9d9;
        border-radius: 2px;
        cursor: pointer;
        -webkit-transition: border-color 0.3s;
        /* transition: border-color 0.3s; */
        transition: border-color 0.3s;
    }

    .ant-upload-list-picture-card .ant-upload-list-item-info::before{
        width: 928px;
        height: 251px;
        position: absolute;
        z-index: 1;
        /* width: 100%;
        height: 100%; */
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        content: ' ';
    }



    /* .ant-upload-list-picture .ant-upload-list-item,
    .ant-upload-list-picture-card .ant-upload-list-item {
        position: relative;
        width: 928px;
        height: 251px;
        padding: 8px;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
    } */

    .ant-upload-list-picture-card .ant-upload-list-item-error {
        border-color: gray;
    }

    .ant-upload-list-picture-card .ant-upload-list-item-thumbnail {
        position: absolute;
        top: 0px;
        left: 0px;
        /* line-height: 54px; */
        width: 928px;
        height: 251px;
        line-height: 54px;
        text-align: center;
        opacity: 0.8;
    }

    .ant-upload-list-picture-card .ant-upload-list-item-thumbnail img {
        display: block;
        /* width: 48px;
        height: 48px; */
        /* width: 926px;
        height: 250px; */
        width: 928px;
        height: 251px;
        overflow: hidden;
    }

    // key part
    .ant-upload-list-picture-card-container {
        display: inline-block;
        width: 928px;
        height: 251px;
        /* margin: 0 8px 8px 0; */
        margin: 0 0px 0px 0;
        vertical-align: top;
    }

    .ant-upload-list-picture-card .ant-upload-list-item:hover .ant-upload-list-item-info::before {
        opacity: 0.1;
    }

    .edit-button{
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
            color: #1E66CE;
        }
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
        /* margin-bottom: 24px; */
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
        background: #F6F8F8;
        font-size: 14px;
        font-weight: 900;
        border-color: #F6F8F8;
        color: #3F5681;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: #F2F4F7 !important;
            border-color: #F2F4F7 !important;
            color: #E74C3C;
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
            padding-left: 30px; 
            padding-right: 30px; 
            padding-bottom: 30px; 
        }
        /* background: blue; */
        border-radius: 10px;
    }

    .info-card{
        /* background: #F4FBD8 */
        border-radius: 10px;
    }

    ////////////////////
    .quiz-info{
        padding: 0px;
        margin: 0px;
        font-weight: 400;
        background: blue;
    }

    p{
        font-size: 18px;
        font-weight: 600;
    }

    .ant-checkbox-inner {
        width: 25px;
        height: 25px;
    }

    .ant-checkbox-input {
        font-size: 30px;
    }

    .ant-checkbox-inner::after {
        /* position: absolute;
        top: 50%;
        left: 22%;
        display: table; */
        left: 30%;
        /* width: 5.71428571px; */
        /* height: 9.14285714px; */
        /* border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        -webkit-transform: rotate(45deg) scale(0) translate(-50%, -50%);
                transform: rotate(45deg) scale(0) translate(-50%, -50%);
        opacity: 0;
        -webkit-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
        transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
        content: ' '; */
    }
    .ant-radio-wrapper:hover .ant-radio,
    .ant-radio:hover .ant-radio-inner,
    .ant-radio-input:focus + .ant-radio-inner {
        border-color: #d9d9d9;
    }

    .ant-radio-input:focus + .ant-radio-inner {
     -webkit-box-shadow: 0 0 0 0px rgba(24, 144, 255, 0.08);
        box-shadow: 0 0 0 0px rgba(24, 144, 255, 0.08);
    }

    .ant-radio-group {
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5715;
        list-style: none;
        -webkit-font-feature-settings: 'tnum';
                font-feature-settings: 'tnum';
        display: inline-block;
        font-size: 0;
        line-height: unset;
    }

    .ant-radio {
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5715;
        list-style: none;
        -webkit-font-feature-settings: 'tnum';
                font-feature-settings: 'tnum';
        position: relative;
        top: 0px;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        vertical-align: sub;
        outline: none;
        cursor: pointer;
    }

    .ant-radio-inner {
        position: relative;
        top: 0;
        left: 0;
        display: block;
        width: 26px;
        height: 26px;
        background-color: #fff;
        border-color: #d9d9d9;
        border-style: solid;
        border-width: 2px;
        border-radius: 100px;
        -webkit-transition: all 0.0s;
        transition: all 0.0s;
        cursor: not-allowed;
    }

    .question-card{
        .ant-card-body{
            padding-top: 0px;
            padding-left: 0px;
            padding-right: 0px;
            padding-bottom: 0px;
        }
        /* padding: 0px; */
        margin-bottom: 20px;
    }
 

    .finish-card {
        .ant-card-body{
            padding: 20px;
        }
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 1);
        font-size: 16px;
        /* font-weight: 900; */
        /* background: rgba(255, 255, 255, 0.8); */
        /* background: #F7F8FA; */
        border-radius: 10px;
        border:  1px solid #E3E3E3;
        /* border:  1px solid #f0f2f5; */
        box-shadow: 0px 6px 6px 0px #DADFDF;
        min-width: 245px;
        min-height: 240px;
    }

    .ant-checkbox-checked .ant-checkbox-inner::after {
        transform: rotate(45deg) scale(1) translate(-50%, -50%);
        -webkit-transform: rotate(45deg) scale(1) translate(-50%, -50%);
        -ms-transform: rotate(45deg) scale(1) translate(-50%, -50%);
    }

    ///////////////////////check-box (radio)

    .my-checkbox{
        /* margin-right: 6px; */
        margin-right: 15px;
        /* margin-left: 24px; */
        margin-left: 15px;
        margin-bottom: 0px;
        font-size: 20px;
        .ant-radio-checked .ant-radio-inner:after{
            /* background-color: red; */
            width: 22px;
            height: 22px;
            border-radius: 100px;
            top: 0px;
            left: 0px;
            content: '';
            -webkit-transition: all 0.0s cubic-bezier(0.78, 0.14, 0.15, 0.86);
            transition: all 0.0s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        }
        .ant-radio-inner::after {
            -webkit-transition: all 0.0s cubic-bezier(0.78, 0.14, 0.15, 0.86);
            transition: all 0.0s cubic-bezier(0.78, 0.14, 0.15, 0.86);
            content: ' ';
        }
    }

    .my-wrong-checkbox{
        /* margin-right: 6px; */
        margin-right: 15px;
        /* margin-left: 24px; */
        margin-left: 15px;
        margin-bottom: 0px;
        font-size: 20px;
        .ant-radio-checked .ant-radio-inner:after{
            background-color: #F1381B;
            width: 22px;
            height: 22px;
            border-radius: 100px;
            top: 0px;
            left: 0px;
            content: '';
            -webkit-transition: all 0.0s cubic-bezier(0.78, 0.14, 0.15, 0.86);
            transition: all 0.0s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        }
        .ant-radio-inner::after {
            -webkit-transition: all 0.0s cubic-bezier(0.78, 0.14, 0.15, 0.86);
            transition: all 0.0s cubic-bezier(0.78, 0.14, 0.15, 0.86);
            content: ' ';
        }
       
       
    }

    .my-correct-checkbox{
        /* margin-right: 6px; */
        margin-right: 15px;
        /* margin-left: 24px; */
        margin-left: 15px;
        margin-bottom: 0px;
        font-size: 20px;
        .ant-radio-checked .ant-radio-inner:after{
            background-color: #4CCF3C;
            width: 22px;
            height: 22px;
            border-radius: 100px;
            top: 0px;
            left: 0px;
            content: '';
            -webkit-transition: all 0.0s cubic-bezier(0.78, 0.14, 0.15, 0.86);
            transition: all 0.0s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        }
        .ant-radio-inner::after {
            -webkit-transition: all 0.0s cubic-bezier(0.78, 0.14, 0.15, 0.86);
            transition: all 0.0s cubic-bezier(0.78, 0.14, 0.15, 0.86);
            content: ' ';
        }
       
    }


    .submit-button{
         /* background: #1273EB; */
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        border-color: rgb(68,151,117);
        color: rgb(68,151,117);
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: rgb(68,151,117) !important;
            border-color: rgb(68,151,117) !important;
            color: white;
        }
    }

    .add-button{
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

    .change-position-button{
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

    /* .ant-progress-outer{
        padding-top: 3px;
        margin: 0px;
    } */

    .ant-statistic-content{
        font-size: 18px;
        color: #696987;
    }

    /* .ant-card {
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 1);
        font-size: 14px;
        border-radius: 10px;
        border:  1px solid #E3E3E3;
        box-shadow: 0px 6px 6px 0px #DADFDF;
    } */


    .move-icon{
        /* display: flex;
        justify-content: center; */
        font-size: 38px;
        width: 100%;
        /* padding: 2px; */
        cursor: pointer;
        color: #ABABAE;
    }

    .button-item{
        margin-left: 2px;
        margin-right: 2px;
        margin-bottom: 4px;
    }

    .button-item{
        border-radius: 8px;
        &:hover {
            background-color: #ABABAE !important;
            border-color: #ABABAE !important;
            color: #fff !important;
        }
    }

    #move-button{
         /* background: rgb(68,151,117); */
        margin-left: 5px;
        margin-right: 5px;
        background: #DEDFDF;
        border-radius: 5px;
        font-weight: 600;
        /* border-color: rgb(68,151,117); */
        border-color: #DEDFDF;
        /* color: #fff; */
        color: #000;
        /* font-size: 16px; */
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: #D4D5D5 !important;
            border-color: #D4D5D5 !important;
            color: #000;
        }
    }

    #active-question{
        background-color: rgba(75, 151, 204, 0.9);
        border-color: rgba(75, 151, 204, 0.9);
        color: #fff;
        &:hover {
            background-color: #316283 !important;
            border-color: #316283 !important;
            color: #fff !important;
        }
    }

    #non-active-question{
        color: #ABABAE;
        border-color: #ABABAE;
    }

    #correct{
        background-color: rgba(82, 196, 26, 0.9);
        border-color: rgba(82, 196, 26, 0.9);
        color: #fff;
        &:hover {
            background-color: #185810 !important;
            border-color: #185810 !important;
            color: #fff !important;
        }
    }

    #wrong{
        background-color: #F1381B;
        color: #fff;
        border-color: #F1381B;
        &:hover {
            background-color: #B6260F !important;
            border-color: #B6260F !important;
            color: #fff !important;
        }
    }

    #wrong-active{
        /* background-color: #096dd9; */
        background-color: #B6260F;
        border-color: #B6260F;
        color: #fff;
        &:hover {
            background-color: #B6260F !important;
            border-color: #B6260F !important;
            color: #fff !important;
        }
    }

    #correct-active{
        /* background-color: #096dd9; */
        background-color: #185810;
        background-color: #185810;
        border-color: #185810;
        color: #fff;
        &:hover {
            background-color: #185810 !important;
            border-color: #185810 !important;
            color: #fff !important;
        }
    }

    #finish{
        background-color: rgba(75, 151, 204, 0.9);
        border-color: rgba(75, 151, 204, 0.9);
        color: #fff;
        &:hover {
            background-color: #316283 !important;
            border-color: #316283 !important;
            color: #fff !important;
        }
    }

    #remain{
        color: #ABABAE;
        border-color: #ABABAE;
    }

    #active{
        /* background-color: #096dd9; */
        background-color: #ABABAE;
        border-color: #ABABAE;
        color: #fff;
    }

    #finish-active{
        /* background-color: #096dd9; */
        background-color: #316283;
        border-color: #316283;
        color: #fff;
        &:hover {
            background-color: #316283 !important;
            border-color: #316283 !important;
            color: #fff !important;
        }
    }

    
    .detail-button{
        background: rgb(68,151,117);
        border-radius: 5px;
        font-size: 16px;
        font-weight: 900;
        border-color: rgb(68,151,117);
        color: #fff;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: rgba(68,151,117, 0.9) !important;
            border-color: rgba(68,151,117, 0.9) !important;
            color: white;
        }
    }

    .delete-button{
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
            color: #E74C3C;
        }
    }

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

`;
