import axios from 'axios';

import { CLEAR_REMOVED_LIST_ITEMS } from './actionTypes';
import { getRecipes, getSettings, getShoppingList, getWeekplan, setRemovedListItems, getRemovedListItems } from '../storage';
import { updateRecipes, updateSettings, updateShoppingList, updateWeekplan, fetchFailed, fetchSuccess } from './index';

const readFromStorage = () => async (dispatch) => {
  try {
    const recipes = await getRecipes();
    const list = await getShoppingList();
    const plan = await getWeekplan();
    dispatch(updateRecipes(recipes));
    dispatch(updateShoppingList(list));
    dispatch(updateWeekplan(plan));
  } catch (error) {
    console.error(error);
  }
};

const clearRemovedItems = () => {
  setRemovedListItems([]);
  return { type: CLEAR_REMOVED_LIST_ITEMS };
};

const getMergedShoppingList = (fetchedList, localList, removedItems) => {
  const merged = new Set(fetchedList.concat(localList));
  return [...merged].filter(item => !removedItems.includes(item));
};

export default () => async (dispatch, getState) => {
  try {
    const settings = await getSettings();
    const removedListItems = await getRemovedListItems();
    const { shoppingList, weekplan } = settings;
    const localList = getState().user.shoppingList;
    dispatch(updateSettings(settings));
    const fetches = [];
    fetches.push(axios.get('/recipes'));
    if (shoppingList) fetches.push(axios.get(`/list/${shoppingList}`));
    if (weekplan) fetches.push(axios.get(`/plan/${weekplan}`));
    const responses = await Promise.all(fetches);
    dispatch(fetchSuccess());
    responses.forEach((res) => {
      const { data } = res;
      if (data) {
        if (data.list) {
          const merged = getMergedShoppingList(data.list, localList, removedListItems);
          axios.put(`/list/${shoppingList}`, { list: merged });
          dispatch(clearRemovedItems());
          dispatch(updateShoppingList(merged));
        } else if (data.plan) {
          dispatch(updateWeekplan(data.plan));
        } else if (Array.isArray(data)) {
          dispatch(updateRecipes(data));
        }
      }
    });
  } catch (error) {
    console.error(error);
    dispatch(readFromStorage());
    dispatch(fetchFailed());
  }
};
