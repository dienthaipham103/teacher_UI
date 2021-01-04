import styled from "styled-components";

export const LayoutHeaderWrapper = styled.div`
  .logo{
    height: auto;
    text-align: center;
  }

  .ant-layout-header {
    height: 69px;
    padding: 0 0px;
    line-height: 69px;
    /* background: rgba(18, 115, 235, 1); */
    background: white;
    /* box-shadow: 4px 0px 4px 4px #D4D5F3; */
    box-shadow: 3px 0px 3px 3px #D4D5F3;
    opacity: 0.999;
    border-bottom: 1px solid #EAEBEB;
  }

  .ant-tabs {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #000;
    /* color: blue; */
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 2.45;
    list-style: none;
    -webkit-font-feature-settings: 'tnum';
            font-feature-settings: 'tnum';
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
  }

  .ant-tabs-tab {
    position: relative;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    margin: 0 51px 0 20px;
    padding: 16.5px 0;
    font-size: 15px;
    background: transparent;
    /* border-bottom: 1px solid #d6d8d7; */
    outline: none;
    cursor: pointer;
  }

  .ant-tabs-tab:hover {
    color: #1273EB;
  }

  .ant-tabs-ink-bar {
    position: absolute;
    background: #124C73;
    pointer-events: none;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #124C73;
    font-weight: 700;
  }

  ////

  .ant-tabs-tab-remove:active {
    /* color: #096dd9; */
    color: '#000';
  }

  .flex-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .flex-item {
  }

  .avatar-container {
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    flex-wrap: wrap;
    margin-right: 10px;
  }

  .avatar-item{
    margin: 0 7px;
    .avatar{
    }
  }

  a{
    color: #050E86;
    /* font-family: quicksand, arial; */
  }

  p {
    color: #050E86;
    /* text-transform: uppercase; */
    /* font-family: quicksand, arial; */
  }

  .ant-menu {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    margin-left: 40px;
    /* padding-right: 0; */
    padding: 0;
    font-variant: tabular-nums;
    line-height: 1.5715;
    -webkit-font-feature-settings: 'tnum';
            font-feature-settings: 'tnum';
    margin-bottom: 0;
    padding-left: 0;
    color: rgba(0, 0, 0, 0.85);
    font-size: 15px;
    line-height: 0;
    text-align: left;
    list-style: none;
    /* background: #001529; */
    background: white;
    outline: none;
    /* -webkit-box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05); */
            /* box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05); */
    -webkit-transition: background 0.3s, width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
    transition: background 0.3s, width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  }

  .ant-menu-item-selected {
    /* color: #1890ff; */
    color: #000;
  }

`;
