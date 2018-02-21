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
