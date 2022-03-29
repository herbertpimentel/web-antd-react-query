import React from 'react';

import { Route, useHistory } from 'react-router-dom';

import { AppLayout } from './layout/layout';

import { Button, Result } from 'antd';
import { useAppContext } from '../app-context';

export const AppRoute = ({
  layout = 'regular',
  children,
  requiresLogin = true,
  guard = null,
  ...rest
}) => {
  const { user } = useAppContext();
  const history = useHistory();

  const authenticated = !!user;

  if (requiresLogin && !authenticated) {
    window.location.href = '/login';
    return null;
  }

  let returnChildren = children;

  if (guard !== null) {
    let enabled = false;
    if (typeof guard === 'boolean') {
      enabled = guard;
    } else if (typeof guard === 'function') {
      enabled = guard();
    }

    if (!enabled) {
      returnChildren = (
        <Result
          status="warning"
          title="Você não tem permissão para acessar essa página"
          extra={
            <Button type="primary" onClick={() => history.push(`/`)}>
              Voltar ao início
            </Button>
          }
        />
      );
    }
  }

  return (
    <Route {...rest}>
      {layout === 'regular' && <AppLayout>{returnChildren}</AppLayout>}
      {layout === 'none' && (
        <div style={{ height: '100%' }}>{returnChildren}</div>
      )}
    </Route>
  );
};
