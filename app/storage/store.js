import { AsyncStorage } from 'react-native';

/**
 * Set item in async storage
 * @param {*} item Item to save
 * @param {string} code Code that identifies this item in storage
 */
export const setItem = async (item, code) => {
  try {
    await AsyncStorage.setItem(
      `@KochbuchCache:${code}`,
      JSON.stringify(item),
    );
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get item from async storage
 * @param {string} code Code that identifies this item in storage
 * @param {*} defaultItem Default item to return if nothing's stored
 * @returns {*} The requested (or default) item
 */
export const getItem = async (code, defaultItem) => {
  try {
    const value = await AsyncStorage.getItem(`@KochbuchCache:${code}`);
    if (value) {
      return JSON.parse(value);
    }
    return defaultItem;
  } catch (error) {
    console.error(error);
    return defaultItem;
  }
};
