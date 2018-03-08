import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import colors from '../../../config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  text: {
    color: colors.gray1,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default (props) => {
  const button = props.buttonText ? (
    <Button
      title={props.buttonText.toUpperCase()}
      textStyle={{ color: colors.white }}
      buttonStyle={{ height: 50, backgroundColor: colors.primary }}
      onPress={() => props.onPress()}
      containerViewStyle={{ marginTop: 30 }}
    />
  ) : null;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.message}</Text>
      {button}
    </View>
  );
};
