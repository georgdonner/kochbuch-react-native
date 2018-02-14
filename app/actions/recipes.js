import { UPDATE_RECIPES } from './actionTypes';

export const updateRecipes = recipes => ({
  type: UPDATE_RECIPES,
  recipes,
});
