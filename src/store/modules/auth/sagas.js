import { get } from 'lodash';
import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../../services/axios';
import history from '../../../services/history';
import * as types from '../types';
import * as actions from './actions';

// eslint-disable-next-line require-yield
function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));
    toast.success('Logged in successfully.');
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    history.push(payload.prevPath);
  } catch (e) {
    toast.error('Invalid user or password!');
    yield put(actions.loginFailure());
  }
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { id, name, email, password } = payload;

  try {
    if (id) {
      yield call(axios.put, '/users', {
        name,
        email,
        password: password || undefined,
      });
      toast.success('User data saved successfully.');
      yield put(actions.registerUpdateSuccess({ name, email, password }));
    } else {
      yield call(axios.post, '/users', {
        name,
        email,
        password,
      });
      toast.success('Account created successfully.');
      yield put(actions.registerCreateSuccess({ name, email, password }));
      history.push('/login');
    }
  } catch (e) {
    const status = get(e, 'response.status', 0);
    if (status === 401) {
      toast.error('Email has been altered. Log in again to proceed.');
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    const errors = get(e, 'response.data.errors', []);
    // eslint-disable-next-line no-console
    console.log(status, errors);
    if (errors.length > 0) {
      errors.map((err) => toast(err));
    } else {
      toast.error('Error');
    }

    return yield put(actions.registerFailure());
  }
}

function rehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
  takeLatest(types.PERSIST_HEHYDRATE, rehydrate),
]);
