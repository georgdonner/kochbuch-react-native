import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
  label: {
    color: colors.gray1,
  },
  input: {
    fontSize: 18,
    color: colors.darkGray,
  },
  checkbox: {
    borderWidth: 0,
    padding: 2,
    margin: 5,
    marginTop: 20,
    marginLeft: 20,
  },
  description: {
    marginVertical: 5,
    marginHorizontal: 25,
    color: colors.gray2,
  },
});
