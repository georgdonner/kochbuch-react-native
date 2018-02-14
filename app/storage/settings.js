import { AsyncStorage } from 'react-native';

const defaultSettings = {
  shoppingList: '',
  weekplan: '',
};

export const setSettings = async (settings) => {
  try {
    await AsyncStorage.setItem(
      '@KochbuchCache:settings',
      JSON.stringify(settings),
    );
  } catch (error) {
    console.error(error);
  }
};

export const getSettings = async () => {
  try {
    const value = await AsyncStorage.getItem('@KochbuchCache:settings');
    if (value) {
      return JSON.parse(value);
    }
    return defaultSettings;
  } catch (error) {
    console.error(error);
    return defaultSettings;
  }
};
