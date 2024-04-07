import * as types from '../types';

export function loginPressRequest() {
  return {
    type: types.LOGIN_REQUEST,
  };
}

export function loginPressSuccess() {
  return {
    type: types.LOGIN_SUCCESS,
  };
}

export function loginPressFailure() {
  return {
    type: types.LOGIN_FAILURE,
  };
}
