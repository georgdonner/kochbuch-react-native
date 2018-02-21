import { UPDATE_RECIPES } from './actionTypes';

export const updateRecipes = recipes => ({
  type: UPDATE_RECIPES,
  recipes: recipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
});
