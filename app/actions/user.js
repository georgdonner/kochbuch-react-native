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
    let newList = [];
    if (!res.data) {
      await axios.put(`/list/${code}`, { list: newList });
    } else {
      newList = res.data.list;
    }
    dispatch(updateShoppingList(newList));
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
    let newPlan = [];
    if (!res.data) {
      await axios.put(`/plan/${code}`, { plan: newPlan });
    } else {
      newPlan = res.data.plan;
    }
    dispatch(updateWeekplan(newPlan));
  } catch (error) {
    console.error(error);
  }
};
