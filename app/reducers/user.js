import { UPDATE_SHOPPING_LIST, UPDATE_WEEKPLAN } from '../actions/actionTypes';

const initialState = {
  shoppingList: [],
  weekplan: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SHOPPING_LIST:
      return { ...state, shoppingList: action.list };
    case UPDATE_WEEKPLAN:
      return { ...state, weekplan: action.plan };
    default:
      return state;
  }
};

export default reducer;
