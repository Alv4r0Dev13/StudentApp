import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isEmail, isFloat, isInt } from 'validator';

import Loading from '../../components/Loading';
import secret from '../../secret';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/Global';
import { Form, ProfilePicture } from './styled';

export default function Student() {
  const dispatch = useDispatch();
  const params = useParams();

  const { id } = params;
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/students/${id}`);
        const userPhoto = get(data, 'Photos[0].url', '');

        setName(data.name);
        setLastname(data.lastname);
        setEmail(data.email);
        setAge(data.age);
        setHeight(data.height);
        setWeight(data.weight);
        setPhoto(userPhoto);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);
        if (status === 400) errors.map((e) => toast.error(e));
        history.push('/');
      }
    }

    getData();
  }, [id]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      toast.error('Name must be 3 to 255 characters long!');
      formErrors = true;
    }
    if (lastname.length < 3 || lastname.length > 255) {
      toast.error('Lastname must be 3 to 255 characters long!');
      formErrors = true;
    }
    if (!isEmail(email)) {
      toast.error('Invalid email!');
      formErrors = true;
    }
    if (!isInt(String(age))) {
      toast.error('Age must be an integer value!');
      formErrors = true;
    }
    if (!isFloat(String(height))) {
      toast.error('Height must be a number!');
      formErrors = true;
    }
    if (!isFloat(String(weight))) {
      toast.error('Weight must be a number!');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        // Edit student
        await axios.put(`/students/${id}`, {
          name,
          lastname,
          email,
          age,
          weight,
          height,
        });
        toast.success('Student data edited successfully.');
      } else {
        // Create student
        const { data } = await axios.post(`/students/`, {
          name,
          lastname,
          email,
          age,
          weight,
          height,
        });
        toast.success('Student created successfully.');
        history.push(`/student/${data.id}/edit`);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const status = get(err, 'response.status', 0);
      const errors = get(err, 'response.data.errors', []);

      if (errors.lenght > 0) errors.map((error) => toast.error(error));
      else toast.error('Error!');

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Edit student' : 'Create student'}</h1>

      {id && (
        <ProfilePicture>
          {photo ? (
            <img src={photo.replace('localhost', secret.ip)} alt={name} />
          ) : (
            <FaUserCircle size={180} />
          )}
          <Link to={`/photos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Lastname"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
        />
        <input
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Height"
        />
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight"
        />

        <button type="submit">Send</button>
      </Form>
    </Container>
  );
}

Student.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
