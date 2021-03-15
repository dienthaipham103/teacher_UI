import styled from "styled-components";


export const TestResultDetailWrapper = styled.div`

    .quiz-info{
        padding: 0px;
        margin: 0px;
        font-weight: 400;
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

    /* .ant-checkbox {
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.85);
        font-size: 24px;
        font-variant: tabular-nums;
        line-height: 1.5715;
        list-style: none;
        -webkit-font-feature-settings: 'tnum';
                font-feature-settings: 'tnum';
        position: relative;
        top: -0.09em;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        vertical-align: middle;
        outline: none;
        cursor: pointer;
    } */

    /* .ant-checkbox-checked::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 1px solid #1890ff;
        border-radius: 2px;
        visibility: hidden;
        -webkit-animation: antCheckboxEffect 0.36s ease-in-out;
                animation: antCheckboxEffect 0.36s ease-in-out;
        -webkit-animation-fill-mode: backwards;
                animation-fill-mode: backwards;
        content: '';
    } */

    ////////////////////////Radio//////////////////////////////////////////////
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

    /* .ant-radio-inner::after {
        -webkit-transform: scale(0);
                transform: scale(0);
        opacity: 0;
        -webkit-transition: all 0.0s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        transition: all 0.0s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        content: ' ';
    } */

    /* .ant-radio-button-wrapper {
        position: relative;
        display: inline-block;
        height: 32px;
        margin: 0;
        padding: 0 15px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        line-height: 30px;
        background: #fff;
        border: 1px solid #d9d9d9;
        border-top-width: 1.02px;
        border-left-width: 0;
        cursor: not-allowed;
        -webkit-transition: color 0.0s, background 0.0s, border-color 0.0s, -webkit-box-shadow 0.0s;
        transition: color 0.0s, background 0.0s, border-color 0.0s, -webkit-box-shadow 0.0s;
        transition: color 0.0s, background 0.0s, border-color 0.0s, box-shadow 0.0s;
        transition: color 0.0s, background 0.0s, border-color 0.0s, box-shadow 0.0s, -webkit-box-shadow 0.3s;
    } */

    /* .ant-radio-checked .ant-radio-inner{
        border-color: red !important ;
    } */

    /* #wrong-answer{
        .ant-radio-checked .ant-radio-inner:after{
            background-color: red;
        }
    } */

    /* .ant-radio:hover .ant-radio-inner {
        border-color: red ; 
    } */

    ////////////////////////Radio//////////////////////////////////////////////

    .ant-card-body{
        padding-top: 0px;
        padding-left: 0px;
        padding-right: 0px;
        padding-bottom: 40px;
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
        .ant-checkbox-checked::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 1px solid #1890ff;
            border-radius: 2px;
            visibility: hidden;
            -webkit-animation: antCheckboxEffect 0s ease-in-out;
                    animation: antCheckboxEffect 0s ease-in-out;
            -webkit-animation-fill-mode: backwards;
                    animation-fill-mode: backwards;
            content: '';
        }
    
        .ant-checkbox-inner {
            position: relative;
            top: 0;
            left: 0;
            display: block;
            /* width: 16px; */
            /* height: 16px; */
            direction: ltr;
            background-color: #fff;
            border: 1px solid #d9d9d9;
            border-radius: 2px;
            border-collapse: separate;
            -webkit-transition: all 0s;
            transition: all 0s;
        }
       
        .ant-checkbox-checked .ant-checkbox-inner::after {
            position: absolute;
            display: table;
            border: 2px solid #fff;
            border-top: 0;
            border-left: 0;
            -webkit-transform: rotate(45deg) scale(1) translate(-50%, -50%);
                    transform: rotate(45deg) scale(1) translate(-50%, -50%);
            opacity: 1;
            -webkit-transition: all 0s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0s;
            transition: all 0s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0s;
            content: ' ';
        }

        .ant-checkbox-checked .ant-checkbox-inner {
            background-color: #1890ff;
            border-color: #1890ff;
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

    .my-correct-checkbox-multiple{
        .ant-checkbox-checked::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 1px solid #1890ff;
            border-radius: 2px;
            visibility: hidden;
            -webkit-animation: antCheckboxEffect 0s ease-in-out;
                    animation: antCheckboxEffect 0s ease-in-out;
            -webkit-animation-fill-mode: backwards;
                    animation-fill-mode: backwards;
            content: '';
        }
    
        .ant-checkbox-inner {
            position: relative;
            top: 0;
            left: 0;
            display: block;
            /* width: 16px; */
            /* height: 16px; */
            direction: ltr;
            background-color: #fff;
            border: 1px solid #d9d9d9;
            border-radius: 2px;
            border-collapse: separate;
            -webkit-transition: all 0s;
            transition: all 0s;
        }
       
        .ant-checkbox-checked .ant-checkbox-inner::after {
            position: absolute;
            display: table;
            border: 2px solid #fff;
            border-top: 0;
            border-left: 0;
            -webkit-transform: rotate(45deg) scale(1) translate(-50%, -50%);
                    transform: rotate(45deg) scale(1) translate(-50%, -50%);
            opacity: 1;
            -webkit-transition: all 0s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0s;
            transition: all 0s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0s;
            content: ' ';
        }
        .ant-checkbox-checked .ant-checkbox-inner {
            background-color: #4CCF3C;
            border-color: #4CCF3C;
        }
    }

    .my-wrong-checkbox-multiple{
        .ant-checkbox-checked::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 1px solid #1890ff;
            border-radius: 2px;
            visibility: hidden;
            -webkit-animation: antCheckboxEffect 0s ease-in-out;
                    animation: antCheckboxEffect 0s ease-in-out;
            -webkit-animation-fill-mode: backwards;
                    animation-fill-mode: backwards;
            content: '';
        }
    
        .ant-checkbox-inner {
            position: relative;
            top: 0;
            left: 0;
            display: block;
            /* width: 16px; */
            /* height: 16px; */
            direction: ltr;
            background-color: #fff;
            border: 1px solid #d9d9d9;
            border-radius: 2px;
            border-collapse: separate;
            -webkit-transition: all 0s;
            transition: all 0s;
        }
       
        .ant-checkbox-checked .ant-checkbox-inner::after {
            position: absolute;
            display: table;
            border: 2px solid #fff;
            border-top: 0;
            border-left: 0;
            -webkit-transform: rotate(45deg) scale(1) translate(-50%, -50%);
                    transform: rotate(45deg) scale(1) translate(-50%, -50%);
            opacity: 1;
            -webkit-transition: all 0s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0s;
            transition: all 0s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0s;
            content: ' ';
        }
        .ant-checkbox-checked .ant-checkbox-inner {
            background-color: #F1381B;
            border-color: #F1381B;
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


    
`;
