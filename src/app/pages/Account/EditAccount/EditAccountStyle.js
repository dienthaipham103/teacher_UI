import styled from "styled-components";

export const EditAccountWrapper = styled.div`
    p {
        /* color: '#7D8980' */
        color: #7D8980;
        padding-top: 30px;
    }

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

    .ant-card {
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 1);
        font-size: 14px;
        /* background: rgba(255, 255, 255, 0.8); */
        /* background: #f0f4fe; */
        border-radius: 8px;
        border:  0px solid #f0f4fe;
        /* border:  1px solid #C2C9D6; */
        /* box-shadow: 0px 0px 6px 0px white; */
    }

    /* .ant-btn-primary{
        width: 100%;
        height: 45px;
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
    }

    .ant-btn{
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: #417DAD !important;
            border-color: var(--primary-hover-color) !important;
        }
    } */
/* 
    .input{
        font-size: 16px;
        border-radius: 6px;
        height: 45px;
    } */

    .ant-input {
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-variant: tabular-nums;
        list-style: none;
        -webkit-font-feature-settings: 'tnum';
                font-feature-settings: 'tnum';
        position: relative;
        display: inline-block;
        width: 100%;
        height: 40px;
        min-width: 0;
        padding: 4px 11px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 16px;
        line-height: 1.5715;
        background-color: #fff;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
    }

    .edit-button{
        font-size: 16px;
        font-weight: 900;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: #417DAD !important;
            border-color: var(--primary-hover-color) !important;
        }
    }

    .cancel-button{
        font-size: 16px;
        font-weight: 900;
        border-radius: 6px;
        color: #DEAA07;
        border-color: #DEAA07;
        &:hover {
            background-color: #DEAA07 !important;
            border-color: #DEAA07 !important;
        }
    }
  
`;
