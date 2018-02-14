import { Navigation } from 'react-native-navigation';

import Home from './components/Home/Home';
import SideDrawer from './components/SideDrawer/SideDrawer';
import RecipeView from './components/RecipeView/RecipeView';

export default (store, Provider) => {
  Navigation.registerComponent('my.SideDrawer', () => SideDrawer, store, Provider);
  Navigation.registerComponent('my.HomeScreen', () => Home, store, Provider);
  Navigation.registerComponent('my.Recipe', () => RecipeView, store, Provider);
};
