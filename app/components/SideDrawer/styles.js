import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.gray1,
    height: '100%',
  },
  drawerItem: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerText: {
    color: colors.white,
    fontSize: 23,
    fontFamily: 'sans-serif-condensed',
    paddingLeft: 10,
  },
});
