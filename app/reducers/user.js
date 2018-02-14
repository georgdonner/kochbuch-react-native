import { UPDATE_SHOPPING_LIST } from '../actions/actionTypes';

const initialState = {
  shoppingList: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SHOPPING_LIST:
      return { ...state, shoppingList: action.list };
    default:
      return state;
  }
};

export default reducer;
