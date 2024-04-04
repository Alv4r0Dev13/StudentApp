import React from 'react';

import Header from './components/Header';
import Login from './pages/Login';
import GlobalStyles from './styles/Global';

function App() {
  return (
    <>
      <Header />
      <GlobalStyles />
      <Login />
    </>
  );
}

export default App;
