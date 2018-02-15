import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
  label: {
    color: colors.gray1,
  },
  dateTime: {
    color: colors.darkGray,
    fontSize: 20,
    fontFamily: 'sans-serif-condensed',
    marginHorizontal: 20,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBorder,
  },
  input: {
    fontSize: 18,
    color: colors.darkGray,
  },
  recipe: {
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeTitle: {
    flex: 1,
    color: colors.darkGray,
    fontSize: 20,
    fontFamily: 'sans-serif-condensed',
  },
  changeRecipe: {
    borderColor: colors.lightBorder,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
});
