import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaUserCircle, FaWindowClose } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import secret from '../../secret';
import axios from '../../services/axios';
import { Container } from '../../styles/Global';
import { ProfilePicture, StudentContainer } from './styled';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get('/students');
      setStudents(response.data);
    }
    getData();
  }, []);

  return (
    <Container>
      <h1>Students</h1>
      <StudentContainer>
        {students.map((student) => (
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
            <p>{student.email}</p>
            <Link to={`/student/${student.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            <Link to={`/student/${student.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
          </div>
        ))}
      </StudentContainer>
    </Container>
  );
}
