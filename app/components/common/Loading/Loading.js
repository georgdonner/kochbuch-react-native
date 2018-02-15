import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import colors from '../../../config/colors';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
);
