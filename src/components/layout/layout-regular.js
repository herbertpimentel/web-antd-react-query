import { useState } from 'react';

import { Layout } from 'antd';

import { ErrorBoundary } from '../app-error-boundary';

import { SideMenu } from './layout-side-menu';
import { RegularHeader } from './layout-header';
import { LayoutFooter } from './layout-footer';

const LayoutRegular = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideMenu collapsible collapsed={collapsed} onCollapse={onCollapse} />

      <Layout className="site-layout">
        <RegularHeader />

        <Layout.Content
          style={{ margin: '30px 16px 0', backgroundColor: '#fff' }}
        >
          <div style={{ padding: 24, minHeight: 360 }}>
            <ErrorBoundary>{children}</ErrorBoundary>
          </div>
        </Layout.Content>

        <LayoutFooter />
      </Layout>
    </Layout>
  );
};

export default LayoutRegular;
