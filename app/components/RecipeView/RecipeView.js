import React, { Component } from 'react';
import { Image, Text, ScrollView, View } from 'react-native';
import { Icon } from 'react-native-elements';

import BottomGradient from '../BottomGradient/BottomGradient';
import colors from '../../config/colors';
import styles from './styles';

export default class RecipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servings: props.recipe.servings,
    };
  }

  render() {
    const categories = this.props.recipe.categories
      .map(cat => (
        <View key={cat}><Text style={styles.category}># {cat.toUpperCase()}</Text></View>
      ));
    return (
      <ScrollView>
        <View style={styles.image}>
          <Image
            source={{
              uri: this.props.recipe.heroImage ? this.props.recipe.heroImage.replace('w:2000', 'w:600') :
              'http://timgratton.com/wp-content/uploads/2018/01/placeholder-600x400.png',
            }}
            style={styles.image}
          />
          <BottomGradient />
          <Text style={styles.duration}>{this.props.recipe.duration} Min.</Text>
        </View>
        <Text style={styles.title}>{this.props.recipe.title}</Text>
        <View style={styles.categories}>{categories}</View>
        <View style={styles.servingsContainer}>
          <Icon
            raised reverse
            name="remove" color={colors.primary}
            onPress={() => this.setState({ servings: this.state.servings - 1 || 1 })}
          />
          <View style={styles.servings}>
            <Text style={styles.number}>{this.state.servings}</Text>
            <Text style={styles.label}>{this.state.servings > 1 ? 'Portionen' : 'Portion'}</Text>
          </View>
          <Icon
            raised reverse
            name="add" color={colors.primary}
            onPress={() => this.setState({ servings: this.state.servings + 1 })}
          />
        </View>
      </ScrollView>
    );
  }
}
