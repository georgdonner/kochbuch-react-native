import { Navigation } from 'react-native-navigation';

import App from './App';
import RecipeView from './components/RecipeView/RecipeView';

export default () => {
  Navigation.registerComponent('my.HomeScreen', () => App);
  Navigation.registerComponent('my.Recipe', () => RecipeView);
};
