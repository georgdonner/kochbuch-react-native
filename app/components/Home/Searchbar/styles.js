import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    backgroundColor: colors.gray1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  backButton: {
    paddingLeft: 15,
    paddingRight: 10,
  },
  searchContainer: {
    backgroundColor: colors.gray1,
    flex: 1,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  searchInput: {
    backgroundColor: colors.darkGray,
    color: colors.white,
    fontSize: 16,
  },
});
