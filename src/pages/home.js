import { useAppContext } from '../app-context';

export const HomePage = () => {
  const { user } = useAppContext();

  return (
    <div>
      <div>Usuario Logado: {JSON.stringify(user)}</div>
    </div>
  );
};
