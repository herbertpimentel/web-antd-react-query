import { Layout } from 'antd';

import { Logo } from './logo';
import { AppMenu } from '../../app-menu';

export const SideMenu = ({ collapsed, onCollapse }) => {
  return (
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div style={{ height: 62, padding: 16 }}>
        <Logo />
      </div>

      <div style={{ marginTop: 28 }}>
        <AppMenu />
      </div>
    </Layout.Sider>
  );
};
