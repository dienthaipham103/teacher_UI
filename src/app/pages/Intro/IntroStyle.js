import styled from "styled-components";
// import Background from 'assets/images/background_t1.png';
import Background from 'assets/images/my_bg1.png';

export const IntroWrapper = styled.div`

    .bg {
        background-image: url(${Background});
        height: 100vh;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .icons-container{
        display: flex;
        justify-content: center;
        padding: 20px;
    }

    .icon-item{
        margin: 0 18px;
        .ant-btn-primary {
            /* background: linear-gradient(-90deg, #1d729c, #3ba1cd); */
            background: #163C63;
            border-color: #163C63;
            color: white;
            font-weight: 500;
            /* -webkit-box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.045); */
            /* box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.045); */
            border-radius: 6px;
            &:hover {
            background-color: #3C99D7 !important;
            border-color: #3C99D7 !important;
        }
            
        }
        .ant-btn-dashed {
            /* background: linear-gradient(-90deg, #1d729c, #3ba1cd); */
            background: #2c31cf;
            /* background: transparent; */
            border-color: #3ba1cd;
            color: white;
            font-weight: 500;
            /* -webkit-box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.045); */
            /* box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.045); */
            border-radius: 6px;
            &:hover {
            background-color: #3C99D7 !important;
            border-color: #3C99D7 !important;
        }
        }
    }

    .site-card{
        /* padding: 10vh; */
        padding-left: 136vh;
        padding-top: 6vh;
    }

    .ant-card-head {
        min-height: 48px;
        margin-bottom: 0px;
        padding: 0 24px;
        color: #14148A;
        font-weight: 500;
        font-size: 24px;
        text-align: center;
        background: transparent;
        border-bottom: 0px solid #f0f0f0;
        border-radius: 5px 2px 0 0;
    }

    .ant-card {
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        background: white;
        border-radius: 18px;
        box-shadow: 0px 0px 8px 0px #E7EAEC;
    }

    .ant-form {
        margin: 0;
        padding-left: 5px;
        padding-right: 5px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
    }  

    .ant-form-item {
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        margin-bottom: 30px;
    }

    .ant-input {
        margin: 0;
        padding: 0;
        width: 100%;
        min-width: 0;
        padding: 4px 4px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        background-color: #fff;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
    }

    .register-form-button{
        width: 100%;
        height: 55px;
        background: #302ed0;
        border-color: #3ba1cd;
        color: white;
        font-size: 18px;
        font-weight: 500;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: #417DAD !important;
            border-color: var(--primary-hover-color) !important;
        }
        border-radius: 6px;
    }

    .fg-container{
        display: flex;
        justify-content: center;
        /* padding: 20px; */
    }

    .fg-item{
        margin: 0 16px;
    }

    #f{
        :hover {
            background: #C3D9F9;
        }
    }

    #g{
        :hover {
            /* background: #C3D9F9; */
            background: #F5D4D3;
        }
    }

    /* .scroll{
        background-color: 'blue'
    } */

`;
