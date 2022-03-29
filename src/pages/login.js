import { Button } from 'antd';
import { Redirect } from 'react-router-dom';

import { Form, Input } from 'antd';

import { useAppContext } from '../app-context';

export const LoginPage = () => {
  const { user, setUser } = useAppContext();

  const handleLogin = (values) => {
    console.log('Success:', values);
    setUser(values);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div style={{ maxWidth: '300px' }}>
      <h1>Login</h1>

      <Form onFinish={handleLogin} layout="vertical" autoComplete="off">
        <Form.Item
          label="Nome de usuário"
          name="username"
          rules={[{ required: true, message: 'Digite o nome de usuário' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="password"
          rules={[{ required: true, message: 'Digite a senha' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
