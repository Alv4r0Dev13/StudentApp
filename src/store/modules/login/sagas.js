import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../types';
import * as actions from './actions';

const request = () =>
  // eslint-disable-next-line no-unused-vars
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 600);
  });

function* loginRequest() {
  try {
    yield call(request);
    toast.success('Logged in.');
    yield put(actions.loginPressSuccess());
  } catch (e) {
    toast.error('Login failed!');
    yield put(actions.loginPressFailure());
  }
}

export default all([takeLatest(types.LOGIN_REQUEST, loginRequest)]);
