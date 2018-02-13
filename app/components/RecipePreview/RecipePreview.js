import React from 'react';
import { Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

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
      <View style={styles.image}>
        <Image
          source={{
            uri: props.recipe.heroImage ? props.recipe.heroImage.replace('w:2000', 'w:600') :
            'http://timgratton.com/wp-content/uploads/2018/01/placeholder-600x400.png',
          }}
          style={styles.image}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)']}
          style={styles.gradient}
        />
        <View style={styles.info}>
          <Text style={styles.infoText}>{info}</Text>
        </View>
      </View>
      <Text style={styles.title}>{props.recipe.title}</Text>
      <View style={styles.categories}>{categories}</View>
    </View>
  );
};
