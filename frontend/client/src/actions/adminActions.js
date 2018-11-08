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
    .then(result => dispatch({ type: GET_ALL_USERS, payload: result.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const deleteUser = userId => dispatch => {
  axios
    .delete(`api/user/delete/${userId}`)
    .then(() => {
      alert('Account has been deleted');
    })
    .catch(err => console.log(err));
};
