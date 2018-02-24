import React from 'react';
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import colors from '../../../config/colors';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.darkGray,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 30,
  },
});

export default props => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={colors.primary} />
    {props.message ?
      <Text style={styles.text}>{props.message}</Text>
    : null}
  </View>
);
