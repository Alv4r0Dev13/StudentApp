import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({
  component: Component,
  isClosed,
  ...rest
}) {
  const isLoggedIn = false;
  if (isClosed && !isLoggedIn) {
    return (
      <Redirect
        to={{ pathname: 'login', state: { prevPath: rest.location.pathname } }}
      />
    );
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} component={Component} />;
}

PrivateRoute.defaultProps = {
  isClosed: false,
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isClosed: PropTypes.bool,
};
