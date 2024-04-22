import React from 'react';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import Header from './components/Header';
import AppRoutes from './routes';
import history from './services/history';
import store, { persistor } from './store';
import GlobalStyles from './styles/Global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HistoryRouter history={history}>
          <Header />
          <AppRoutes />
          <GlobalStyles />
          <ToastContainer autoClose={3000} />
        </HistoryRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
