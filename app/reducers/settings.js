import { UPDATE_SETTINGS } from '../actions/actionTypes';

const reducer = (state = null, action) => {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return action.settings;
    default:
      return state;
  }
};

export default reducer;
