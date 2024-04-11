import { get } from 'lodash';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/Global';
import { Form } from './styled';

export default function Login(props) {
  const dispatch = useDispatch();
  const prevPath = get(props, 'location.state.prevPath', '/');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (evt) => {
    evt.preventDefault();
    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Invalid e-mail!');
    }

    if (password.length < 8 || password.length > 50) {
      formErrors = true;
      toast.error('Invalid password!');
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
  };
  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleLogin}>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </label>
        <button type="submit">Login</button>
      </Form>
    </Container>
  );
}
