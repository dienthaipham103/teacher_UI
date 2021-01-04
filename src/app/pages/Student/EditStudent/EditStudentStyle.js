import styled from "styled-components";
// import Background from 'assets/images/71.jpg';

// export const BackgroundWrapper = styled.div`

//     background-image: url(${Background});
//     height: 50vh;
//     background-position: center;
//     background-repeat: no-repeat;
//     background-size: cover;
//     box-shadow: 0 0 6px 5px gray;
//     /* filter: blur(8px);
//   -webkit-filter: blur(8px); */
// `;


export const EditStudentWrapper = styled.div`

    /* margin-left: 68px; */
    .container{
        display: flex;
        align-items: baseline;
        justify-content: flex-tsart;
        flex-wrap: wrap;
        margin-top: 30px;
        margin-bottom: 0px;
    }

    .item{
        margin-right: 10px;
        padding-top: 0px;
        padding-bottom: 0px; 
    }
    
    /* .container{
        display: flex;
        justify-content: flex-start;
    }

    .item{
        margin-right: 40px;
    } */

    .ant-card {
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

   
    /* .form-section .form-group label{
        font-size : 20px
    } */

    .ant-input{
        border-radius: 5px;
        /* box-shadow: 0px 2px 2px #D6D8D7 inset; */
    }

    .ant-input-number{
        border-radius: 5px;
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

    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
        border-radius: 5px;
        height: 34px;
        /* font-size: 26px; */
    }
  
`;
