import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  /* begin: gobal styles for everywhere in the app */
  * {
    -webkit-font-smoothing: antialiased;
  }

  body {
    color: #262827;
  }

  hr {
    height: 0.5px;
    opacity: 0.2;
    color: #E6E4E5;
    margin-bottom: 25px;
  }

  .side-menu .anticon svg > path {
    color: #1890ff !important;
  }

  .side-menu a,
  .side-menu a:hover,
  .side-menu a:active {
    color: #262827;
  }

  .side-pane .ant-layout-sider-trigger {
    background-color: transparent !important;
  }

  .side-menu-non-collapsed ul.ant-menu-sub {
    background-color: transparent;
  }

  .side-menu-non-collapsed .ant-menu-item,
  .side-menu-non-collapsed .ant-menu-submenu .ant-menu-submenu-title {
    padding-left: 8px !important;
  }

  .side-menu-non-collapsed .ant-menu-sub > .ant-menu-item {
    padding-left: 32px !important;
  }

  .side-menu-non-collapsed .ant-menu-submenu-arrow {
    text-align: right;
  }

  .side-menu-non-collapsed .ant-menu-selected::after,
  .side-menu-non-collapsed .ant-menu-item-selected::after {
    display: none;
  }

  .side-menu .ant-menu-item-selected,
  .side-menu-non-collapsed .ant-menu-selected,
  .side-menu-non-collapsed .ant-menu-item-selected
  {
    border-radius: 6px;
    background-color: rgba(176, 182, 185, 0.47) !important;
  }

  .side-menu-non-collapsed .ant-menu-item-selected {
    border-right-color: transparent;
  }
`;
