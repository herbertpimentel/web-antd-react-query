import { Menu } from 'antd';

import {
  DesktopOutlined,
  PieChartOutlined,
  SettingOutlined,
  BarsOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';

import { useAppContext } from './app-context';

export const AppMenu = ({ collapsed }) => {
  const { user, clear } = useAppContext();

  const isAuthenticated = !!user;

  const routeMatch = useRouteMatch();

  return (
    <Menu
      defaultSelectedKeys={[routeMatch.path.replace('/', '')]}
      style={{
        backgroundColor: 'transparent',
        borderRightColor: 'transparent',
      }}
      className={['side-menu', !collapsed ? 'side-menu-non-collapsed' : '']}
      mode="inline"
    >
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
            <Link to="/home">Início</Link>
          </Menu.Item>
          <Menu.SubMenu
            key="financeiro"
            icon={<BarsOutlined />}
            title="Financeiro"
          >
            <Menu.Item key="3">Entradas</Menu.Item>
            <Menu.Item key="4">Saídas</Menu.Item>
            <Menu.Item key="5">Contas</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="sub2"
            icon={<SettingOutlined />}
            title="Configurações"
          >
            <Menu.Item key="usuarios">
              <Link to="/usuarios">Contas de usuários</Link>
            </Menu.Item>
            <Menu.Item key="parametros">Parâmetros de sistema</Menu.Item>
            <Menu.Item key="tabelas">Tabelas de sistema</Menu.Item>
            <Menu.Item key="arquivos">Arquivos</Menu.Item>
            <Menu.Item key="backups">Backups</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="100" icon={<PoweroffOutlined />} onClick={clear}>
            Desconectar
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};
