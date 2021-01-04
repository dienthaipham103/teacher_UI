import styled from "styled-components";


export const StudentListWrapper = styled.div`

    .my-link{
        font-size: 16px;
        padding: 8px;
        border-radius: 5px;
        font-weight: 900;
        color: #3F7CE5;
        &:hover {
            /* color: red; */
            background-color: #F2F3F5;
        }
    }

    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
        border-radius: 5px;
        height: 40px;
        font-size: 16px;
        border-color: #A7A6A9;
    }

    .ant-select-single .ant-select-selector .ant-select-selection-item,
    .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
        /* padding: 0; */
        line-height: 36px;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
    }

    .ant-select-arrow {
        display: inline-block;
        color: inherit;
        font-style: normal;
        line-height: 0;
        text-transform: none;
        vertical-align: -0.125em;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        position: absolute;
        top: 53%;
        right: 10px;
        width: 11px;
        height: 11px;
        margin-top: -7px;
        color: rgba(0, 0, 0, 0.95);
        font-size: 14px;
        line-height: 1;
        text-align: center;
        pointer-events: none;
    }

    .ant-select {
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.85);
        font-size: 18px;
        font-variant: tabular-nums;
        line-height: 1.5715;
        list-style: none;
        -webkit-font-feature-settings: 'tnum';
                font-feature-settings: 'tnum';
        position: relative;
        display: inline-block;
        cursor: pointer;
    }

    .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
        /* border-color: red; */
        border-right-width: 1px !important;
        box-shadow: 3px 3px 3px 3px #EDEDF0;
    }

    .select-option{
        font-size: 16px;
        font-weight: 600;
        padding: 0px;
        margin: 0px;
    }

    .ant-card {
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
        min-height: 260px;
    }

    .ant-card-head {
        color: #00008a;
        /* color: white; */
        font-weight: 900;
        font-size: 18px;
        border-bottom: 0px solid #f0f0f0;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        /* background: rgba(255, 255, 255, 0.1); */
        /* background: #DBE1E5; */
    }

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

    .ant-btn-primary{
        /* width: 100%; */
        /* height: 45px; */
        background: #417DAD;
        border-color: #417DAD;
        color: white;
        font-size: 16px;
        font-weight: 500;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: rgba(65, 125, 173, 0.9) !important;
            border-color: rgba(65, 125, 173, 0.95) !important;
        }
        border-radius: 5px;
    }

    .quiz-button{
        &:hover {
            background-color: #141452 !important;
            border-color: #141452 !important;
        }
    }

    .search-container{
        display: flex;
        /* flex-direction: column; */
        flex-wrap: wrap;
        align-items: center;
    }

    .search-item{
        margin: 5px;
    }

    .ant-select-arrow {
        /* color: blue; */
    }

    .ant-select {
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
        display: inline-block;
        cursor: pointer;
    }

    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
        border-radius: 5px;
        /* height: 46px; */
        /* font-size: 26px; */
    }

   
`;
