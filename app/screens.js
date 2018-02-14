import { Navigation } from 'react-native-navigation';

import App from './App';
import SideDrawer from './components/SideDrawer/SideDrawer';
import RecipeView from './components/RecipeView/RecipeView';

export default (store, Provider) => {
  Navigation.registerComponent('my.SideDrawer', () => SideDrawer, store, Provider);
  Navigation.registerComponent('my.HomeScreen', () => App, store, Provider);
  Navigation.registerComponent('my.Recipe', () => RecipeView, store, Provider);
};
