import {
  CLEAR_REMOVED_LIST_ITEMS, REMOVE_LIST_ITEM,
  UPDATE_SHOPPING_LIST, UPDATE_WEEKPLAN,
} from '../actions/actionTypes';

const initialState = {
  shoppingList: [],
  removedListItems: [],
  weekplan: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SHOPPING_LIST:
      return { ...state, shoppingList: action.list };
    case UPDATE_WEEKPLAN:
      return { ...state, weekplan: action.plan };
    case CLEAR_REMOVED_LIST_ITEMS:
      return { ...state, removedListItems: [] };
    case REMOVE_LIST_ITEM:
      return { ...state, removedListItems: state.removedListItems.concat([action.item]) };
    default:
      return state;
  }
};

export default reducer;
