import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import axios from 'axios';
import styles from './styles';

export default class App extends React.Component {
  static navigatorButtons = {
    leftButtons: [{
      id: 'sideMenu',
      buttonColor: '#ffffff',
    }],
  };

  constructor(props) {
    super(props);
    this.state = { recipes: null };
  }

  async componentDidMount() {
    const res = await axios.get('https://georgs-recipes.herokuapp.com/api/recipes');
    this.setState({ recipes: res.data });
  }

  renderRecipe = ({ item }) => {
    const categories = item.categories.map(cat => (
      <View key={cat}><Text style={styles.category}># {cat.toUpperCase()}</Text></View>
    ));
    return (
      <View style={styles.recipe}>
        <View style={styles.image}>
          <Image
            source={{
              uri: item.heroImage ? item.heroImage.replace('w:2000', 'w:600') :
              'http://timgratton.com/wp-content/uploads/2018/01/placeholder-600x400.png'
            }}
            style={styles.image}
          />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.categories}>{categories}</View>
      </View>
    );
  };

  render() {
    if (!this.state.recipes) return <Text>Lädt...</Text>;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.recipes}
          renderItem={this.renderRecipe}
          keyExtractor={item => item._id}
          removeClippedSubviews
        />
      </View>
    );
  }
}
