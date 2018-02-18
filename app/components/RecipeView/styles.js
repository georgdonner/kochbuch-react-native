import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
  },
  duration: {
    position: 'absolute',
    bottom: 5,
    right: 15,
    textAlign: 'right',
    color: colors.white,
  },
  title: {
    padding: 20,
    fontFamily: 'sans-serif-condensed',
    fontSize: 28,
    textAlign: 'center',
    color: colors.darkGray,
  },
  categories: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  category: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.darkGray,
    padding: 5,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBorder,
    paddingTop: 10,
    marginHorizontal: 30,
  },
  ingredient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBorder,
  },
  ingredientText: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 19,
    color: colors.gray1,
    maxWidth: '75%',
  },
  description: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  descriptionText: {
    color: colors.darkGray,
    fontSize: 18,
    fontFamily: 'sans-serif-light',
  },
  descriptionParagraph: {
    paddingBottom: 6,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
