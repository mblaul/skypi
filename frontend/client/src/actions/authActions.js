import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, SET_USER_PREFERENCES } from './types';

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

// Let user delete their account
export const deleteUser = userId => dispatch => {
  axios
    .delete(`api/user/delete/${userId}`)
    .then(() => dispatch(logoutUser(), alert('Your account has been deleted')))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Send user verification email
export const emailUserVerification = () => dispatch => {
  axios
    .get('/api/user/verify')
    .then()
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Confirm user verification code
export const confirmUserVerification = verificationData => dispatch => {
  axios
    .post('/api/user/verify', verificationData)
    .then(() => dispatch(logoutUser()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Reset user password
export const forgotPassword = forgotPasswordData => dispatch => {
  axios
    .post('/api/user/changepassword', forgotPasswordData)
    .then()
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Reset user password
export const resetPassword = (newPasswordData, history) => dispatch => {
  axios
    .post('/api/user/resetpassword', newPasswordData)
    .then(result => history.push('/login'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Let user favorite a device
export const setFavoriteDevice = deviceId => dispatch => {
  axios
    .get(`/api/user/favoritedevice/${deviceId}`)
    .then()
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const setUserPreferences = units => dispatch => {
  axios
    .post(`/api/user/preferences`, { units })
    .then(result =>
      dispatch({ type: SET_USER_PREFERENCES, payload: result.data })
    )
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const getUserPreferences = () => dispatch => {
  axios
    .get(`/api/user/current`)
    .then(result => {
      dispatch({ type: SET_USER_PREFERENCES, payload: result.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
