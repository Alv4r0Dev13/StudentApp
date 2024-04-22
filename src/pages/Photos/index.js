import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/Global';
import { Form } from './styled';

export default function Photos() {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/students/${id}`);
        setPhoto(get(data, 'Photos[0].url', ''));
        setIsLoading(false);
      } catch {
        toast.error('Error while obtaining image!');
        setIsLoading(false);
        history.push('/');
      }
    };
    getData();
  }, [id]);

  const handleSubmit = async (evt) => {
    const file = evt.target.files[0];
    const fileURL = URL.createObjectURL(file);
    setPhoto(fileURL);

    const formData = new FormData();
    formData.append('student_id', id);
    formData.append('file', file);

    try {
      setIsLoading(true);
      await axios.post('/photos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Sent photo successfully.');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      // eslint-disable-next-line no-console
      console.log(err);
      const status = get(err, 'response.status', 0);
      toast.error('Error while sending photo!');
      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Photos</h1>
      <Form>
        <label htmlFor="photo">
          {photo ? <img src={photo} alt="Profile" /> : 'Select photo'}
          <input type="file" name="photo" id="photo" onChange={handleSubmit} />
        </label>
      </Form>
    </Container>
  );
}

Photos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
