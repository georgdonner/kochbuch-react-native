import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 30,
  },
});

export default () => (
  <LinearGradient
    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)']}
    style={styles.gradient}
  />
);
