import {
  WEATHER_LOGS_LOADING,
  GET_PRIVATE_WEATHER_LOGS,
  GET_PUBLIC_WEATHER_LOGS,
  GET_FAVORITE_WEATHER_LOGS,
  GET_DEVICE_WEATHER_LOGS
} from '../actions/types';

const initialState = {
  weatherLog: {},
  weatherLogs: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WEATHER_LOGS_LOADING:
      return { ...state, loading: true };

    case GET_PRIVATE_WEATHER_LOGS:
      return { ...state, weatherLogs: action.payload, loading: false };

    case GET_PUBLIC_WEATHER_LOGS:
      return { ...state, weatherLogs: action.payload, loading: false };

    case GET_FAVORITE_WEATHER_LOGS:
      return { ...state, weatherLogs: action.payload, loading: false };

    case GET_DEVICE_WEATHER_LOGS:
      return { ...state, weatherLogs: action.payload, loading: false };

    default:
      return state;
  }
};
