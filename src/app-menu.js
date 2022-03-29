import { Menu } from 'antd';

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { useAppContext } from './app-context';
import { Link } from 'react-router-dom';

export const AppMenu = () => {
  const { user } = useAppContext();

  const isAuthenticated = !!user;

  return (
    <Menu theme="dark" defaultSelectedKeys={['login']} mode="inline">
      {!isAuthenticated && (
        <>
          <Menu.Item key="login" icon={<PieChartOutlined />}>
            <Link to="/login">Login</Link>
          </Menu.Item>

          <Menu.Item key="password-recovery" icon={<PieChartOutlined />}>
            <Link to="/password-recovery">Recuperar Senha</Link>
          </Menu.Item>
        </>
      )}

      {isAuthenticated && (
        <>
          <Menu.Item key="home" icon={<DesktopOutlined />}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};
