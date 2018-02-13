import { Navigation } from 'react-native-navigation';

import App from './App';
import SideDrawer from './components/SideDrawer/SideDrawer';
import RecipeView from './components/RecipeView/RecipeView';

export default () => {
  Navigation.registerComponent('my.SideDrawer', () => SideDrawer);
  Navigation.registerComponent('my.HomeScreen', () => App);
  Navigation.registerComponent('my.Recipe', () => RecipeView);
};
