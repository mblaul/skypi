import isEmpty from '../validation/is-empty';

import { SET_CURRENT_USER, SET_USER_PREFERENCES } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        preferences: action.payload.preferences
      };

    case SET_USER_PREFERENCES:
      return {
        ...state,
        preferences: action.payload.preferences
      };

    default:
      return state;
  }
};
