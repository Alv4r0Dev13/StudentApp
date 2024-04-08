import React, { useState } from 'react';

import { get } from 'lodash';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import axios from '../../services/axios';
import history from '../../services/history';
import { Container } from '../../styles/Global';
import { Form } from './styled';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

    if (password.length < 8 || password.length > 50) {
      formErrors = true;
      toast.error('Password must be 8 to 50 characters long!');
    }

    if (formErrors) return;

    try {
      await axios.post('/users', {
        name,
        email,
        password,
      });
      toast.success('User registered successfully');
      history.push('/login');
    } catch (e) {
      const errors = get(e, 'response.data.errors', []);

      errors.map((err) => toast.error(err));
    }
  };

  return (
    <Container>
      <h1>Create account</h1>

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

        <button type="submit">Create</button>
      </Form>
    </Container>
  );
}
