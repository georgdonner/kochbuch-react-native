import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    marginTop: 5,
  },
  text: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 18,
    color: colors.darkGray,
    fontWeight: 'normal',
    paddingLeft: 5,
    paddingVertical: 0,
  },
  checkbox: {
    borderWidth: 0,
    padding: 2,
    margin: 5,
    marginLeft: 20,
  },
  input: {
    fontSize: 18,
    color: colors.darkGray,
    marginBottom: 5,
  },
});
