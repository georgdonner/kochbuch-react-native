import { Navigation } from 'react-native-navigation';

import SideDrawer from './components/SideDrawer/SideDrawer';
import Home from './components/Home/Home';
import RecipeView from './components/RecipeView/RecipeView';
import ShoppingList from './components/ShoppingList/ShoppingList';
import Weekplan from './components/Weekplan/Weekplan';
import Settings from './components/Settings/Settings';

export default (store, Provider) => {
  Navigation.registerComponent('my.SideDrawer', () => SideDrawer, store, Provider);
  Navigation.registerComponent('my.HomeScreen', () => Home, store, Provider);
  Navigation.registerComponent('my.Recipe', () => RecipeView, store, Provider);
  Navigation.registerComponent('my.Settings', () => Settings, store, Provider);
  Navigation.registerComponent('my.ShoppingList', () => ShoppingList, store, Provider);
  Navigation.registerComponent('my.Weekplan', () => Weekplan, store, Provider);
};
