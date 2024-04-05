import React from 'react';
import { Switch } from 'react-router-dom';

import Page404 from '../pages/404';
import Login from '../pages/Login';
import PrivateRoute from './private';

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Login} />
      <PrivateRoute path="*" component={Page404} />
    </Switch>
  );
}
