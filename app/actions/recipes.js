import axios from 'axios';
import { UPDATE_RECIPES } from './actionTypes';
import { setRecipes } from '../storage';

const sortRecipes = recipes => (
  recipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
);

export const updateRecipes = (recipes) => {
  setRecipes(recipes);
  return {
    type: UPDATE_RECIPES,
    recipes: sortRecipes(recipes),
  };
};

export const fetchRecipes = () => async (dispatch) => {
  try {
    const res = await axios.get('/recipes');
    dispatch(updateRecipes(res.data));
  } catch (error) {
    console.error(error);
  }
};
