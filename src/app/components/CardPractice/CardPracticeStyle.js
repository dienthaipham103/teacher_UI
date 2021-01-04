import styled from "styled-components";


export const CardPracticeWrapper = styled.div`

    .ant-card {
        /* margin: 0; */
        padding: 0;
        /* color: rgba(0, 0, 0, 1); */
        font-size: 16px;
        border-radius: 5px;
        box-shadow: 0px 2px 10px rgba(188, 188, 188, 0.5);
        background-color: #fff;
        &:hover {
            /* background-color: var(--primary-hover-color) !important; */
            cursor: pointer;
        }
    }

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

`;
