import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
  weekNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBorder,
    height: 60,
  },
  weekNavText: {
    color: colors.darkGray,
    fontSize: 20,
    fontFamily: 'sans-serif-condensed',
    paddingHorizontal: 25,
  },
});
