import {
  DEVICES_LOADING,
  GET_PRIVATE_DEVICES,
  GET_PUBLIC_DEVICES
} from '../actions/types';

const initialState = {
  devices: [],
  device: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEVICES_LOADING:
      return { ...state, loading: true };

    case GET_PRIVATE_DEVICES:
      return { ...state, devices: action.payload, loading: false };

    case GET_PUBLIC_DEVICES:
      return { ...state, devices: action.payload, loading: false };

    default:
      return state;
  }
};
