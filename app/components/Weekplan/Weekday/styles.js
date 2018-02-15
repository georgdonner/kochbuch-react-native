import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export default StyleSheet.create({
  entry: {
    paddingVertical: 10,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBorder,
  },
  weekday: {
    color: colors.lightGray,
    fontSize: 12,
    fontFamily: 'sans-serif-medium',
    paddingHorizontal: 5,
  },
  meta: {
    color: colors.gray1,
    fontSize: 12,
    fontFamily: 'sans-serif-medium',
    paddingHorizontal: 5,
    paddingTop: 12,
  },
  title: {
    color: colors.darkGray,
    fontSize: 20,
    fontFamily: 'sans-serif-condensed',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
});
