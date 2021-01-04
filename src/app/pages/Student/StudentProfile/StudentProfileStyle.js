import styled from "styled-components";

export const ModalWrapper = styled.div`
   /* .xxxx .ant-modal-content, .xxxx .ant-modal-content .ant-modal-header {
        border-radius: 20px 20px 20px 20px;
    } */
`


export const StudentProfileWrapper = styled.div`

    /*note: p margin*/
    p {
        /* color: '#7D8980' */
        color: #7D8980;
        font-size: 16px;
        /* padding-top: 30px; */
        margin-top: 0px;
        margin-bottom: 20px;
        margin-left: 26px;
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
    .ant-btn-primary{
        width: 100%;
        /* height: 45px; */
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
        color: #ff4d4f;
        border-color: #ff4d4f;
        &:hover {
            background-color: #ff4d4f !important;
            border-color: #ff4d4f !important;
        }
    }

    /* .exist-button{
        color: red;
        font-size: 16px;
        font-weight: 900;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: #417DAD !important;
            border-color: var(--primary-hover-color) !important;
        }
    } */

    /* .ant-modal-content {
        border-radius: 12px;
    } */
    /* .ant-modal {
        border-radius: 10px;
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
        position: relative;
        top: 100px;
        width: auto;
        max-width: calc(100vw - 32px);
        margin: 0 auto;
        padding-bottom: 24px;
    } */

    /* .ant-modal-body {
        border-radius: 10px;
        padding: 24px;
        font-size: 16px;
        line-height: 1.5715;
        word-wrap: break-word;
    } */

    /* .ant-modal-wrap-rtl.ant-modal-centered .ant-modal {
        text-align: center;
    } */

  
`;
