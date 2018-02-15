import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../../config/colors';

const styles = StyleSheet.create({
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
});

export default props => (
  <View style={styles.servingsContainer}>
    <Icon
      raised reverse
      name="remove" color={colors.primary}
      onPress={() => props.onDecrement()}
    />
    <View style={styles.servings}>
      <Text style={styles.number}>{props.servings}</Text>
      <Text style={styles.label}>{props.servings > 1 ? 'Portionen' : 'Portion'}</Text>
    </View>
    <Icon
      raised reverse
      name="add" color={colors.primary}
      onPress={() => props.onIncrement()}
    />
  </View>
);
