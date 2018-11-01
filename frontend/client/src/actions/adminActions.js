import axios from 'axios';

import { GET_ERRORS, USERS_LOADING, GET_ALL_USERS } from './types';

// Set loading state of users
export const setUsersLoading = () => {
  return { type: USERS_LOADING };
};

// Let user favorite a device
export const getAllUsers = () => dispatch => {
  dispatch(setUsersLoading());
  axios
    .get(`/api/user/all`)
    .then(users => dispatch({ type: GET_ALL_USERS, payload: users }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
