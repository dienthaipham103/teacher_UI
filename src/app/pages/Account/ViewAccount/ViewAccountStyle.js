import styled from "styled-components";

export const ViewAccountWrapper = styled.div`
    p {
        /* color: '#7D8980' */
        color: #7D8980;
        /* padding-top: 20px; */
        font-size: 16px;
        margin-bottom: 40px;
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
        border-radius: 10px;
        border:  1px solid #E3E3E3;
        /* border:  1px solid #f0f2f5; */
        box-shadow: 0px 6px 6px 0px #DADFDF;
    }

    /* .ant-btn{
        width: 100%;
        height: 50px;
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
    .edit-button{
        width: 30%;
        /* height: 40px; */
        border-radius: 6px;
        font-size: 16px;
        font-weight: 900;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: #417DAD !important;
            border-color: var(--primary-hover-color) !important;
        }
    }

  
`;
