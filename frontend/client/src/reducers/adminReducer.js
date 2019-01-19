import { USERS_LOADING, GET_ALL_USERS } from '../actions/types';

const initialState = {
  loading: false,
  users: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_LOADING:
      return { ...state, loading: true };

    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };

    default:
      return state;
  }
};
