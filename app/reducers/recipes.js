import { UPDATE_RECIPES } from '../actions/actionTypes';

const reducer = (state = null, action) => {
  switch (action.type) {
    case UPDATE_RECIPES:
      return action.recipes;
    default:
      return state;
  }
};

export default reducer;
