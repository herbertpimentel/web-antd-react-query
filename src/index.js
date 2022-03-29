import React from 'react';
import ReactDOM from 'react-dom';

import { ConfigProvider } from 'antd';

import { QueryClient, QueryClientProvider } from 'react-query';

import { BrowserRouter } from 'react-router-dom';

import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

import pt_BR from 'antd/lib/locale-provider/pt_BR';
import 'moment/locale/pt-br';

import './antd.css';

import { AppContextProvider } from './app-context';
import { AppRoutes } from './app-routes';

import GlobalStyles from './styles';
import { ErrorBoundary } from './components/app-error-boundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus:
        process.env.REACT_APP_REFETCH_ON_FOCUS === 'true' ||
        process.env.REACT_APP_REFETCH_ON_FOCUS === undefined,
    },
  },
});

momentDurationFormatSetup(moment);

ReactDOM.render(
  <AppContextProvider>
    <ConfigProvider locale={pt_BR}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </BrowserRouter>
      </QueryClientProvider>
    </ConfigProvider>
    <GlobalStyles />
  </AppContextProvider>,
  document.getElementById('root')
);
