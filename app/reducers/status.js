import { FETCH_FAILED, FETCH_SUCCESS } from '../actions/actionTypes';

const initialState = {
  fetchFailed: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAILED:
      return { ...state, fetchFailed: true };
    case FETCH_SUCCESS:
      return { ...state, fetchFailed: false };
    default:
      return state;
  }
};

export default reducer;
