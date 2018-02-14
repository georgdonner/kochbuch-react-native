import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
  },
  duration: {
    position: 'absolute',
    bottom: 10,
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
  servingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  servings: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  number: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 60,
    textAlign: 'center',
    color: colors.darkGray,
  },
  label: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 22,
    textAlign: 'center',
    color: colors.gray1,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#e9e9e9',
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
    borderBottomColor: '#e9e9e9',
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
