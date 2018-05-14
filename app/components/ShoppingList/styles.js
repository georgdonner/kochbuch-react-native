import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  text: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 18,
    color: colors.darkGray,
    backgroundColor: colors.white,
    fontWeight: 'normal',
    paddingLeft: 5,
    paddingVertical: 0,
  },
  checkbox: {
    backgroundColor: colors.white,
    borderWidth: 0,
    padding: 2,
    margin: 5,
    marginLeft: 20,
  },
  input: {
    fontSize: 18,
    color: colors.darkGray,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    marginBottom: 5,
    zIndex: 10,
    backgroundColor: colors.white,
  },
});
