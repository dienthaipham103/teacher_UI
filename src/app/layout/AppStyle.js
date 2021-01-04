import styled from 'styled-components';
import { Layout } from 'antd';

export const AppWrapper = styled.div`

  .app {
  }

  @media only screen and (max-width: 768px) {
    .avatar-item{
      p {
        display: none;
      }
      .avatar{
        display: none;
      }
    }

    .wiiquiz-logo{
      display: none;
    }
 
    main {
      padding-left: 88px !important;
      
    }
    
  }
`;

export const WrapperLayout = styled(Layout)`
  min-height: 100vh;
  .ant-layout {
    min-height: 100vh;
    &-content {
      /* padding: 30px; */
      &.site-layout {
        /* background-color: #f0f2f5; */
        background-color: #fff;
      }
    }
  }

  #components-layout-demo-top-side-2 .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 28px 16px 0;
    float: left;
  }

  .site-layout {
    background: teal;
    /* background: #fff; */
    /* background-color: #fff; */
    /* background: #f7f9fa; */
    /* background: #F6F8F8; */
    /* background: yellow; */
  }

  .ant-btn {
        /* background: #1273EB; */
        font-size: 14px;
        border-color: #1273EB;
        color: #1273EB;
        -webkit-box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0px 0px 0 rgba(0, 0, 0, 0.045);
        &:hover {
            background-color: #1273EB !important;
            border-color: var(--primary-hover-color) !important;
            color: white;
        }
  }
`;
