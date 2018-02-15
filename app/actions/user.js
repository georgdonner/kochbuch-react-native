import { UPDATE_SHOPPING_LIST, UPDATE_WEEKPLAN } from './actionTypes';

export const updateShoppingList = list => ({
  type: UPDATE_SHOPPING_LIST,
  list,
});

export const updateWeekplan = plan => ({
  type: UPDATE_WEEKPLAN,
  plan,
});
