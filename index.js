import { Navigation } from 'react-native-navigation';
import registerScreens from './app/screens';
import colors from './app/config/colors';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'my.HomeScreen',
    title: 'Rezepte',
    navigatorStyle: {
      navBarBackgroundColor: colors.primary,
      navBarTextColor: colors.white,
    },
  },
});
