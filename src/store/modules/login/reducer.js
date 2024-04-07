import * as types from '../types';

const initialState = {
  isLogged: false,
};

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST: {
      // eslint-disable-next-line no-console
      console.log('Login request...');
      return state;
    }
    case types.LOGIN_SUCCESS: {
      // eslint-disable-next-line no-console
      console.log('Login success');
      const newState = { ...state };
      newState.isLogged = !newState.isLogged;
      return newState;
    }
    case types.LOGIN_FAILURE: {
      // eslint-disable-next-line no-console
      console.log('Login failed!');
      return state;
    }
    default:
      return state;
  }
}
