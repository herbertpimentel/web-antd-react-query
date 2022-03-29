import { Button, Layout } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

import { useAppContext } from '../../app-context';

export const RegularHeader = () => {
  const { user, setUser } = useAppContext();

  return (
    <Layout.Header style={{ backgroundColor: '#fff', padding: '0 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>&nbsp;</div>
        <div>
          {user && (
            <Button onClick={() => setUser(null)}>
              <PoweroffOutlined />
              Logout
            </Button>
          )}
        </div>
      </div>
    </Layout.Header>
  );
};
