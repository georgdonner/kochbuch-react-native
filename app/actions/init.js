import axios from 'axios';

import { FETCH_FAILED, FETCH_SUCCESS } from './actionTypes';
import { getSettings } from '../storage';
import { updateRecipes, updateSettings, updateShoppingList, updateWeekplan } from './index';

const fetchFailed = () => ({ type: FETCH_FAILED });

const fetchSuccess = () => ({ type: FETCH_SUCCESS });

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
    dispatch(fetchFailed());
  }
};
