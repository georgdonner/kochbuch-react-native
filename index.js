import { Navigation } from 'react-native-navigation';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import axios from 'axios';

import registerScreens from './app/screens';
import colors from './app/config/colors';
import reducer from './app/reducers';
import init from './app/actions/init';

axios.defaults.baseURL = 'https://georgs-recipes.herokuapp.com/api';

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

registerScreens(store, Provider);

store.dispatch(init());

Navigation.startSingleScreenApp({
  screen: {
    screen: 'my.HomeScreen',
    title: 'Rezepte',
    navigatorStyle: {
      navBarBackgroundColor: colors.primary,
      navBarTextColor: colors.white,
      statusBarColor: colors.primaryDark,
    },
  },
  drawer: {
    left: {
      screen: 'my.SideDrawer',
    },
  },
});
