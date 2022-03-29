import { Switch } from 'react-router-dom';

import { AppRoute } from './components/app-route';

import { LoginPage } from './pages/login';
import { HomePage } from './pages/home';
import { NotFoundPage } from './pages/not-found';

export const AppRoutes = () => {
  return (
    <Switch>
      <AppRoute exact path="/">
        <HomePage />
      </AppRoute>

      <AppRoute path="/login" requiresLogin={false} layout="none">
        <LoginPage />
      </AppRoute>

      <AppRoute path="/home">
        <HomePage />
      </AppRoute>

      <AppRoute path="*" requiresLogin={false}>
        <NotFoundPage />
      </AppRoute>
    </Switch>
  );
};
