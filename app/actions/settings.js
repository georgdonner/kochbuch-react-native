import { UPDATE_SETTINGS } from './actionTypes';

export const updateSettings = settings => ({
  type: UPDATE_SETTINGS,
  settings,
});
