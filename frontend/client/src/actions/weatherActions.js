import axios from 'axios';

import {
  WEATHER_LOGS_LOADING,
  GET_PRIVATE_WEATHER_LOGS,
  GET_PUBLIC_WEATHER_LOGS,
  GET_FAVORITE_WEATHER_LOGS
} from './types';

// Wearher data loading
export const setWeatherLogLoading = () => {
  return { type: WEATHER_LOGS_LOADING };
};

// Get weather logs the current user is authorized to access
export const getPrivateWeatherData = () => dispatch => {
  dispatch(setWeatherLogLoading());
  axios
    .get('/api/weather/data/mine')
    .then(result => {
      dispatch({ type: GET_PRIVATE_WEATHER_LOGS, payload: result.data });
    })
    .catch(err => dispatch({ type: GET_PRIVATE_WEATHER_LOGS, payload: null }));
};

// Get weather logs that every member can access
export const getPublicWeatherData = () => dispatch => {
  dispatch(setWeatherLogLoading());
  axios
    .get('/api/weather/data/public')
    .then(result => {
      dispatch({ type: GET_PUBLIC_WEATHER_LOGS, payload: result.data });
    })
    .catch(err => dispatch({ type: GET_PUBLIC_WEATHER_LOGS, payload: [] }));
};

// Get weather logs for current users favorite device
export const getFavoriteWeatherData = () => dispatch => {
  dispatch(setWeatherLogLoading());
  axios
    .get('/api/weather/data/favorite')
    .then(result => {
      dispatch({ type: GET_FAVORITE_WEATHER_LOGS, payload: result.data });
    })
    .catch(err => dispatch({ type: GET_FAVORITE_WEATHER_LOGS, payload: [] }));
};
