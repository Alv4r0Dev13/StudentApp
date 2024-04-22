import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoute from './private';

import Page404 from '../pages/404';
import Login from '../pages/Login';
import Photos from '../pages/Photos';
import Register from '../pages/Register';
import Student from '../pages/Student';
import Students from '../pages/Students';

export default function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Students />} />
      <Route
        exact
        path="/student/:id/edit"
        element={
          <PrivateRoute>
            <Student />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/student/"
        element={
          <PrivateRoute>
            <Student />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/photos/:id"
        element={
          <PrivateRoute>
            <Photos />
          </PrivateRoute>
        }
      />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
