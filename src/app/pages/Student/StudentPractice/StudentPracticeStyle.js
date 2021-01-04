import styled from "styled-components";


export const StudentPracticeWrapper = styled.div`

    p{
        margin: 0px;
    }

    .quiz-info{
        font-size: 16px;
        font-weight: 600; 
        color: gray; 
        margin: 0px;
    }

     /*note: p margin*/
     /* p {
        color: #7D8980;
        font-size: 16px;
        margin-top: 0px;
        margin-bottom: 20px;
        margin-left: 26px;
    }
     */
    .container{
        display: flex;
        align-items: baseline;
        justify-content: flex-tsart;
        flex-wrap: wrap;
    }

    .item{
        margin-right: 10px;
        padding-top: 0px;
        padding-bottom: 20px; 
    }

    /* .ant-card {
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 1);
        font-size: 14px;
        border-radius: 10px;
        border:  1px solid #C2C9D6;
    } */

    .ant-card {
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 1);
        font-size: 14px;
        /* background: rgba(255, 255, 255, 0.8); */
        /* background: #f0f4fe; */
        border-radius: 10px;
        border:  1px solid #E3E3E3;
        /* border:  1px solid #f0f2f5; */
        box-shadow: 0px 6px 6px 0px #DADFDF;
    }

    /* .ant-card-head {
        color: #00008a;
        font-weight: 800;
        border-bottom: 0px solid #f0f0f0;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: rgba(255, 255, 255, 0.1);
    } */

    .ant-form-item {
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5715;
        list-style: none;
        -webkit-font-feature-settings: 'tnum';
                font-feature-settings: 'tnum';
        margin-bottom: 28px;
        vertical-align: top;
        border-radius: 10px;
    }

    /* .ant-btn-primary {
        background: #1273EB;
        border-color: #1273EB;
        color: #F6F9FB;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: #00008a !important;
            border-color: var(--primary-hover-color) !important;
        }
    } */
    /* .ant-btn-primary{
        width: 100%;
        background: #1273EB;
        border-color: #1273EB;
        color: white;
        font-size: 14px;
        font-weight: 500;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: #417DAD !important;
            border-color: var(--primary-hover-color) !important;
        }
        border-radius: 6px;
    } */

    .ant-btn{
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        &:hover{
            background-color: #1273EB !important;
            border-color: var(--primary-hover-color) !important;
            color: white;
        }
    }

    .edit-button{
        /* padding-right: 40px; */
        width: 95%;
        font-size: 16px;
        font-weight: 900;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: #417DAD !important;
            border-color: var(--primary-hover-color) !important;
        }
    }

    .delete-button{
        font-size: 16px;
        font-weight: 900;
        border-radius: 6px;
        color: red;
        border-color: red;
        &:hover {
            background-color: red !important;
            border-color: red !important;
        }
    }

    .ant-tabs {
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.85);
        font-size: 16px;
        font-variant: tabular-nums;
        line-height: 1.5715;
        list-style: none;
        -webkit-font-feature-settings: 'tnum';
                font-feature-settings: 'tnum';
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        overflow: hidden;
    }

    .ant-tabs-tab {
        position: relative;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        margin: 0 52px 0 0;
        padding: 12px 0;
        font-size: 18px;
        font-weight: 900;
        background: transparent;
        border: 0;
        outline: none;
        cursor: pointer;
    }

`;
