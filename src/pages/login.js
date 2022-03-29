import { Button, Space } from 'antd';
import { Redirect } from 'react-router-dom';

import { Form, Input, notification } from 'antd';

import { useAppContext } from '../app-context';

import { useLoginMutation } from '../lib/api';
import { PageTitle } from '../components/PageTitle';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const { user, setUser, setToken } = useAppContext();

  const loginMutation = useLoginMutation();

  const handleLogin = async (values) => {
    try {
      const loginResponse = await loginMutation.mutateAsync({
        user: values.username,
        password: values.password,
      });

      setToken('<token retornado da api ex: loginResonse.token >');
      setUser(loginResponse?.user);
    } catch (err) {
      notification.error({
        message: 'Nãofoi possível fazer login',
        description: err.message,
      });
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(230,228,229, 0.26)',
          border: '1px solid #E1E3E3',
          borderRadius: '12px',
          width: '540px',
          padding: '40px 60px',
        }}
      >
        <PageTitle>Login</PageTitle>

        <Form
          onFinish={handleLogin}
          layout="vertical"
          autoComplete="off"
          style={{ marginTop: '20px' }}
          size="large"
        >
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

          <Space size="small">
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '180px' }}
              loading={loginMutation.isLoading}
            >
              Entrar
            </Button>

            <Link to="/password-recovery">
              <Button type="link">Esqueci minha senha</Button>
            </Link>
          </Space>
        </Form>
      </div>
    </div>
  );
};
