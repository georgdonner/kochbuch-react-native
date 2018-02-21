import { combineReducers } from 'redux';
import recipes from './recipes';
import settings from './settings';
import status from './status';
import user from './user';

export default combineReducers({
  recipes,
  settings,
  status,
  user,
});
