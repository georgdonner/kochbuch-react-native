import { UPDATE_SHOPPING_LIST } from './actionTypes';

export const updateShoppingList = list => ({
  type: UPDATE_SHOPPING_LIST,
  list,
});
