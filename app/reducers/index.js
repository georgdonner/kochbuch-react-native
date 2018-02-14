import { combineReducers } from 'redux';
import recipes from './recipes';
import settings from './settings';
import user from './user';

export default combineReducers({
  recipes,
  settings,
  user,
});
