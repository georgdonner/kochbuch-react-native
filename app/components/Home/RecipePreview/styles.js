import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export default StyleSheet.create({
  recipe: {
    width: '100%',
  },
  image: {
    height: 200,
    width: '100%',
  },
  info: {
    position: 'absolute',
    bottom: 0,
    left: 15,
    height: 30,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
  },
  infoText: {
    fontFamily: 'sans-serif-condensed',
    color: colors.white,
    fontSize: 14,
  },
  title: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 28,
    padding: 15,
    paddingBottom: 10,
    color: colors.darkGray,
  },
  categories: {
    paddingHorizontal: 10,
    paddingBottom: 15,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  category: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.darkGray,
    padding: 5,
  },
});
