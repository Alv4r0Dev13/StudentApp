import React from 'react';
import { useDispatch } from 'react-redux';

import * as loginActions from '../../store/modules/login/actions';
import { Container } from '../../styles/Global';
import { Title } from './styled';

export default function Login() {
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginActions.loginPressRequest());
  };
  return (
    <Container>
      <Title>Login</Title>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi laborum
        reiciendis dolorum tempora commodi aperiam, alias in aliquid porro
        itaque ipsa quos natus, a mollitia quam dolorem sed qui voluptas.
      </p>
      <button type="button" onClick={handleLogin}>
        Salvar
      </button>
    </Container>
  );
}
