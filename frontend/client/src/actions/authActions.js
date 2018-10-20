import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

//Register
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/user/register', userData)
    .then(result => history.push('/login'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Login - Get user token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/user/login', userData)
    .then(result => {
      // Get the token from the result
      const { token } = result.data;
      // Set token to local storage
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwtDecode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header
  setAuthToken(false);
  // Set current user to empty object which will set isAuthenticated to false also
  dispatch(setCurrentUser({}));
};

// Send user verification email
export const emailUserVerification = () => dispatch => {
  axios
    .get('/api/user/verify')
    .then(result => {})
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Confirm user verification code
export const confirmUserVerification = verificationData => dispatch => {
  axios
    .post('/api/user/verify', verificationData)
    .then(result => {})
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
