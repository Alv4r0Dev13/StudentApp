import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  FaEdit,
  FaExclamation,
  FaUserCircle,
  FaWindowClose,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import secret from '../../secret';
import axios from '../../services/axios';
import { Container } from '../../styles/Global';
import { NewStudent, ProfilePicture, StudentContainer } from './styled';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/students');
      setStudents(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const handleDeleteAsk = (evt) => {
    evt.preventDefault();
    const exclamation = evt.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    evt.currentTarget.remove();
  };

  // eslint-disable-next-line no-unused-vars
  const handleDelete = async (evt, id, index) => {
    evt.persist();
    try {
      setIsLoading(true);
      await axios.delete(`/students/${id}`);
      const newStudents = [...students];
      newStudents.splice(index, 1);
      setStudents(newStudents);
      setIsLoading(false);
    } catch (e) {
      const status = get(e, 'response.status', 0);
      if (status === 401) toast.error('Login required!');
      else toast.error('Error while deleting student!');
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Students</h1>

      <NewStudent to="/student/">New student</NewStudent>

      <StudentContainer>
        {students.map((student, index) => (
          <div key={String(student.id)}>
            <ProfilePicture>
              {get(student, 'Photos[0].url', false) ? (
                <img
                  src={student.Photos[0].url.replace('localhost', secret.ip)}
                  // src={student.Photos[0].url}
                  alt=""
                />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>
            <p>{student.name}</p>
            <p>{student.lastname}</p>
            <p>{student.email}</p>
            <Link to={`/student/${student.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            <Link
              to={`/student/${student.id}/delete`}
              onClick={handleDeleteAsk}
            >
              <FaWindowClose size={16} />
            </Link>
            <FaExclamation
              size={16}
              display="none"
              cursor="pointer"
              onClick={(e) => handleDelete(e, student.id, index)}
            />
          </div>
        ))}
      </StudentContainer>
    </Container>
  );
}
