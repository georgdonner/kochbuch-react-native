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
  edit: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
  },
  back: {
    paddingHorizontal: 15,
  },
  option: {
    flex: 1,
  },
  optionText: {
    color: colors.darkGray,
    fontSize: 20,
    fontFamily: 'sans-serif-condensed',
    textAlign: 'center',
  },
  center: {
    borderRightWidth: 1,
    borderRightColor: colors.lightBorder,
    borderLeftWidth: 1,
    borderLeftColor: colors.lightBorder,
  },
});
