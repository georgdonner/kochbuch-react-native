import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import colors from '../../../config/colors';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  text: {
    color: colors.darkGray,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default props => (
  <View style={styles.container}>
    <Text style={styles.text}>{props.message}</Text>
    <Button
      title={props.buttonText.toUpperCase()}
      textStyle={{ color: colors.white }}
      buttonStyle={{ height: 50, backgroundColor: colors.primary }}
      onPress={() => props.onPress()}
      containerViewStyle={{ marginTop: 30 }}
    />
  </View>
);
