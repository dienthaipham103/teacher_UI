import styled from "styled-components";


export const QuizWrapper = styled.div`

    p{
        margin: 0px;
    }

    .quiz-info{
        font-size: 16px;
        font-weight: 600; 
        color: gray; 
        margin: 0px;
    }

    .ant-card {
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 1);
        font-size: 14px;
        /* background: rgba(255, 255, 255, 0.8); */
        background: #F7F8FA;
        border-radius: 10px;
        /* border:  1px solid #f0f2f5; */
        /* border:  1px solid #C2C9D6; */
        /* box-shadow: 0px 0px 6px 0px white; */
    }

    .ant-card-head {
        color: #00008a;
        /* color: white; */
        font-weight: 800;
        border-bottom: 0px solid #f0f0f0;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: rgba(255, 255, 255, 0.1);
        /* background: #163C63; */
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

    .preview-button{
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        &:hover{
            background-color: #1273EB !important;
            border-color: var(--primary-hover-color) !important;
            color: white;
        }
    }

    .not-preview-button{
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        &:hover{
            background-color: #fff !important;
            border-color: var(--primary-hover-color) !important;
            color: var(--primary-hover-color);
        }
        cursor: not-allowed;
    }

    .ant-card-meta-title {
        white-space: pre-line;
    }

    .ant-tag {
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        margin: 0;
        padding: 0;
        /* color: blue; */
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5715;
        list-style: none;
        -webkit-font-feature-settings: 'tnum';
                font-feature-settings: 'tnum';
        display: inline-block;
        height: auto;
        margin-right: 8px;
        padding: 0 7px;
        font-size: 14px;
        line-height: 30px;
        white-space: nowrap;
        /* background: #fafafa; */
        /* border: 1px solid #d9d9d9; */
        border-radius: 2px;
        cursor: default;
        opacity: 1;
        -webkit-transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    }

    




    /* .ant-btn-primary {
        background: #1273EB;
        border-color: #1273EB;
        border-radius: 5px;
        color: #F6F9FB;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: #00008a !important;
            border-color: var(--primary-hover-color) !important;
        }
    } */
`;
