import { getItem, setItem } from './store';

export const setRecipes = async recipes => setItem(recipes, 'recipes');

export const getRecipes = async () => getItem('recipes', []);

export const setShoppingList = async list => setItem(list, 'shoppinglist');

export const getShoppingList = async () => getItem('shoppinglist', []);

export const setWeekplan = async plan => setItem(plan, 'weekplan');

export const getWeekplan = async () => getItem('weekplan');

export const setSettings = async settings => setItem(settings, 'settings');

export const getSettings = async () => {
  const defaultSettings = {
    shoppingList: '',
    weekplan: '',
  };
  return getItem('settings', defaultSettings);
};

export const getFavorites = async () => getItem('favorites', []);

export const isFavorite = async (recipeId) => {
  const favorites = await getFavorites();
  console.log(favorites);
  return favorites.includes(recipeId);
};

export const addToFavorites = async (recipeId) => {
  const favorites = await getFavorites();
  const set = new Set(favorites);
  set.add(recipeId);
  return setItem([...set], 'favorites');
};

export const removeFromFavorites = async (recipeId) => {
  const favorites = await getFavorites();
  return setItem(favorites.filter(fav => fav !== recipeId), 'favorites');
};
