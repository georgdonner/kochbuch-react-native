import React, { Component } from 'react';
import { Image, Text, ScrollView, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Markdown from 'react-native-simple-markdown';

import BottomGradient from '../common/BottomGradient/BottomGradient';
import calcServings from '../../utils/calcServings';
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
    const categories = this.props.recipe.categories.map(cat => (
      <View key={cat}><Text style={styles.category}># {cat.toUpperCase()}</Text></View>
    ));
    const ingredients = this.props.recipe.ingredients.map((ingr) => {
      const { hint } = ingr;
      let converted = calcServings(ingr, this.props.recipe.servings, this.state.servings);
      if (hint) converted += ` (${ingr.hint})`;
      return (
        <View key={ingr.name} style={styles.ingredient}>
          <Text style={styles.ingredientText}>{converted}</Text>
          <Icon raised name="add-shopping-cart" color={colors.darkGray} size={20} />
        </View>
      );
    });
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
        <View style={styles.divider} />
        <Text style={styles.title}>Zutaten</Text>
        {ingredients}
        <Text style={styles.title}>Beschreibung</Text>
        <Markdown
          style={styles.description}
          styles={{
            paragraph: styles.descriptionParagraph,
            text: styles.descriptionText,
            view: styles.description,
          }}
        >
          {this.props.recipe.description}
        </Markdown>
      </ScrollView>
    );
  }
}
