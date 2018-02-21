import axios from 'axios';
import { UPDATE_SHOPPING_LIST, UPDATE_WEEKPLAN } from './actionTypes';
import { setShoppingList, setWeekplan } from '../storage';

export const updateShoppingList = (list) => {
  setShoppingList(list);
  return {
    type: UPDATE_SHOPPING_LIST,
    list,
  };
};

export const fetchShoppingList = code => async (dispatch) => {
  try {
    const res = await axios.get(`/list/${code}`);
    dispatch(updateShoppingList(res.data.list));
  } catch (error) {
    console.error(error);
  }
};

export const updateWeekplan = (plan) => {
  setWeekplan(plan);
  return {
    type: UPDATE_WEEKPLAN,
    plan,
  };
};

export const fetchWeekplan = code => async (dispatch) => {
  try {
    const res = await axios.get(`/plan/${code}`);
    dispatch(updateWeekplan(res.data.plan));
  } catch (error) {
    console.error(error);
  }
};
