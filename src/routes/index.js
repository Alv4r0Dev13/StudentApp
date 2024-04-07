import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from './private';

import Page404 from '../pages/404';
import Login from '../pages/Login';
import Photos from '../pages/Photos';
import Register from '../pages/Register';
import Student from '../pages/Student';
import Students from '../pages/Students';

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Students} />
      <PrivateRoute
        exact
        path="/student/:id/edit"
        component={Student}
        isClosed
      />
      <PrivateRoute exact path="/student/" component={Student} isClosed />
      <PrivateRoute exact path="/photos/:id" component={Photos} isClosed />
      <PrivateRoute exact path="/login" component={Login} />
      <PrivateRoute exact path="/register" component={Register} />
      <PrivateRoute path="*" component={Page404} />
    </Switch>
  );
}
