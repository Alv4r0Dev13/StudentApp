import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/Global';
import { Form } from './styled';

export default function Register() {
  const dispatch = useDispatch();
  const {
    id,
    name: storedName,
    email: storedEmail,
  } = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!id) return;
    setName(storedName);
    setEmail(storedEmail);
  }, [id, storedName, storedEmail]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Name must be 3 to 255 characters long!');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Invalid e-mail!');
    }

    if (!id && (password.length < 8 || password.length > 50)) {
      formErrors = true;
      toast.error('Password must be 8 to 50 characters long!');
    }

    if (formErrors) return;
    dispatch(actions.registerRequest({ id, name, email, password }));
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Edit user' : 'Create account'}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
          />
        </label>

        <label htmlFor="email">
          E-mail:
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

        <button type="submit">{id ? 'Save' : 'Create'}</button>
      </Form>
    </Container>
  );
}
