import styled from "styled-components";


export const QuizInfoWrapper = styled.div`

    .basic-info{
        margin-bottom: 10px;
        color: rgba(0, 0, 0, 0.85);
    }

    p{
        font-size: 16px;
        padding: 0px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .active-button{
        margin-bottom: 16px;
        margin-top: 8px;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        &:hover{
            background-color: #1273EB !important;
            border-color: var(--primary-hover-color) !important;
            color: white;
        }
    }
    
    .not-active-button{
        margin-bottom: 16px;
        margin-top: 8px;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        &:hover{
            background-color: #fff !important;
            border-color:  #1273EB !important;
            color:  #1273EB;
        }
        cursor: not-allowed;
    }

    .time-card{
        width: 100%;
        font-size: 16px;
        padding-top: 0px;
        padding-bottom: 0px;
        padding-right: 10px;
        padding-left: 10px;
        border-radius: 5px;
        box-shadow: 0px 1px 5px rgba(188, 188, 188, 0.5);
        margin-bottom: 20px;
    }

    .ant-timeline-item-last > .ant-timeline-item-content {
        min-height: 0px;
    }

    .description-card{
        background-color: #f6f8f8;
        width: 100%;
        font-size: 16px;
        padding-top: 0px;
        padding-bottom: 0px;
        padding-right: 10px;
        padding-left: 10px;
        border-radius: 5px;
        box-shadow: 0px 1px 5px rgba(188, 188, 188, 0.5);
        margin-bottom: 20px;
    }

    .info-card {
        /* margin: 0; */
        padding: 0;
        /* color: rgba(0, 0, 0, 1); */
        width: 90%;
        font-size: 16px;
        /* border-radius: 5px; */
        box-shadow: 0px 2px 10px rgba(188, 188, 188, 0.5);
        background-color: #fff;
        &:hover {
            /* background-color: var(--primary-hover-color) !important; */
            /* cursor: pointer; */
        }
    }

    .ant-card-body{
        padding-bottom: 0px;
    }

    .description-card{
        padding-bottom: 20px;
    }

    /* .time-card{
        padding-bottom: 0px;
    } */

    .ant-card-actions {
        margin: 0;
        padding: 0;
        list-style: none;
        background: #fff;
        border-top: 1px solid #d4d5dd;
    }

    .ant-card-grid-hoverable:hover {
        position: relative;
        z-index: 3;
        -webkit-box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
                box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
    }

    .ant-timeline-item {
        position: relative;
        margin: 0;
        padding-bottom: 5px;
        font-size: 16px;
        list-style: none;
    }
`;
