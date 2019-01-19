import axios from 'axios';

import {
  DEVICES_LOADING,
  GET_PRIVATE_DEVICES,
  GET_PUBLIC_DEVICES
} from '../actions/types';

// Wearher data loading
export const setDevicesLoading = () => {
  return { type: DEVICES_LOADING };
};

// Get all device informations for private devices
export const getPrivateDevices = () => dispatch => {
  dispatch(setDevicesLoading());
  axios
    .get('/api/weather/data/mine')
    .then(result => {
      dispatch({ type: GET_PRIVATE_DEVICES, payload: result.data });
    })
    .catch(err => dispatch({ type: GET_PRIVATE_DEVICES, payload: null }));
};

// Get all device informations for public devices
export const getPublicDevices = () => dispatch => {
  dispatch(setDevicesLoading());
  axios
    .get('/api/device/public')
    .then(result => {
      dispatch({ type: GET_PUBLIC_DEVICES, payload: result.data });
    })
    .catch(err => dispatch({ type: GET_PUBLIC_DEVICES, payload: [] }));
};
