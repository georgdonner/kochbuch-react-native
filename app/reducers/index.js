import { combineReducers } from 'redux';
import recipes from './recipes';
import settings from './settings';

export default combineReducers({
  recipes,
  settings,
});
