import { UPDATE_RECIPES } from './actionTypes';
import { setRecipes } from '../storage';

export const updateRecipes = (recipes) => {
  setRecipes(recipes);
  return {
    type: UPDATE_RECIPES,
    recipes: recipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  };
};
