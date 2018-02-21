import axios from 'axios';

import { FETCH_FAILED, FETCH_SUCCESS } from './actionTypes';
import { getRecipes, getSettings, getShoppingList, getWeekplan } from '../storage';
import { updateRecipes, updateSettings, updateShoppingList, updateWeekplan } from './index';

const fetchFailed = () => ({ type: FETCH_FAILED });

const fetchSuccess = () => ({ type: FETCH_SUCCESS });

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

export default () => async (dispatch) => {
  try {
    const settings = await getSettings();
    dispatch(fetchFailed());
    dispatch(fetchFailed());
    dispatch(updateSettings(settings));
    const fetches = [];
    fetches.push(axios.get('/recipes'));
    fetches.push(axios.get(`/list/${settings.shoppingList}`));
    fetches.push(axios.get(`/plan/${settings.weekplan}`));
    const responses = await Promise.all(fetches);
    dispatch(fetchSuccess());
    responses.forEach((res) => {
      const { data } = res;
      if (data.list) dispatch(updateShoppingList(data.list));
      else if (data.plan) dispatch(updateWeekplan(data.plan));
      else dispatch(updateRecipes(data));
    });
  } catch (error) {
    dispatch(readFromStorage());
    dispatch(fetchFailed());
  }
};
