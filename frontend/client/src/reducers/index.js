import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import weatherReducer from './weatherReducer';
import deviceReducer from './deviceReducer';
import adminReducer from './adminReducer';

export default combineReducers({
  auth: authReducer,
  weather: weatherReducer,
  devices: deviceReducer,
  admin: adminReducer,
  errors: errorReducer
});
