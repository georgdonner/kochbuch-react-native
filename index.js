import { Navigation } from 'react-native-navigation';
import registerScreens from './screens';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'my.HomeScreen',
    title: 'Rezepte',
    navigatorStyle: {
      navBarBackgroundColor: '#ff560f',
      navBarTextColor: '#ffffff',
    },
  },
});
