import { Navigation } from 'react-native-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import registerScreens from './app/screens';
import colors from './app/config/colors';
import reducer from './app/reducers';

const store = createStore(reducer);

registerScreens(store, Provider);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'my.HomeScreen',
    title: 'Rezepte',
    navigatorStyle: {
      navBarBackgroundColor: colors.primary,
      navBarTextColor: colors.white,
    },
  },
  drawer: {
    left: {
      screen: 'my.SideDrawer',
    },
  },
});
