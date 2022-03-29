import { useState } from 'react';

import { Layout } from 'antd';

import { ErrorBoundary } from '../app-error-boundary';

import { AppMenu } from '../../app-menu';
import { Logo } from './logo';

export const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(
    JSON.parse(localStorage.getItem('@@side-menu-collapsed') || null) || false
  );

  const onCollapse = (collapsed) => {
    localStorage.setItem('@@side-menu-collapsed', JSON.stringify(collapsed));
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }} className="side-pane">
      <Layout.Sider
        width={260}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          backgroundColor: '#D3DCDF',
          borderRight: '1px solid #E1E3E3',
        }}
      >
        <div style={{ minHeight: 40, padding: 16 }}>
          <Logo collapsed={collapsed} />
        </div>

        <div style={{ marginTop: 24, paddingLeft: 16, paddingRight: 16 }}>
          <AppMenu collapsed={collapsed} />
        </div>
      </Layout.Sider>

      <Layout style={{ backgroundColor: '#fff' }}>
        <Layout.Content style={{ margin: '30px 16px 0' }}>
          <div
            style={{
              height: '100%',
              padding: 24,
              minHeight: 360,
            }}
          >
            <ErrorBoundary>{children}</ErrorBoundary>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
