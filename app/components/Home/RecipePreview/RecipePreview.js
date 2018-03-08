import React from 'react';
import { Image, Text, TouchableNativeFeedback, View } from 'react-native';

import BottomGradient from '../../common/BottomGradient/BottomGradient';
import styles from './styles';

export const MIN_HEIGHT = 307.5;

export default (props) => {
  const categories = props.recipe.categories
    .filter(cat => cat !== 'Vegan' && cat !== 'Vegetarisch')
    .map(cat => (
      <View key={cat}><Text style={styles.category}># {cat.toUpperCase()}</Text></View>
    ));
  let info = '';
  if (props.recipe.categories.includes('Vegan')) info = 'vegan';
  else if (props.recipe.categories.includes('Vegetarisch')) info = 'vegetarisch';
  return (
    <View style={styles.recipe}>
      <TouchableNativeFeedback onPress={() => props.onPress(props.recipe)}>
        <View>
          <View style={styles.image}>
            <Image
              source={{
                uri: props.recipe.heroImage ? props.recipe.heroImage.replace('w:2000', 'w:600') :
                'http://timgratton.com/wp-content/uploads/2018/01/placeholder-600x400.png',
              }}
              style={styles.image}
            />
            <BottomGradient />
            <View style={styles.info}>
              <Text style={styles.infoText}>{info}</Text>
            </View>
          </View>
          <Text style={styles.title}>{props.recipe.title}</Text>
          <View style={styles.categories}>{categories}</View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
