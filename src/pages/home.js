import { useAppContext } from '../app-context';

export const HomePage = () => {
  const { user } = useAppContext();

  return (
    <div>
      <h1>home</h1>

      <div>Usuario Logado: {JSON.stringify(user)}</div>
    </div>
  );
};
