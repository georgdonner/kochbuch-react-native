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
  entry: {
    paddingVertical: 10,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBorder,
  },
  weekday: {
    color: colors.lightGray,
    fontSize: 13,
    fontFamily: 'sans-serif-medium',
    paddingHorizontal: 5,
  },
});
